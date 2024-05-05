import { Module } from "@nestjs/common";
import { ListPropertyController } from "./list-property.controller";
import { ListPropertyService } from "./list-property.service";
import { TankHistoryModule } from "src/tank-history/tank-history.module";
import { SessionModule } from "src/session/session.module";

@Module({
	controllers: [ListPropertyController],
	providers: [ListPropertyService],
	exports: [ListPropertyService],
	imports: [TankHistoryModule, SessionModule],
})
export class ListPropertyModule {}
