import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // Bearer token
    constructor(config: ConfigService) {
       super({
        jwtFromRequest:
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:"NODE"
       })
    }
    async validate(payload:any) {
        return payload;  // trả về sau khi ktr token
    }
}    