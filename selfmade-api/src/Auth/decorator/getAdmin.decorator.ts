import { createParamDecorator, ExecutionContext } from "@nestjs/common";

//manybe this is redundand, maybe usfull for later
export const GetAdmin = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx
        .switchToHttp()
        .getRequest();

        if(data){
            return request.admin[data];
        }
        return request.admin;
    });