import { formatValue } from "react-currency-input-field";

export const formatToIndianCurrency = (value: number) => {
	return formatValue({
		value: value.toString(),
		intlConfig: { locale: "en-IN", currency: "INR" },
	});
};
