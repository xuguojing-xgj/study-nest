// T 应用程序的根模块 (root module)
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';

@Module({
    imports: [],
    controllers: [AppController, CatsController],
    providers: [AppService],
})
export class AppModule { }
