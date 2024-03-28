import { Controller, Get, Res } from "@nestjs/common";
import { RoleService } from "./role.service";
import { Response } from "express";

@Controller("role")
export class RoleController {
	constructor(private readonly imageService: RoleService) {}
	@Get("all")
	getRoles(@Res() res: Response) {
		return this.imageService.getAll(res);
	}
}
