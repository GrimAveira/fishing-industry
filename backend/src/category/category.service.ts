import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { CategoryAddDTO } from "./dto/login.dto";

@Injectable()
export class CategoryService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async add(res: Response, { name, start, finish }: CategoryAddDTO) {
		try {
			await this.pg.query(
				`INSERT INTO weight_category (name, start_range, finish_range) VALUES ('${name}','${start}','${finish}')`,
			);
			return res.status(200).send("Категория успешно добавлена!");
		} catch (error) {
			console.log(error);
		}
	}
}
