import React from 'react'
import './App.css'
import Footer from './footer'
import { Menu } from 'element-react'
import 'element-theme-default'
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import Login from './containers/login/login';
import Register from './containers/register/register';
import TodoList from './components/TodoList';

function App () {
 
  
  return (
    <div className="App">
       <Router>
        <div>
       <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" >
       <Link to="/mine/login"><Menu.Item index="1">登录</Menu.Item></Link>
       <Link to="/mine/register"> <Menu.Item index="2">注册</Menu.Item></Link>
       <Link to="/components/TodoList"> <Menu.Item index="3">任务清单</Menu.Item></Link>
      </Menu>
      <Route path = "/mine/login" component = { Login }></Route>
      <Route path = "/mine/register" component = { Register }></Route>
      <Route path = "/components/TodoList" component = { TodoList }></Route>
      </div>
      </Router>
    
                  

      <Footer/>
    </div>
  )
}

export default App


