# freelog-api-gateway 飞致网络网关服务

1.本服务主要基于eggJs实现.

2.本服务支持自由定制http处理管道中的组件执行顺序,方便后续自由拓展.

3.统一处理认证信息,然后转换成准明文信息的身份信息,直接传递给上游服务使用

4.组件目前没有特意区分认证与授权.需要在配置组件顺序时,注意到执行顺序即可.也为了方便后续做日志分析,流量统计分析或者拓展负载均衡,熔断处理等组件

5.目前http代理使用request,可以自由替换为其他的库

6.目前路由规则匹配是根据url-path计算分值来匹配,同样的路由,自定义参数匹配的路由比完全匹配的路由分值略低一点.

7.项目目前根据公司内部使用场景实现.目前没有授权组件,即通过认证就可以获得授权.后续有需求可以拓展实现授权组件

## 使用说明

### 路由配置说明
| 参数 | 说明 |
| :--- | :--- |
|routerPrefix|url前缀,一般获取urlPath的前两部分|
|routerUrlRule|路由规则,path中的参数可以用:开头的字符数字下划线定义|
|httpMethod|支持的http请求方法|
|mockStatus|是否启动mock,如果启动,则需要参考mock相关配置|
|httpComponentRuleIds|http请求管道中的处理组件规则配置|
|upstream|上游服务器相关配置|

#### upstream配置说明
| 参数 | 说明 |
| :--- | :--- |
|protocol|请求上游服务器的协议头|
|port|请求上游服务器的端口|
|method|请求上游服务器的http method,为空则默认和当前请求的method|
|httpMethod|支持的http请求方法|
|serverGroupId| 上游服务器分组ID |
|forwardUriScheme|路由到上游服务器的路径.自定义参数取值用:开头定义|


### 示例
```js
{
	"routerPrefix": "/v1/presentables/",
	"routerUrlRule": "/v1/presentables/:id/",
	"httpMethod": [
		"GET",
		"POST"
	],
	"httpComponentRuleIds": [],
	"upstream": {
		"protocol": "http",
		"port": 7005,
		"method": null,
		"serverGroupId": "5c175892e5c181401cd91988",
		"forwardUriScheme": "/v1/presentables/:id/"
	},
	"status": 1,
	"mockStatus": 0
}
```


### http管道处理组件规则配置说明

1.string值代表需要使用的组件名称

2.object值代表嵌套的规则.目前支持must和should关键字

3.must关键字代表内部的所有组件必须全部处理返回成功,则代表成功

4.should关键字代表内部任意的一个组件处理成功,则代表成功

5.must和should内部支持任意层级的嵌套


### 示例解析

1.jwt,internal-identity,null-identity任意一个组件返回成功,则终止本次should规则,然后进入must规则

2.must规则中client或ip-black-white-list任意一个返回成功,则跳出本次should规则,进行jwt-node处理

3.组件的实际执行顺序是按照数据的编码顺序依次执行的.should中执行成功,剩余则不再执行

### 示例
```js
[{
	"should": [
		"jwt",
		"internal-identity",
		"null-identity"
	],
	"must": [{
			"should": ["client", "ip-black-white-list"]
		},
		"jwt-node"
	]
} , "node-jwt" ]
```