export function parseContent(data) {
	data.forEach((item, index) => {
		createDOMElement(item, index);
	});
}

export function parseFavoriteCard(data) {
	data.forEach((item) => {
		createFavoriteCard(item);
	});
}

function createDOMElement(item, index) {
	const fragment = document.createDocumentFragment();
	const card = document.createElement("div");
	card.classList.add("card-item");
	const img = document.createElement("img");
	img.classList.add("card-item-img");
	img.setAttribute("src", `https://pics.avs.io/200/200/${item.airline}.png`);
	const title = document.createElement("h3");
	title.classList.add("card-item-title");
	const from = document.createElement("span");
	from.textContent = item.origin;
	const to = document.createElement("span");
	to.textContent = item.destination;
	const between = document.createElement("span");
	between.textContent = " - ";
	const price = document.createElement("p");
	const dateFrom = document.createElement("p");
	const dateFromText = document.createElement("span");
	dateFromText.textContent = "Отправление: ";
	const dateFromMain = document.createElement("span");
	dateFromMain.classList.add("card-item-time");
	dateFromMain.textContent = transformDate(item.departure_at);
	dateFrom.append(dateFromText, dateFromMain);
	const dateTo = document.createElement("p");
	const dateToText = document.createElement("span");
	dateToText.textContent = "Прибытие: ";
	const dateToMain = document.createElement("span");
	dateToMain.classList.add("card-item-time");
	dateToMain.textContent = transformDate(item.return_at);
	dateTo.append(dateToText, dateToMain);
	price.classList.add("card-item-price");
	price.textContent = `${item.price} ₽`;
	const button = document.createElement("button");
	button.setAttribute("data-id", index);
	button.classList.add("card-item-btn");
	const imgBtn = document.createElement("img");
	imgBtn.setAttribute("src", "img/upload/star.svg");
	button.append(imgBtn);
	button.textContent;
	title.append(from, between, to);
	card.append(img, title, dateFrom, dateTo, price, button);
	fragment.append(card);
	document.querySelector(".card-container").append(fragment);
}

function createFavoriteCard(item) {
	const fragment = document.createDocumentFragment();
	const card = document.createElement("div");
	card.classList.add("card-item-min");
	const img = document.createElement("img");
	img.classList.add("card-item-img");
	img.setAttribute("src", `https://pics.avs.io/200/200/${item.airline}.png`);
	const title = document.createElement("h4");
	title.classList.add("card-item-title");
	const from = document.createElement("span");
	from.textContent = item.origin;
	const to = document.createElement("span");
	to.textContent = item.destination;
	const between = document.createElement("span");
	const price = document.createElement("p");
	price.classList.add("card-item-price", "card-item-price-yellow");
	price.textContent = `${item.price} ₽`;
	between.textContent = " - ";
	title.append(from, between, to);
	card.append(img, title, price);
	fragment.append(card);
	document.querySelector(".container-favorite").append(fragment);
}

function transformDate(value) {
	const date = new Date(value);
	const formatterDate = new Intl.DateTimeFormat("ru", {
		month: "long",
		day: "numeric",
	});
	const formatterHourse = new Intl.DateTimeFormat("ru", {
		hour: "numeric",
		minute: "numeric",
	});
	return formatterDate.format(date) + " в " + formatterHourse.format(date);
}
