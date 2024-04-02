import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DB_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USER, DATABASE_PORT } from "./utils/constants";
import { PostgresModule } from "nest-postgres";
import { CryptModule } from "./crypt/crypt.module";
import { LoggerMiddleware } from "./middleware/isAuth.middleware";
import { ShiftModule } from "./shift/shift.module";
import { RoleModule } from "./role/role.module";

@Module({
	imports: [
		PostgresModule.forRootAsync({
			useFactory: () => ({
				host: DB_HOST,
				database: DATABASE_NAME,
				password: DATABASE_PASSWORD,
				user: DATABASE_USER,
				port: DATABASE_PORT,
			}),
		}),
		AuthModule,
		CryptModule,
		ShiftModule,
		RoleModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes({ path: "auth/isAuth", method: RequestMethod.GET });
	}
}
