export const getStorage = (name) => {
	const wWidgets = JSON.parse(localStorage.getItem('w_widgets') || '{}');
	return name ? wWidgets[name] : wWidgets;
};
export const setStorage = (name, value) => {
	const wWidgets = getStorage();
	const storageValue = JSON.stringify(name
		? { ...wWidgets, [name]: value }
		: value
	);
	localStorage.setItem('w_widgets', storageValue);
};
