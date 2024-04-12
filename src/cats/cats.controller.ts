// @@filename(cats.controller)
// 通常用来表示下面的代码块应该放在cats.controller这个文件中。
// 并不是特殊语法或者关键字
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
    @Get()
    findAll(): string {
        return '';
    }
}
