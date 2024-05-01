import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";

@Injectable()
export class TypeService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async add(res: Response, type: string) {
		try {
			await this.pg.query(`INSERT INTO type (name) VALUES ('${type}')`);
			return res.status(200).send("Тип успешно добавлен!");
		} catch (error) {
			console.log(error);
		}
	}
}
