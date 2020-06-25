import React from 'react'
// import logo from './logo.svg'
import './App.css'
import TodoList from './components/TodoList'
import Footer from './footer'
import { Menu } from 'element-react'
import 'element-theme-default'

function App () {

  return (
    <div className="App">
       <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" >
       {/* <Menu defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}> */}
        <Menu.Item index="1">登录</Menu.Item>
  
        <Menu.Item index="2">注册</Menu.Item>
      </Menu>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}

<TodoList />
        {/* <Button type='primary'>button</Button> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    
      <Footer/>
    </div>
  )
  // onSelect() {

  // }
}

export default App


