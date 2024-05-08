import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { IData } from "src/interface";
import { ListPropertyService } from "src/list-property/list-property.service";
import { TankService } from "src/tank/tank.service";
import PropertyDTO from "./dto/property.dto";

@Injectable()
export class PropertyService {
	constructor(
		@InjectClient() private readonly pg: Client,
		@Inject(forwardRef(() => TankService)) private readonly tankService: TankService,
		@Inject(ListPropertyService) private readonly listPropertyService: ListPropertyService,
	) {}
	async add({ name, optimal_value }: PropertyDTO) {
		try {
			const properties = await this.getAll();
			const include = properties.map((property) => property.name).includes(name);
			if (!include) {
				const propertyID = (
					await this.pg.query(
						`INSERT INTO tank_property (name, optimal_value) VALUES ('${name}', '${optimal_value}') RETURNING id`,
					)
				).rows[0].id;
				const tanks = await this.tankService.getAll();
				tanks.forEach(async ({ id }) => await this.listPropertyService.add(id, propertyID));
			}
			return include;
		} catch (error) {
			console.log(error);
		}
	}
	async getAll() {
		try {
			return (await this.pg.query<IData>(`SELECT * FROM tank_property`)).rows;
		} catch (error) {
			console.log(error);
		}
	}
}
