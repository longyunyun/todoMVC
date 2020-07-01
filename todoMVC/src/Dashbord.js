import React, { Component } from 'react'
import { Button } from 'element-react'
import 'element-theme-default'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout,online} from './Auth.redux'
import TodoList from './containers/TodoList'
import storage from './model/storage'
import './App.css'
@connect(
    state => state.auth,
    { login, logout,online }
)

class Dashbord extends Component {
 
    componentWillMount () {
        
        //有token即为已登录
        var token = storage.get('token')
        if (token) {
            this.props.login()
        }
    }
    render () {
       
        const redirectToLogin = <Redirect to='/Login'></Redirect>
        const app = (
            <div className="App">
                <Switch>
                    <Route path='/Dashbord/' component={TodoList}></Route>
                </Switch>
                <div style={{ margin: 20 }}></div>


                {this.props.isAuth ? <Button onClick={this.props.logout}>注销</Button> : null}
                {this.props.isOffline ? <Button onClick={this.props.online}>退出离线访问</Button> : null}
            </div>
        )
        return (this.props.isAuth||this.props.isOffline ) ? app : redirectToLogin
    }
}
export default Dashbord