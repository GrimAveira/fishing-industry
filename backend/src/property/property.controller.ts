import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { PropertyService } from "./property.service";
import { Response } from "express";
import PropertyDTO from "./dto/property.dto";

@Controller("property")
export class PropertyController {
	constructor(private readonly propertyService: PropertyService) {}
	@Post()
	async add(@Res() res: Response, @Body("property") property: PropertyDTO) {
		console.log(property);
		const include = await this.propertyService.add(property);
		if (!include) return res.status(200).send("Характеристика успешно добавлена");
		return res.status(400).send("Такая характеристика уже существует");
	}
	@Get()
	async getAll(@Res() res: Response) {
		const properties = await this.propertyService.getAll();
		return res.status(200).json(properties);
	}
}
