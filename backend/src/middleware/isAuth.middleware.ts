import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";

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
		next();
	}
}
