import { Body, Controller, Get, Patch, Post, Req, Res } from "@nestjs/common";
import { FishService } from "./fish.service";
import { FishDTO } from "./dto/fish.dto";
import { Request, Response } from "express";
import { EditFishDTO } from "./dto/edit-fish.dto";

@Controller("fish")
export class FishController {
	constructor(private readonly fishService: FishService) {}
	@Post()
	async add(@Res() res: Response, @Req() req: Request, @Body() fish: FishDTO) {
		try {
			await this.fishService.add(fish, req.cookies["session"]);
			return res.status(200).send("Рыба успешно добавлена");
		} catch (error) {
			return res.status(500).json("Ошибка добавления");
		}
	}
	@Get()
	async getAll(@Res() res: Response) {
		try {
			const fish = await this.fishService.getAll();
			return res.status(200).json(fish);
		} catch (error) {
			return res.status(500).json("Ошибка со стороны сервера");
		}
	}
	@Patch()
	async update(@Res() res: Response, @Req() req: Request, @Body() payload: EditFishDTO) {
		try {
			await this.fishService.edit(payload, req.cookies["session"]);
			return res.status(200).json("Данные успешно занесены");
		} catch (error) {
			return res.status(500).json("Ошибка со стороны сервера");
		}
	}
}
