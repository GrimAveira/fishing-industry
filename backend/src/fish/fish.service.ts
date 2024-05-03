import { Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { FishDTO } from "./dto/fish.dto";

@Injectable()
export class FishService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async add({ category, tank, type, weight }: FishDTO) {
		try {
			return await this.pg.query(
				`INSERT INTO fish (tank, category, type, weight) VALUES ('${tank}', '${category}', '${type}', '${weight}')`,
			);
		} catch (error) {
			console.log(error);
		}
	}
}
