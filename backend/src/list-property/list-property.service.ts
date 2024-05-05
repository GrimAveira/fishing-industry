import { Inject, Injectable } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { EditTankDTO } from "./dto/edit-tank.dto";
import { SessionService } from "src/session/session.service";
import { TankHistoryService } from "src/tank-history/tank-history.service";
import { ListPropertyDTO } from "./dto/list-property.dto";

@Injectable()
export class ListPropertyService {
	constructor(
		@InjectClient() private readonly pg: Client,
		@Inject(SessionService) private readonly sessionService: SessionService,
		@Inject(TankHistoryService) private readonly tankHistoryService: TankHistoryService,
	) {}
	async getAll() {
		try {
			return (await this.pg.query<ListPropertyDTO>(`SELECT * FROM list_property`)).rows;
		} catch (error) {
			console.log(error);
		}
	}
	async add(tank: string, property: string) {
		try {
			await this.pg.query(`INSERT INTO list_property (tank, property) VALUES ('${tank}', '${property}')`);
		} catch (error) {
			console.log(error);
		}
	}
	async editValue({ attributeID, tankID, value }: EditTankDTO, hash: string) {
		try {
			const user = await this.sessionService.getUser(hash);
			await this.pg.query(
				`UPDATE list_property SET value = '${value}' WHERE tank = '${tankID}' and property = '${attributeID}'`,
			);
			await this.tankHistoryService.add({ user, attribute: attributeID, tankID, value });
		} catch (error) {
			console.log(error);
		}
	}
}
