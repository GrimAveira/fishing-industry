import { Body, Controller, Post, Res } from "@nestjs/common";
import { TypeService } from "./type.service";
import { Response } from "express";

@Controller("type")
export class TypeController {
	constructor(private readonly typeService: TypeService) {}
	@Post()
	getRoles(@Res() res: Response, @Body("type") type: string) {
		return this.typeService.add(res, type);
	}
}
