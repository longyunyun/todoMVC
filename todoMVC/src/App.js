// import React from 'react'
// import './App.css'
// import Footer from './footer'
// import { Menu } from 'element-react'
// import 'element-theme-default'
// import { HashRouter as Router, Link, Route } from 'react-router-dom';
// import Login from './containers/login/login';
// import Register from './containers/register/register';
// import TodoList from './components/TodoList';

// function App () {

//   return (
//     <div className="App">

//       <Footer/>
//     </div>
//   )
// }

// export default App




import React, { Component } from 'react'
// 连接使用
import { connect } from 'react-redux'
import { addgun, removegun, addgunAsync } from './redux'
class App extends Component {
  state = {users: []}
 
componentDidMount() {
  fetch('/userList')
    .then(res => res.json())
    .then(users => this.setState({ users }));
}

  render () {
    return (
      <div>
        <h1>
          hello
     <br />
          {this.props.num}
        </h1>
        <button onClick={this.props.addgun}>加一</button>
        <button onClick={this.props.removegun}>减一</button>
        <button onClick={this.props.addgunAsync}>异步添加</button>
        <h1>Users</h1>
      {this.state.users.map(user =>
        <div key={user.id}>{user.username}</div>
      )}
 
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return { num: state }
}
const actionCreators = { addgun, removegun, addgunAsync }
// 装饰器的使用 connect  链接过后可以用  this.props 获取
App = connect(mapStatetoProps, actionCreators)(App)
export default App

