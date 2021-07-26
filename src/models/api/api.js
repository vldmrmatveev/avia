const url = "https://aviasales-api.herokuapp.com";

class Api {
	constructor(url) {
		this.url = url;
	}
	// async countries() {
	// 	try {
	// 		const response = await fetch(`${this.url}/countries`);
	// 		const countriesArr = await response.json();
	// 		return countriesArr;
	// 	} catch (err) {
	// 		return Promise.reject(err);
	// 	}
	// }
	async cities() {
		try {
			const response = await fetch(`${this.url}/cities`);
			const citiesArr = await response.json();
			return citiesArr;
		} catch (err) {
			return Promise.reject(err);
		}
	}
	async prices(params) {
		try {
			let url = new URL(`${this.url}/prices/cheap`);
			for (let key in params) {
				url.searchParams.set(key, params[key]);
			}
			const response = await fetch(url);
			const pricesArr = await response.json();
			return pricesArr;
		} catch (err) {
			return Promise.reject(err);
		}
	}
}

export const api = new Api(url);
