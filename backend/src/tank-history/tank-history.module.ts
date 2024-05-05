import { Module } from "@nestjs/common";
import { TankHistoryController } from "./tank-history.controller";
import { TankHistoryService } from "./tank-history.service";

@Module({
	controllers: [TankHistoryController],
	providers: [TankHistoryService],
	exports: [TankHistoryService],
})
export class TankHistoryModule {}
