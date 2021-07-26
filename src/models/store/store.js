import { api } from "@models/api/api";

class Location {
	constructor(api) {
		this.api = api;
		this.cities = null;
		this.lastSearch = {};
	}
	async fetchTickets(params) {
		const response = await this.api.prices(params);
		this.lastSearch = response;
		return response;
	}
	async init() {
		const cities = await this.api.cities();
		this.cities = this.createCitiesName(cities);
		return cities;
	}
	createCitiesName(cities) {
		return cities.map((item) => `${item.name}, ${item.code}`);
	}
}

export const location = new Location(api);
