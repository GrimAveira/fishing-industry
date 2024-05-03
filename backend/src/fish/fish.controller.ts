import { Body, Controller, Post, Res } from "@nestjs/common";
import { FishService } from "./fish.service";
import { FishDTO } from "./dto/fish.dto";
import { Response } from "express";

@Controller("fish")
export class FishController {
	constructor(private readonly fishService: FishService) {}
	@Post()
	async add(@Res() res: Response, @Body() fish: FishDTO) {
		try {
			await this.fishService.add(fish);
			return res.status(200).send("Рыба успешно добавлена");
		} catch (error) {
			return res.status(500).json("Ошибка добавления");
		}
	}
}
