export function rangeEntering(startTime: string, endTime: string): boolean {
	const hoursStart = Number(startTime.substring(0, 2));
	const minutesStart = Number(startTime.substring(3, 5));
	const hoursEnd = Number(endTime.substring(0, 2));
	const minutesEnd = Number(endTime.substring(3, 5));

	const changeDay = hoursStart > hoursEnd ? 1 : 0;

	const date = new Date();
	const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hoursStart, minutesStart);
	const endDate = new Date(date.getFullYear(), date.getMonth() + changeDay, date.getDate(), hoursEnd, minutesEnd);

	if (startDate <= date && date <= endDate) return true;
	return false;
}
