import { Body, Controller, Post, Res } from "@nestjs/common";
import { PropertyService } from "./property.service";
import { Response } from "express";

@Controller("property")
export class PropertyController {
	constructor(private readonly propertyService: PropertyService) {}
	@Post()
	async add(@Res() res: Response, @Body("property") property: string) {
		const include = await this.propertyService.add(property);
		if (!include) return res.status(200).send("Характеристика успешно добавлена");
		return res.status(400).send("Такая характеристика уже существует");
	}
}
