import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CategoryService } from "./category.service";
import { CategoryAddDTO } from "./dto/login.dto";

@Controller("category")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}
	@Post()
	getRoles(@Res() res: Response, @Body("category") category: CategoryAddDTO) {
		return this.categoryService.add(res, category);
	}
}
