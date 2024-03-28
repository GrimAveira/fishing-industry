import { Controller, Get, Res } from "@nestjs/common";
import { ShiftService } from "./shift.service";
import { Response } from "express";

@Controller("shift")
export class ShiftController {
	constructor(private readonly shiftService: ShiftService) {}
	@Get("all")
	getRoles(@Res() res: Response) {
		return this.shiftService.getAll(res);
	}
}
