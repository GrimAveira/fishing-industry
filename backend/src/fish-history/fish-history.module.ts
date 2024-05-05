import { Module } from "@nestjs/common";
import { FishHistoryController } from "./fish-history.controller";
import { FishHistoryService } from "./fish-history.service";

@Module({
	controllers: [FishHistoryController],
	providers: [FishHistoryService],
	exports: [FishHistoryService],
})
export class FishHistoryModule {}
