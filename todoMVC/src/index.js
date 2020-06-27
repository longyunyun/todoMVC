
import React from 'react'
import ReactDOM from 'react-dom'
 import { createStore, applyMiddleware, compose } from 'redux' // applyMiddleware 处理中间键
import thunk from 'redux-thunk'  // 中间键
 import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import App from './App'
import { Menu } from 'element-react'
import 'element-theme-default'
//  import { counter } from './redux'
import Login from './containers/login'
import Register from './containers/register'
import TodoList from './containers/TodoList'
import './index.css';
import Footer from './footer'
// import TestLogin from './containers/testlogin'


import combineReducers from './reducer'  //涉及到合并reducer 不合并的话可以不用

//分为登录页和主页  做权限校验
import Dashbord from './Dashbord'

import { BrowserRouter, Route, Link,Redirect, Switch } from 'react-router-dom'

const store = createStore(combineReducers,applyMiddleware(thunk))


ReactDOM.render(
  (
   
    <Provider store={store}>
    
      <BrowserRouter>

     
          <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" >
            <Link to="/login"><Menu.Item index="1">登录</Menu.Item></Link>
            <Link to="/register"> <Menu.Item index="2">注册</Menu.Item></Link>
            <Link to="/TodoList"> <Menu.Item index="3">任务清单</Menu.Item></Link>
          </Menu>

          <Switch>
          <Route path="/register" component={Register}></Route>
             {/*只命中匹配上的第一个route*/}
             <Route exact path='/Login' component={Login}></Route>
                      <Route path='/Dashbord' component={Dashbord}></Route>                   
                      <Redirect to='/Dashbord'></Redirect>
           
            {/* <Route path="/login" component={Login}></Route> */}
         
            {/* <Route path="/TodoList" component={TodoList}></Route> */}
          </Switch>

      </BrowserRouter>
      <Footer/>
    </Provider>
  ),
  document.getElementById('root'))
serviceWorker.unregister()