// @@filename(cats.controller)
// 通常用来表示下面的代码块应该放在cats.controller这个文件中。
// 并不是特殊语法或者关键字
import { Controller, Get, Res, Post, Body, Put, Delete, HttpCode, Header, Redirect, Query, Param, HostParam } from '@nestjs/common';
// 处理程序通常需要访问客户端请求的详细信息, Nest 提供对底层平台请求对象的访问 (默认为 Express )
import { Request } from 'express';

import { CreateCatDto, ListAllEntities, UpdateCatDto } from './create-cat.dto';

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
    // 使用特定的 库 (例如: Express) 响应对象, 该对象可以使用方法处理程序签名中的 @Res() 装饰器注入 (例如: findAll(@Res() response) ) 处理本机响应方法
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

    // 路由通配符 将匹配任何字符组合。

    @Get('ab*cd') // 开头为 ab 结尾为 cd 等
    // 'ab*cd' 路由路径将匹配 abcd ab_cd abecd
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
    // 当您需要接受动态数据作为请求的一部分时, (例如: GET/cats/1 获取 ID 为 1 的 cat), 具有静态路径路由将不起作用
    // 下面的 @Get() 装饰器示例中的路由参数标记演示了这种用法, 以这种方式声明的路由参数可以使用 @Param() 装饰器来访问
    // @Param 用于修饰方法参数 (上例中的 params ) 并使路由参数可用作方法体内该修饰方法参数的属性
    // 在下面代码中 我们可以通过引用 params.id 来访问 id 参数
    @Get(':id')
    // @Parma 修改方法参数
    findOne(@Param() params: any) {
        console.log(params.id)
        return `this action returns a #${params.id} cat 这个 ?`
    }
    // 引用访问 id 参数 params.id
    // 您还可以通过特定的参数标记传递给装饰器,然后在方法体中直接通过名称引用路由参数
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

// host 动态值
// @HostParam(...) 装饰器 来捕获主机名中该位置的动态值
@Controller({ host: ':account.example.com' })

export class AccountController {
    @Get()
    getInfo(@HostParam('account') account: string) {
        return account;
    }
}

// 范围

// 在 Nest 中 几乎所有内容都是传入请求中共享的
// Nest 有一个与数据库的连接池, 具有全局状态的单例服务等
// node.js 不遵循请求/响应多线程无状态模型, 在该模型中,每个请求都由单独的线程处理(使用单例实例的应用程序是完全安全的)

@Controller()
export class AsyncController {
    // 异步
    // 每个异步函数都必须返回一个 Promise 这意味着您可以返回一个延迟值
    @Get()
    async findAll(): Promise<any[]> {
        return [];
    }
    // 上述代码完全是有效的, 此外 Nest 路由处理程序由于能够返回 RxJs 可观察流变得更加强大
    // Nest 将自动订阅下面的源并获取最后发出的值(一旦流完成)
    // @Get()
    // findRxJS(): Observable<any[]> {
    //     return of([])
    // }
}



// 请求有效负载

// 我们之前的 POST 路由处理程序示例不接受任何客户端参数
// 让我在此添加 @Body() 装饰器来解决此问题

// 但首先 (如果您使用 TypeScript) 我们需要确定 DTO (数据传输对象) 架构
// DTO 是一个定义数据如何通过网络发送的对象

// 我们可以通过 TypeScript 接口或者简单的类来确定 DTO 模式

// 我们在这里推荐使用 类 因为 类 是 JavaScript ES6 标准的一部分 因此它们在编译后的 JavaScript 中作为真实实体保留
// 另一方面, 由于 TypeScript 接口在转义过程中被删除, 因此 Nest 在运行时无法引用它们(这很重要)
// 因为 Pipes(数据转换 数据验证 异常处理) 等功能在运行时可以访问变量的元类型时可以提供额外的可能性

@Controller()
export class Created {
    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        return 'This action adds a new cat';
    }
}

// 错误处理 (单独的文章)




// 完整资源示例

@Controller('complete')
export class Complete {
    @Post()
    create(@Body() createCatDto: CreateCatDto) {
        return `@Post() @Body() 示例 createCatDto -> ${createCatDto}`
    }

    @Get()
    findAll(@Query() query: ListAllEntities) {
        return `@Get() @Query() 示例 -> query: ${query.limit}`
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `@Get(':id')  @Param('id') 动态参数 id -> ${id}`
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return `@Put(':id') @Parma('id') @Body() 接收客户端参数`
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `删除的id -> ${id}`
    }
}