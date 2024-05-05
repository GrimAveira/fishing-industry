import { Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { SessionDTO } from "./dto/session.dto";

@Injectable()
export class SessionService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getUser(hash: string) {
		try {
			const user = await this.pg.query<SessionDTO>(`SELECT * FROM session WHERE hash='${hash}'`);
			return user.rows[0].user;
		} catch (error) {
			console.log(error);
		}
	}
}
