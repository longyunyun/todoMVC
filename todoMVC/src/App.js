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




// import React, { Component } from 'react'
// // 连接使用
// import { connect } from 'react-redux'
// import { addgun, removegun, addgunAsync } from './redux'
// class App extends Component {
//   state = {users: []}
 
// componentDidMount() {
//   fetch('/userList')
//     .then(res => res.json())
//     .then(users => this.setState({ users }));
// }

//   render () {
//     return (
//       <div>
//         <h1>
//           hello
//      <br />
//           {this.props.num}
//         </h1>
//         <button onClick={this.props.addgun}>加一</button>
//         <button onClick={this.props.removegun}>减一</button>
//         <button onClick={this.props.addgunAsync}>异步添加</button>
//         <h1>Users</h1>
//       {this.state.users.map(user =>
//         <div key={user.id}>{user.username}</div>
//       )}
 
//       </div>
//     )
//   }
// }

// const mapStatetoProps = (state) => {
//   return { num: state }
// }
// const actionCreators = { addgun, removegun, addgunAsync }
// // 装饰器的使用 connect  链接过后可以用  this.props 获取
// App = connect(mapStatetoProps, actionCreators)(App)
// export default App

import store from './store';
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { setCurrentUser } from './actions/authAchtions';

if(localStorage.jwToken){
  console.log(11)
  setAuthToken(localStorage.jwToken)
  // 解析token
  const decoded =jwt_decode(localStorage.jwToken)
  store.dispatch(setCurrentUser(decoded))
     // 检测token过期
  // 获取当前时间
  const currentTime= Date.now() / 1000;//由毫秒转成秒
  console.log(decoded)
  console.log(currentTime)
  // // 判断当前时间是否大于token中的exp时间;如果大于是为过期
  // if(decoded.exp < currentTime){
  //   // 过期
  //   store.dispatch(logoutUser())
    
  //   // 退出后再跳转页面
  //   window.location.href = "/login";
  // }
}