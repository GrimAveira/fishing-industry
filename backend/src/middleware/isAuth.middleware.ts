import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";

function rangeEntering(startTime: string, endTime: string): boolean {
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

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	constructor(@InjectClient() private readonly pg: Client) {}
	async use(req: Request, res: Response, next: NextFunction) {
		const sessionID = req.cookies["session"];
		const currentSession = await this.pg
			.query(`SELECT * FROM public.session WHERE hash='${sessionID}'`)
			.catch((error) => {
				throw error;
			});
		if (!currentSession.rowCount) return res.status(401).clearCookie("session").send("Ваша сессия истекла");
		const user = await this.pg
			.query(`SELECT * FROM public.user WHERE login='${currentSession.rows[0].user}'`)
			.catch((error) => {
				throw error;
			});

		const shiftID = user.rows[0].shift;
		const shiftInfo = await this.pg.query(`SELECT * FROM shift WHERE id='${shiftID}'`).catch((error) => {
			throw error;
		});
		if (!rangeEntering(shiftInfo.rows[0].time_start, shiftInfo.rows[0].time_end))
			return res.status(403).clearCookie("session").send("Ваша смена окончена");
		next();
	}
}
