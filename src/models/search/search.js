import autoComplete from "@tarekraafat/autocomplete.js";
import { location } from "@models/store/store";
import { parseContent } from "@models/search-result/search-result";

const citiesList = location.init().then(() => {
	return location.cities;
});

function autoCompleteOptions(selector, placeholder) {
	return {
		selector: selector,
		placeHolder: placeholder,
		data: {
			src: citiesList,
			cache: true,
		},
		resultItem: {
			highlight: true,
		},
		resultsList: {
			element: (list, data) => {
				if (!data.results.length) {
					const message = document.createElement("div");
					message.setAttribute("class", "no_result");
					message.innerHTML = `<span>Ничего не найдено "${data.query}"</span>`;
					list.appendChild(message);
				}
			},
			noResults: true,
		},
		events: {
			input: {
				selection: (event) => {
					const selection = event.detail.selection.value;
					document.querySelector(selector).value = selection;
				},
			},
		},
	};
}

function getStartDate(from) {
	from.setAttribute("min", createDate());
}

function compareDate(from, to) {
	const fromDate = new Date(from.value);
	const toDate = new Date(to.value);
	if (+toDate < +fromDate) {
		to.value = "";
	}
}

class FormUI {
	constructor(name) {
		this.form = document.forms[name];
		this.dateFrom = this.form.elements["from-date"];
		this.dateTo = this.form.elements["to-date"];
		this.fromCity = this.form.elements["from"];
		this.toCity = this.form.elements["to"];
	}
	get dateFromValue() {
		return this.dateFrom.value;
	}
	get dateToValue() {
		return this.dateTo.value;
	}
	get fromCityValue() {
		return this.fromCity.value.split(", ")[1].trim();
	}
	get toCityValue() {
		return this.toCity.value.split(", ")[1].trim();
	}
	async formSubmit() {
		const origin = this.fromCityValue;
		const destination = this.toCityValue;
		const depart_date = this.dateFromValue;
		const return_date = this.dateToValue;
		const currency = "RUB";
		const submittedData = {
			origin,
			destination,
			depart_date,
			return_date,
			currency,
		};
		await location.fetchTickets(submittedData);
	}
}

function createDate() {
	const date = new Date();
	const year = date.getFullYear();
	const month =
		date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	const day = date.getDate();
	const minDate = year + "-" + month + "-" + day;
	return minDate;
}

export function createForm() {
	new autoComplete(autoCompleteOptions("[name='from']", "Откуда..."));
	new autoComplete(autoCompleteOptions("[name='to']", "Куда..."));

	const formUi = new FormUI("searchTickets");

	getStartDate(formUi.dateFrom);

	formUi.dateFrom.addEventListener("change", function () {
		formUi.dateTo.disabled = false;
		formUi.dateTo.setAttribute("min", this.value);
		compareDate(formUi.dateFrom, formUi.dateTo);
	});

	formUi.form.addEventListener("submit", (e) => {
		e.preventDefault();
		document.querySelector(".card-container").innerHTML = "";
		formUi.formSubmit().then(() => {
			parseContent(location.lastSearch.data);
		});
	});
}
