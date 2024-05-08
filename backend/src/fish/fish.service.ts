import { Inject, Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { FishDTO } from "./dto/fish.dto";
import { FishHistoryService } from "src/fish-history/fish-history.service";
import { SessionService } from "src/session/session.service";
import { EditFishDTO } from "./dto/edit-fish.dto";

@Injectable()
export class FishService {
	constructor(
		@InjectClient() private readonly pg: Client,
		@Inject(FishHistoryService) private readonly fishHistoryService: FishHistoryService,
		@Inject(SessionService) private readonly sessionService: SessionService,
	) {}
	async add({ category, tank, type, weight, age }: FishDTO, hash: string) {
		try {
			const date = new Date();
			const fishID = (
				await this.pg.query(
					`INSERT INTO fish (tank, category, type, weight, age, create_date) VALUES ('${tank}', '${category}', '${type}', '${weight}', '${age}', '${date.toLocaleString("ru")}') RETURNING id`,
				)
			).rows[0].id;
			const user = await this.sessionService.getUser(hash);
			await this.fishHistoryService.add({ user, attribute: "Масса", fishID, value: weight });
			const categoryName = await this.pg.query(`SELECT name FROM weight_category WHERE id = '${category}'`);
			await this.fishHistoryService.add({
				user,
				attribute: "Весовая категория",
				fishID,
				value: categoryName.rows[0].name,
			});
			const tankName = await this.pg.query(`SELECT name FROM tank WHERE id = '${tank}'`);
			await this.fishHistoryService.add({
				user,
				attribute: "Резервуар",
				fishID,
				value: tankName.rows[0].name,
			});
		} catch (error) {
			console.log(error);
		}
	}
	async getAll() {
		try {
			const fish = (await this.pg.query(`SELECT * FROM fish`)).rows;
			return fish;
		} catch (error) {
			console.log(error);
		}
	}
	async edit({ attribute, id, value }: EditFishDTO, hash: string) {
		try {
			const user = await this.sessionService.getUser(hash);
			if (attribute === "Масса") {
				await this.pg.query(`UPDATE fish SET weight = '${value}' WHERE id = '${id}'`);
				await this.fishHistoryService.add({ user, attribute: "Масса", fishID: id, value });
			} else if (attribute === "Резервуар") {
				await this.pg.query(`UPDATE fish SET tank = '${value}' WHERE id = '${id}'`);
				const tankName = await this.pg.query(`SELECT name FROM tank WHERE id = '${value}'`);
				await this.fishHistoryService.add({
					user,
					attribute: "Резервуар",
					fishID: id,
					value: tankName.rows[0].name,
				});
			} else {
				await this.pg.query(`UPDATE fish SET category = '${value}' WHERE id = '${id}'`);
				const categoryName = await this.pg.query(`SELECT name FROM weight_category WHERE id = '${value}'`);
				await this.fishHistoryService.add({
					user,
					attribute: "Весовая категория",
					fishID: id,
					value: categoryName.rows[0].name,
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
}
