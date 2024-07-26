import { Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";

@Injectable()
export class UserService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getAll() {
		try {
			const users = await this.pg.query(`SELECT * FROM "user"`);
			return users.rows;
		} catch (error) {
			console.log(error);
		}
	}
	async deactivate(login: string) {
		try {
			await this.pg.query(`UPDATE "user" SET role = 3 WHERE login = '${login}'`);
		} catch (error) {
			console.log(error);
		}
	}
}
