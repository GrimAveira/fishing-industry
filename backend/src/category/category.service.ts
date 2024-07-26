import { Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { CategoryAddDTO } from "./dto/login.dto";
import { IData } from "src/interface";

@Injectable()
export class CategoryService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async add({ name, start_range, finish_range }: CategoryAddDTO) {
		try {
			const categories = await this.getAll();
			const include = categories.map((type) => type.name).includes(name);
			if (!include)
				await this.pg.query(
					`INSERT INTO weight_category (name, start_range, finish_range) VALUES ('${name}','${start_range}','${finish_range}')`,
				);
			return include;
		} catch (error) {
			console.log(error);
		}
	}
	async getAll() {
		try {
			return (await this.pg.query<IData>(`SELECT * FROM weight_category`)).rows;
		} catch (error) {
			console.log(error);
		}
	}
}
