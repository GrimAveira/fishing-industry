export interface IUserRegData {
	login: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	secondName: string;
	patronymic: string;
	shift: string;
	role: string;
}
export interface IDataFetch {
	id: string;
	name: string;
}
export interface IShiftFetch {
	id: string;
	time_start: string;
	time_end: string;
}
export interface IShiftAdd {
	time_start: string;
	time_end: string;
}
export interface IUserLoginData {
	login: string;
	password: string;
}
export interface IAuthInfo {
	role: "1" | "2";
	login: string;
	message: string;
	isShift: boolean;
}
export interface IWeightCategory {
	id?: string;
	name: string;
	start_range: string;
	finish_range: string;
}
export interface IFishFetch {
	id: string;
	weight: string;
	category: string;
	type: string;
	tank: string;
	age: string;
	create_date: string;
}
export interface IFishAdd {
	weight: string;
	category: string;
	type: string;
	tank: string;
	age: string;
}
export interface IFishUpdate {
	id: string;
	attribute?: string;
	value: string;
}
export interface ITankUpdate {
	tankID: string;
	attributeID: string;
	value: string;
}
export interface IListProperty {
	id: string;
	tank: string;
	property: string;
	value: string;
	optimal_value: string;
}
export interface IFishHistory {
	id: string;
	fish: string;
	first_name: string;
	second_name: string;
	patronymic: string;
	date: string;
	attribute: string;
	value: string;
	prev_value: string;
}
export interface ITankHistory {
	id: string;
	tank: string;
	first_name: string;
	second_name: string;
	patronymic: string;
	date: string;
	attribute: string;
	value: string;
	prev_value: string;
}
export interface IUserFetch {
	login: string;
	first_name: string;
	second_name: string;
	patronymic: string;
	password: string;
	shift: string;
	role: string;
}
export interface IPropertyAdd {
	name: string;
	optimal_value: string;
}
