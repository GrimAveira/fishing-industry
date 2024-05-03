import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CategoryService } from "./category.service";
import { CategoryAddDTO } from "./dto/login.dto";

@Controller("category")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}
	@Post()
	async add(@Res() res: Response, @Body("category") category: CategoryAddDTO) {
		const include = await this.categoryService.add(category);
		if (!include) return res.status(200).send("Категория успешно добавлена");
		return res.status(400).send("Категория с таким названием уже существует");
	}
	@Get()
	async getAll(@Res() res: Response) {
		const categories = await this.categoryService.getAll();
		return res.status(200).json(categories);
	}
}
