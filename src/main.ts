// 入口文件 使用核心函数 NestFactory 创建 Nest 应用实例
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// bootstrap 为异步函数 为 Nest 应用程序的启动过程
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(9527);
}
bootstrap();
