import { Module, forwardRef } from "@nestjs/common";
import { PropertyController } from "./property.controller";
import { PropertyService } from "./property.service";
import { TankModule } from "src/tank/tank.module";
import { ListPropertyModule } from "src/list-property/list-property.module";

@Module({
	controllers: [PropertyController],
	providers: [PropertyService],
	imports: [forwardRef(() => TankModule), ListPropertyModule],
	exports: [PropertyService],
})
export class PropertyModule {}
