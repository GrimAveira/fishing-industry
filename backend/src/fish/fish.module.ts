import { Module } from "@nestjs/common";
import { FishController } from "./fish.controller";
import { FishService } from "./fish.service";
import { FishHistoryModule } from "src/fish-history/fish-history.module";
import { SessionModule } from "src/session/session.module";

@Module({
	controllers: [FishController],
	providers: [FishService],
	imports: [FishHistoryModule, SessionModule],
})
export class FishModule {}
