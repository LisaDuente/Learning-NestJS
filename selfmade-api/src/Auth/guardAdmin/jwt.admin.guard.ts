import { AuthGuard } from "@nestjs/passport";

//this files purpose is to eliminate the possibility of spellingmistakes in AuthGuard("HERE")
export class JwtGuardAdmin extends AuthGuard("admin"){
    constructor(){
        super();
    }
}