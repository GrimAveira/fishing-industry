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
	async add({ category, tank, type, weight }: FishDTO, hash: string) {
		try {
			const fishID = await this.pg.query(
				`INSERT INTO fish (tank, category, type, weight) VALUES ('${tank}', '${category}', '${type}', '${weight}') RETURNING id`,
			);
			const user = await this.sessionService.getUser(hash);
			await this.fishHistoryService.add({ user, attribute: "Масса", fishID: fishID.rows[0].id, value: weight });
			await this.fishHistoryService.add({
				user,
				attribute: "Весовая категория",
				fishID: fishID.rows[0].id,
				value: category,
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
			} else {
				await this.pg.query(`UPDATE fish SET category = '${value}' WHERE id = '${id}'`);
				await this.fishHistoryService.add({ user, attribute: "Весовая категория", fishID: id, value });
			}
		} catch (error) {
			console.log(error);
		}
	}
}
