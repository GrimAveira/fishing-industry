import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { InjectClient } from "nest-postgres";
import { Client } from "pg";
import { RoleDTO } from "./dto/role.dto";

@Injectable()
export class RoleService {
	constructor(@InjectClient() private readonly pg: Client) {}
	async getAll(res: Response) {
		try {
			const roles = await this.pg.query<RoleDTO[]>(`SELECT * FROM role`);
			return res.status(200).send(roles.rows);
		} catch (error) {
			console.log(error);
		}
	}
}
