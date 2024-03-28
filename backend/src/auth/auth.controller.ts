import { Body, Controller, Delete, Get, Post, Req, Res } from "@nestjs/common";
import { RegistrationDTO } from "./dto/registration.dto";
import { LoginDTO } from "./dto/login.dto";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("registration")
	async registration(@Res() res: Response, @Body() DTO: RegistrationDTO) {
		return this.authService.registration(res, DTO);
	}
	@Post("login")
	async login(@Res() res: Response, @Body() DTO: LoginDTO) {
		return this.authService.login(res, DTO);
	}
	@Delete("logout")
	async logout(@Req() req: Request, @Res() res: Response) {
		return this.authService.logout(req, res);
	}
	@Get("isAuth")
	async isAuth(@Req() req: Request, @Res() res: Response) {
		return this.authService.isAuth(req, res);
	}
}
