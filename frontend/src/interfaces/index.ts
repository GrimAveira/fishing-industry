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
export interface IUserLoginData {
	login: string;
	password: string;
}
export interface IAuthInfo {
	role: "1" | "2";
	login: string;
	message: string;
}
export interface IWeightCatecoryPost {
	name: string;
	start: string;
	finish: string;
}
