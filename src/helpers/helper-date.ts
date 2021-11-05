import moment from "moment";

export const getDifferenceInDays = (maxDate: Date, minDate: Date) =>
	`${moment(maxDate).diff(moment(minDate), "days")} day's`;

export const getDateFromTimeStamp = (timestamp: any) => {
	return moment(timestamp.toDate()).format("MMMM Do YYYY");
};

export const getTimeFromNow = (timestamp: any) => {
	return moment(timestamp.toDate()).fromNow();
};

export const filterDate = (
	date: Date,
	dateToCompare: Date,
	type: "min" | "max"
) => {
	if (type === "min") {
		return date < dateToCompare ? date : dateToCompare;
	} else {
		return date > dateToCompare ? date : dateToCompare;
	}
};
