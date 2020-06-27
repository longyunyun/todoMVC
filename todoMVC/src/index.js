
import React from 'react'
import ReactDOM from 'react-dom'
 import { createStore, applyMiddleware, compose } from 'redux' // applyMiddleware 处理中间键
import thunk from 'redux-thunk'  // 中间键
 import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import App from './App'
import { Menu } from 'element-react'
import 'element-theme-default'
 import { counter } from './redux'
import Login from './containers/login'
import Register from './containers/register'
import TodoList from './containers/TodoList'
import './index.css';
import Footer from './footer'

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
//创建一个store counter执行reducer方法
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDOM.render(
  (
    <Provider store={store}>
    <div className="body">
      <BrowserRouter>

     
          <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" >
          <Link to="/"><Menu.Item index="4">登录</Menu.Item></Link>
            <Link to="/login"><Menu.Item index="1">登录</Menu.Item></Link>
            <Link to="/register"> <Menu.Item index="2">注册</Menu.Item></Link>
            <Link to="TodoList"> <Menu.Item index="3">任务清单</Menu.Item></Link>
          </Menu>

          <Switch>
            {/* {Switch} 默认只会匹配第一个 */}
            <Route path="/" exact component={App}></Route>
            {/* <Route exact path='/about/:id' component={about} />
                              {/* match.params.id 取值 */}
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/TodoList" component={TodoList}></Route>
          </Switch>

      </BrowserRouter>
      <Footer/>
 </div>
    </Provider>
  ),
  document.getElementById('root'))
serviceWorker.unregister()