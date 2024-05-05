import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { rangeEntering } from "src/utils/functions";

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
		const role = user.rows[0].role;
		if (role !== 1) {
			const shiftID = user.rows[0].shift;
			const shiftInfo = await this.pg.query(`SELECT * FROM shift WHERE id='${shiftID}'`).catch((error) => {
				throw error;
			});
			if (!rangeEntering(shiftInfo.rows[0].time_start, shiftInfo.rows[0].time_end)) {
				await this.pg.query(`DELETE FROM public.session WHERE hash='${sessionID}'`).catch((error) => {
					throw error;
				});
				return res.status(403).clearCookie("session").send("Ваша смена окончена");
			}
		}
		next();
	}
}
