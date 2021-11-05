export const isAPIFetchedSuccefully = (status: string) => {
	return status === "pending" ? true : false;
};

export const getAPIStatusForSpinnerUpdate = (status: string) => {
	return status === "pending" ? true : false;
};
