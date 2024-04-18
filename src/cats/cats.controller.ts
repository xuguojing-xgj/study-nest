// @@filename(cats.controller)
// 通常用来表示下面的代码块应该放在cats.controller这个文件中。
// 并不是特殊语法或者关键字
import { Controller, Get, Res, Post, HttpCode, Header, Redirect, Query, Param } from '@nestjs/common';
// 处理程序通常需要访问客户端请求的详细信息, Nest 提供对底层平台请求对象的访问 (默认为 Express )
import { Request } from 'express';

// 创建控制器 nest g controller [name] 
// Controller 控制器(负责传入请求并返回给客户端)
@Controller('cats') // 指定路径前缀 cats 
export class CatsController {
    // @Get() : http 请求方法装饰器 告诉 Nest 为 HTTP 请求的特定终点创建处理程序
    // 终结点对应于 HTTP 请求方法和理由路径
    // 例如 :
    // 控制器指定前缀(可选)为 cats 因此 Nest 会将请求映射到 GET /cats 到此处理程序
    // 路由路径包括: 可选的控制器路径前缀 和 请求方法装饰器中声明的任何路径字符串
    // 例如 : 
    // 路径前缀与装饰器 cats @Get('breed) 组合将为 GET /cats/breed
    @Get()
    // Nest 两种操作响应
    // 1. Standard(recommended) 标准(推荐)
    // 当请求程序返回 JavaScript 对象或者数组时, 它将自动序列化为 JSON 。但是当返回 JS 原始类型时(例如: string number boolean),Nest将只发送该值,而不会尝试序列化它
    // 默认情况下,响应状态码始终为 200 , 但使用 201 的 POST 请求除外, 我们可以通过在处理程序级别添加 @HttpCode(...) 装饰器来轻松更改此行为
    // 2. Library-specific 库
    // 使用 库 特定的 (例如: Express) 响应对象, 该对象可以使用方法处理程序签名中的 @Res() 装饰器注入 (例如: findAll(@Res() response) ) 处理本机响应方法
    // 使用 Express 可以使用 response.status(200).send() 代码构造响应
    findAll(@Res() request: Request): string {
        // 装饰器 
        // @Response(), @Res()  res
        // @Nest()  nest
        // @Session()   req.session
        // @Param(Key?: string) req.params / req.parmas[key]
        // @Body(Key?: string) req.body / req.body[key]
        // @Query(Key?: string) req.query / req.query[key]
        // @Headers(name?: string) req.headers / req.headers[name]
        // @Ip() req.ip
        // @HostParam() req.hosts

        // 为了与底层 HTTP 平台 (例如 Express 和 Fastify) 的类型兼容
        // Nest 提供了 @Res() 装饰 @Response() 器
        // 在方法处理程序 @Res or @Response 时 Nest 置于该处理程序的特定库模式 必须调用 response 对象
        // 例如:
        // res.json(...) 或者 res.send(...)
        // @Request(), @Req()   req 来发响应, 否则 HTTP 服务器将挂起
        console.log(request)
        return 'this action returns all cats';
    }

    // 创建新纪录的终结点
    // Nest 为所有标准 HTTP 方法提供了修饰器
    // 例如 :
    // @Get() @Post() @Put() @Delete() @Patch() @Options() 和 @Head()
    // 此外 @All() 还定义了一个处理所有问题的终结点
    @Post()
    create(): string {
        return 'this action adds a new cat'
    }

    // 路由通配符

    @Get('ab*cd') // 开头为 ab 结尾为 cd 等
    // 字符 ? + * 和 () 都可用于路由路径, 并且是其正则表达式对应项的子集
    // 连字符 (-) 和点 (.) 通过基于字符串的路径从字面上解释
    router(): string {
        return ''
    }

    // 状态码
    // 默认情况下响应状态码始终为 200 但是 POST 请求 201 除外
    // 我们可以通过处理程序级别添加 @HttpCode(...) 装饰器来轻松更改此行为
    @Post()
    // 通常情况下 状态代码不是静态的, 而是取决于各种因素,
    // 在这种情况下可以使用 库 特定的响应 (inject using @Res() ) 对象 (或者, 如果发生错误, 则抛出异常)
    @HttpCode(204)
    request() {
        return ''
    }

    // 自定义请求头 @Header() 装饰器 or 库特定的响应对象 ( 并直接调用 res.header() )
    @Post()
    @Header('Cache-Control', 'none')
    header() {
        return ''
    }

    // 重定向
    // @Redirect() 装饰器 or 库特定的响应对象 ( 并直接调用 res.redirect() )
    // @Redirect() 接受两个参数, url 并且 statusCode 都是可选地, 如果省略, 则默认 statusCode 值为 302 (Found)

    @Get()
    @Redirect('https://nestjs.com', 301)
    redirect(@Query('version') version) {
        console.log(version)
        if (version && version === '5') {
            return { url: 'https://doca.nestjs.com/v5/' }
        }
    }

    // 动态路由参数

    @Get(':id')
    // @Parma 修改方法参数
    findOne(@Param() params: any) {
        console.log(params.id)
        return `this action returns a #${params.id} cat`
    }
    // 引用访问 id 参数 params.id
    @Get(':id')
    findTwo(@Param('id') id: string): string {
        return `this action returns a #${id} cat`
    }
}

@Controller({ host: 'admin.example.com' })
export class AdminController {
    @Get()
    index(): string {
        return 'Admin page'
    }
}