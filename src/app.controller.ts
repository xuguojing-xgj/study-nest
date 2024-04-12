// 带有单个路由的基本控制器
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Controller 控制器 负责处理传入请求并将响应返回给客户端
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
