// 我们的 ValidationPipe 可以过滤掉方法处理程序不应该接受的属性,
// 在这种情况下, 我们可以将可接受的属性列如白名单,并且任何未包含在白名单中的属性都会自动从结果对象中删除

// 在 CreateCatDto 一下示例中, 我们的白名单是 name age bread

export class CreateCatDto {
    name: string;
    age: number;
    bread: string;
}


export class ListAllEntities {
    limit: string;
}


export class UpdateCatDto {

}