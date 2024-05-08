import { Controller, Get, Res } from "@nestjs/common";
import { TankHistoryService } from "./tank-history.service";
import { Response } from "express";

@Controller("tank-history")
export class TankHistoryController {
	constructor(private readonly tankHistoryService: TankHistoryService) {}
	@Get()
	async getAll(@Res() res: Response) {
		const tankHistory = await this.tankHistoryService.getView();
		return res.status(200).json(tankHistory);
	}
}
