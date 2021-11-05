import axios, { AxiosRequestConfig } from "axios";

const niftyFiftyOptions: AxiosRequestConfig<{}> = {
	method: "GET",
	url: "https://latest-stock-price.p.rapidapi.com/price",
	params: { Indices: "NIFTY 50" },
	headers: {
		"x-rapidapi-host": "latest-stock-price.p.rapidapi.com",
		"x-rapidapi-key": "80bd583c82mshbd23a8eb502e26cp1f5da4jsnb17aa2242a3f",
	},
};

export const getNiftyFiftyIndexWithStockData: () => Promise<{}[]> =
	async () => {
		return await axios.request(niftyFiftyOptions).then((res: any) => res.data);
	};
