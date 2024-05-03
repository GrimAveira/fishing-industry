import { Module } from "@nestjs/common";
import { ListPropertyController } from "./list-property.controller";
import { ListPropertyService } from "./list-property.service";

@Module({
	controllers: [ListPropertyController],
	providers: [ListPropertyService],
	exports: [ListPropertyService],
})
export class ListPropertyModule {}
