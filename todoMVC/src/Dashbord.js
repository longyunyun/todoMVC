import React, { Component } from 'react';
import { Button } from 'element-react'
import 'element-theme-default'
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
          <div className="App">
        
              <Switch>
                  {/* <Route path='/Dashbord/'  component={App}></Route> */}
                  <Route path='/Dashbord/'  component={TodoList}></Route>

                  {/* <Route path='/Dashbord/erying' component={Erying}></Route>
                  <Route path='/Dashbord/qibinglian' component={Qibinglian}></Route> */}
                      {/* <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/TodoList" component={TodoList}></Route> */}
       
              </Switch> 
              <div style={{ margin: 20 }}></div>
              {this.props.isAuth?<Button onClick={this.props.logout}>注销</Button> : null}
     
          </div>
        )


        return this.props.isAuth ? app : redirectToLogin
    }
}
export default Dashbord