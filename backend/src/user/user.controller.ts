import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Get()
	async getAll(@Res() res: Response) {
		const users = await this.userService.getAll();
		return res.status(200).json(users);
	}
	@Post()
	async deactivate(@Res() res: Response, @Body() { login }: { login: string }) {
		await this.userService.deactivate(login);
		return res.status(200).send("Пользователь успешно деактивирован");
	}
}
