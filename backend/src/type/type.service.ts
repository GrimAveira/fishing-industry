import { Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { IData } from "src/interface";

@Injectable()
export class TypeService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async add(type: string) {
		try {
			const types = await this.getAll();
			const include = types.map((type) => type.name).includes(type);
			if (!include) await this.pg.query(`INSERT INTO type (name) VALUES ('${type}')`);
			return include;
		} catch (error) {
			console.log(error);
		}
	}
	async getAll() {
		try {
			return (await this.pg.query<IData>(`SELECT * FROM type`)).rows;
		} catch (error) {
			console.log(error);
		}
	}
}
