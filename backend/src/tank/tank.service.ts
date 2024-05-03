import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { IData } from "src/interface";
import { ListPropertyService } from "src/list-property/list-property.service";
import { PropertyService } from "src/property/property.service";

@Injectable()
export class TankService {
	constructor(
		@InjectClient() private readonly pg: Client,
		@Inject(forwardRef(() => PropertyService)) private readonly propertyService: PropertyService,
		@Inject(ListPropertyService) private readonly listPropertyService: ListPropertyService,
	) {}
	async add(tank: string) {
		try {
			const tanks = await this.getAll();
			const include = tanks.map((tank) => tank.name).includes(tank);
			if (!include) {
				const tankID = (await this.pg.query(`INSERT INTO tank (name) VALUES ('${tank}') RETURNING id`)).rows[0].id;
				const properties = await this.propertyService.getAll();
				properties.forEach(async ({ id }) => await this.listPropertyService.add(tankID, id));
			}
			return include;
		} catch (error) {
			console.log(error);
		}
	}
	async getAll() {
		try {
			return (await this.pg.query<IData>(`SELECT * FROM tank`)).rows;
		} catch (error) {
			console.log(error);
		}
	}
}
