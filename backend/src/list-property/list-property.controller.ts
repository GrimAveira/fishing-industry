import { Body, Controller, Get, Patch, Req, Res } from "@nestjs/common";
import { ListPropertyService } from "./list-property.service";
import { Request, Response } from "express";
import { EditTankDTO } from "./dto/edit-tank.dto";

@Controller("list-property")
export class ListPropertyController {
	constructor(private readonly listPropertyService: ListPropertyService) {}
	@Get()
	async getAll(@Res() res: Response) {
		const list_properties = await this.listPropertyService.getAll();
		return res.status(200).json(list_properties);
	}
	@Patch()
	async update(@Res() res: Response, @Req() req: Request, @Body() payload: EditTankDTO) {
		try {
			await this.listPropertyService.editValue(payload, req.cookies["session"]);
			return res.status(200).json("Данные успешно занесены");
		} catch (error) {
			return res.status(500).json("Ошибка со стороны сервера");
		}
	}
}
