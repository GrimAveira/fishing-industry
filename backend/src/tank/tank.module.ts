import { Module, forwardRef } from "@nestjs/common";
import { TankController } from "./tank.controller";
import { TankService } from "./tank.service";
import { ListPropertyModule } from "src/list-property/list-property.module";
import { PropertyModule } from "src/property/property.module";

@Module({
	controllers: [TankController],
	providers: [TankService],
	imports: [forwardRef(() => PropertyModule), ListPropertyModule],
	exports: [TankService],
})
export class TankModule {}
