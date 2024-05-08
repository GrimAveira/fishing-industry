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
import { TypeModule } from "./type/type.module";
import { CategoryModule } from "./category/category.module";
import { ControllerModule } from "./controller/controller.module";
import { PropertyModule } from "./property/property.module";
import { TankModule } from "./tank/tank.module";
import { ListPropertyModule } from "./list-property/list-property.module";
import { FishModule } from "./fish/fish.module";
import { FishHistoryModule } from "./fish-history/fish-history.module";
import { SessionModule } from "./session/session.module";
import { TankHistoryModule } from "./tank-history/tank-history.module";
import { UserModule } from './user/user.module';

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
		TypeModule,
		CategoryModule,
		ControllerModule,
		PropertyModule,
		TankModule,
		ListPropertyModule,
		FishModule,
		FishHistoryModule,
		SessionModule,
		TankHistoryModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LoggerMiddleware)
			.forRoutes(
				{ path: "type", method: RequestMethod.ALL },
				{ path: "tank", method: RequestMethod.ALL },
				{ path: "fish", method: RequestMethod.ALL },
				{ path: "shift", method: RequestMethod.ALL },
				{ path: "role", method: RequestMethod.ALL },
				{ path: "property", method: RequestMethod.ALL },
				{ path: "list-property", method: RequestMethod.ALL },
				{ path: "category", method: RequestMethod.ALL },
				{ path: "tank-history", method: RequestMethod.ALL },
				{ path: "fish-history", method: RequestMethod.ALL },
			);
	}
}
