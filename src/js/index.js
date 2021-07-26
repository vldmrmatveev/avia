// import {
// 	autoCompleteOptions,
// 	getStartDate,
// 	compareDate,
// 	FormUI,
// } from "@models/search/search";

import { createForm } from "@models/search/search";

// document.addEventListener("DOMContentLoaded", () => {
// 	new autoComplete(autoCompleteOptions("[name='from']", "Откуда..."));
// 	new autoComplete(autoCompleteOptions("[name='to']", "Куда..."));

// 	const formUi = new FormUI("searchTickets");

// 	getStartDate(formUi.dateFrom);

// 	formUi.dateFrom.addEventListener("change", function () {
// 		formUi.dateTo.disabled = false;
// 		formUi.dateTo.setAttribute("min", this.value);
// 		compareDate(formUi.dateFrom, formUi.dateTo);
// 	});

// 	formUi.form.addEventListener("submit", (e) => {
// 		e.preventDefault();
// 		formUi.formSubmit().then(() => {
// 			console.log(location.lastSeach.data);
// 		});
// 	});
// });

document.addEventListener("DOMContentLoaded", () => {
	createForm();
});
