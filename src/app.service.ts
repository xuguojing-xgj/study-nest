// 单一方法的基本服务 (service) method
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!!!';
    }
}
