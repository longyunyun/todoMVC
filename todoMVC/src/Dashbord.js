import React, { Component } from 'react';
//路由
import {Route,Link,Switch,Redirect} from 'react-router-dom'
import App from './App';
import {connect} from 'react-redux'
import {logout} from './Auth.redux'
import Login from './containers/login'
import Register from './containers/register'
import TodoList from './containers/TodoList'
import storage from './model/storage';
@connect(
     state=>state.auth,
    {logout} 
)

class Dashbord extends Component{

    render(){
        console.log(this.props)
        var token=storage.get('token');
        const redirectToLogin = <Redirect to='/Login'></Redirect>
        const match = this.props.match;
        const app = (
          <div>
                 <TodoList/>
          {this.props.isAuth?<button onClick={this.props.logout}>注销</button> : null}
     
              <ul>
              {/* <Link to="/login">登录</Link>
            <Link to="/register"> 注册</Link>
            <Link to="TodoList"> 任务清单</Link> */}
    <p>{token}</p>
              </ul>  
              <Switch>
                  <Route path='/Dashbord/'  component={App}></Route>
                  {/* <Route path='/Dashbord/erying' component={Erying}></Route>
                  <Route path='/Dashbord/qibinglian' component={Qibinglian}></Route> */}
                      <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/TodoList" component={TodoList}></Route>
       
              </Switch> 
          </div>
        )


        return this.props.isAuth ? app : redirectToLogin
    }
}
export default Dashbord