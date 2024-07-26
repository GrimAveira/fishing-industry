import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { ShiftService } from "./shift.service";
import { Response } from "express";
import { ShiftDTO } from "./dto/shift.dto";

@Controller("shift")
export class ShiftController {
	constructor(private readonly shiftService: ShiftService) {}
	@Get("all")
	getShifts(@Res() res: Response) {
		return this.shiftService.getAll(res);
	}
	@Post()
	async addShift(@Res() res: Response, @Body() shift: ShiftDTO) {
		const isExists = await this.shiftService.addShift(shift);
		if (isExists) return res.status(400).send("Такая смена уже существует");
		return res.status(200).send("Cмена успешно создана");
	}
}
