
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
import TestLogin from './containers/testlogin'


import combineReducers from './reducer'  //涉及到合并reducer 不合并的话可以不用

//分为登录页和主页  做权限校验
import Auth from './Auth.js'
import Dashbord from './Dashbord'
import reducer from './redux/index'



import { BrowserRouter, Route, Link,Redirect, Switch } from 'react-router-dom'
//创建一个store counter执行reducer方法
// const store = createStore(counter, compose(
//   applyMiddleware(thunk),
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// ))

//const store = createStore(reducer)
//如果不处理异步 直接const store = createStore(counter)就可以了
//这里用了combineReducer  合并了auth.redux.js index.redux.js里两个reducer
const store = createStore(combineReducers,applyMiddleware(thunk))


ReactDOM.render(
  (
   
    <Provider store={store}>
    
      <BrowserRouter>

     
          <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" >
          {/* <Link to="/"><Menu.Item index="4">登录</Menu.Item></Link> */}
            <Link to="/login"><Menu.Item index="1">登录</Menu.Item></Link>
            <Link to="/register"> <Menu.Item index="2">注册</Menu.Item></Link>
            <Link to="TodoList"> <Menu.Item index="3">任务清单</Menu.Item></Link>
          </Menu>

          <Switch>
             {/*只命中匹配上的第一个route*/}
             <Route exact path='/Auth' component={Auth}></Route>
                      <Route path='/Dashbord' component={Dashbord}></Route>                   
                      <Redirect to='/Dashbord'></Redirect>
           
            {/* {Switch} 默认只会匹配第一个 */}
            {/* <Route path="/" exact component={App}></Route>
            {/* <Route exact path='/about/:id' component={about} /> */}
                              {/* match.params.id 取值 */}
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/TodoList" component={TodoList}></Route>
          </Switch>

      </BrowserRouter>
      <Footer/>
      <TestLogin />

    </Provider>
  ),
  document.getElementById('root'))
serviceWorker.unregister()