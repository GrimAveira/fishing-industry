import { Client } from "pg";
import { Inject, Injectable, Req, Res } from "@nestjs/common";
import { InjectClient } from "nest-postgres";
import { RegistrationDTO } from "./dto/registration.dto";
import { LoginDTO } from "./dto/login.dto";
import { Request, Response } from "express";
import { CryptService } from "src/crypt/crypt.service";
import { randomUUID } from "crypto";

@Injectable()
export class AuthService {
	constructor(
		@InjectClient() private readonly pg: Client,
		@Inject(CryptService) private readonly cryptService: CryptService,
	) {}
	async registration(@Res() res: Response, DTO: RegistrationDTO) {
		try {
			const user = await this.pg.query(`SELECT login FROM public.user WHERE login='${DTO.login}'`).catch((error) => {
				throw error;
			});
			if (user.rowCount) return res.status(400).send("Пользователь с введённым логином уже зарегистрирован");
			const hashPassword = this.cryptService.hash(DTO.password);
			await this.pg
				.query(
					`INSERT INTO public.user (login, first_name, second_name, patronymic, password, shift, role) VALUES ('${DTO.login}','${DTO.firstName}','${DTO.secondName}','${DTO.patronymic}','${hashPassword}', ,'${DTO.shift}', '${DTO.role}')`,
				)
				.catch((error) => {
					throw error;
				});
			return res.status(200).send("Пользователь успешно зарегистрирован");
		} catch (err) {
			console.log(err);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
	async login(@Res() res: Response, DTO: LoginDTO) {
		try {
			const user = await this.pg.query(`SELECT * FROM public.user WHERE login='${DTO.login}'`).catch((error) => {
				throw error;
			});
			if (!user.rowCount) return res.status(400).send("Пользователя с введённым логином не существует");
			const correctPassword = this.cryptService.validate(DTO.password, user.rows[0].password);
			if (!correctPassword) return res.status(400).send("Введён неверный пароль");
			const sessionID = randomUUID();
			await this.pg
				.query(`INSERT INTO public.session (hash, login) VALUES ('${sessionID}', '${user.rows[0].login}')`)
				.catch((error) => {
					throw error;
				});
			return res
				.status(200)
				.cookie("session", sessionID, { httpOnly: true })
				.json({ login: user.rows[0].login, role: `${user.rows[0].role}`, message: "Успешная аутентификация" });
		} catch (error) {
			console.error(error);
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
	async logout(@Req() req: Request, @Res() res: Response) {
		try {
			const sessionID = req.headers.cookie?.split("=")[1];
			await this.pg.query(`DELETE FROM public.session WHERE hash='${sessionID}'`).catch((error) => {
				throw error;
			});
			res.clearCookie("session");
			return res.status(200).send("Успешный выход");
		} catch (error) {
			return res.status(500).send("Непредвиденная ошибка");
		}
	}
	async isAuth(@Req() req: Request, @Res() res: Response) {
		try {
			const sessionID = req.headers.cookie?.split("=")[1];
			if (!sessionID) res.status(401).send("Вы не аутентифицированы");
			const currentSession = await this.pg
				.query(`SELECT * FROM public.session WHERE hash='${sessionID}'`)
				.catch((error) => {
					throw error;
				});
			if (!currentSession.rowCount) res.status(401).send("Ваша сессия истекла");
			const user = await this.pg
				.query(`SELECT * FROM public.user WHERE login='${currentSession.rows[0].login}'`)
				.catch((error) => {
					throw error;
				});
			return res
				.status(200)
				.cookie("session", sessionID, { httpOnly: true })
				.json({ login: user.rows[0]["login"], role: `${user.rows[0]["role"]}`, message: "Успешная аутентификация" });
		} catch (error) {}
	}
}
