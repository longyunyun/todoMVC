import React, { Component } from 'react'
import { Button } from 'element-react'
import 'element-theme-default'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout } from './Auth.redux'
import TodoList from './containers/TodoList'
import storage from './model/storage'
import './App.css'
@connect(
    state => state.auth,
    { login, logout }
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
            </div>
        )
        return this.props.isAuth ? app : redirectToLogin
    }
}
export default Dashbord