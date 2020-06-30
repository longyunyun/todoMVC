# TodoMVC
前端：React Element-React 
后端：Express MongoDB

## TodoMVC功能
1.实现了基于jwt的登录注册功能，动态的token来进行身份认证

2.用户登录、注册后，可以进入任务（Todo）界面

3.如果用户不注销，刷新后也可以直接进入任务清单界面，即可以保持登录状态

4.任务（Todo）界面有新建任务、改变任务状态、删除任务、删除全部已完成任务、全选（全部完成/全不完成）以及统计全部、已完成、待完成任务数量等功能。


## TodoMVC使用方法
请确保有MongoDB数据库！

### 前端运行方法 1

打包好的文件在\todoMVC\build\，直接打开index.html

### 前端运行方法 2
### `npm install`
### `npm start`
浏览器访问 http://localhost:3000

### 前端运行方法 3
### ` docker build -t todomvcweb .`
### ` docker run -p 3000:3000 todomvcweb`
浏览器访问 http://localhost:3000

### 后端运行方法 1
### `pm2 start ./bin/www --watch`

### 后端运行方法 2
### `npm install`
### `npm start`

### 后端运行方法 3
### `docker build -t todomvcservice .`
### `docker run -p 3001:3001 todomvcservice`

## 涉及到的配置文件

前端config.js中定义了后端的地址global.targetUrl = 'http://127.0.0.1:3001/';

后端config.js中定义了数据库 mongodb : 'mongodb://127.0.0.1:27017/ToDoMVC',（如果数据库有账户名密码，应该这样写'mongodb://用户名:密码@ip地址:端口号/数据库'）
