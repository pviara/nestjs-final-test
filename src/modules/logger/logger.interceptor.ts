import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { yellow, green } from "chalk";
import { catchError, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        const req = context.switchToHttp().getRequest();
        const { statusCode } = context.switchToHttp().getResponse();
        const { url, method, params, query, body } = req;

        console.log(yellow("Request"), { url, method, params, query, body });
        return next
            .handle()
            .pipe(
                catchError((err) => {
                    throw err;
                })
            )
            .pipe(tap((data) => console.log(green("Response"), { statusCode, data })));
    }
}
