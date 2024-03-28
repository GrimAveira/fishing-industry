import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class CryptService {
	validate(password: string, hashPassword: string): boolean {
		return bcrypt.compareSync(password, hashPassword);
	}
	hash(password: string): string {
		const salt = bcrypt.genSaltSync(7);
		return bcrypt.hashSync(password, salt);
	}
}
