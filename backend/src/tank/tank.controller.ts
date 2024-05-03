import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { TankService } from "./tank.service";

@Controller("tank")
export class TankController {
	constructor(private readonly tankService: TankService) {}
	@Post()
	async add(@Res() res: Response, @Body("tank") tank: string) {
		const include = await this.tankService.add(tank);
		if (!include) return res.status(200).send("Резервуар успешно добавлен");
		return res.status(400).send("Такой резервуар уже существует");
	}
	@Get()
	async getAll(@Res() res: Response) {
		const tanks = await this.tankService.getAll();
		return res.status(200).json(tanks);
	}
}
