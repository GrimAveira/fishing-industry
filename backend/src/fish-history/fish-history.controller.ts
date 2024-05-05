import { Controller, Get, Res } from "@nestjs/common";
import { FishHistoryService } from "./fish-history.service";
import { Response } from "express";

@Controller("fish-history")
export class FishHistoryController {
	constructor(private readonly fishHistoryService: FishHistoryService) {}
	@Get()
	async getAll(@Res() res: Response) {
		const fish_history = await this.fishHistoryService.getView();
		return res.status(200).json(fish_history);
	}
}
