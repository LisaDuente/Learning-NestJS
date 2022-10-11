import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminAuthDto, UserAuthDto } from './dto';


@Controller('auth')
export class AuthController {
    constructor(private service: AuthService){

    }

    @Post("signUpAdmin")
    signUpAdmin(@Body() aDto: AdminAuthDto){
        return this.service.signUpAdmin(aDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("signInAdmin")
    signInAdmin(@Body() aDto: AdminAuthDto){
        return this.service.signInAdmin(aDto);
    }

    @Post("signUpUser")
    signUpUser(@Body() uDto: UserAuthDto){
        return this.service.signUpUser(uDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("signInUser")
    signInUser(@Body() uDto: UserAuthDto){
        return this.service.signInUser(uDto);
    }
}
