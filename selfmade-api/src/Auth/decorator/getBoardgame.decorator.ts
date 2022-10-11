import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetBoardgame = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx
        .switchToHttp()
        .getRequest();

        if(data){
            return request.boardgame[data];
        }
        return request.boardgame;
    });