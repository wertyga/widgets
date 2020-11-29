const getNumber = (item) => {
	const number = Number(item);
	return isNaN(number) ? item : number;
};

export const getWithNumbers = (data) => {
	if (Array.isArray(data)) {
		return data.map(getNumber)
	}
	if (typeof data === 'object') {
		return Object.entries(data).reduce((init, [key, value]) => ({
			...init,
			[key]: getNumber(value),
		}), {});
	}
	
	return getNumber(data);
};
