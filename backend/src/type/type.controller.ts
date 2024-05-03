import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { TypeService } from "./type.service";
import { Response } from "express";

@Controller("type")
export class TypeController {
	constructor(private readonly typeService: TypeService) {}
	@Post()
	async add(@Res() res: Response, @Body("type") type: string) {
		const include = await this.typeService.add(type);
		if (!include) return res.status(200).send("Тип успешно добавлен");
		return res.status(400).send("Такой тип уже существует");
	}
	@Get()
	async getAll(@Res() res: Response) {
		const types = await this.typeService.getAll();
		return res.status(200).json(types);
	}
}
