import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CryptModule } from "src/crypt/crypt.module";

@Module({
	controllers: [AuthController],
	imports: [CryptModule],
	providers: [AuthService],
})
export class AuthModule {}
