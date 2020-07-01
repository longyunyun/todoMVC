import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Card, Button, Layout, Form } from 'element-react'
import 'element-theme-default'
import { httpPost } from '../components/Fetch'
import MD5 from 'crypto-js/md5'
import { login, offline } from '../Auth.redux.js'
import { Redirect } from 'react-router-dom'
import storage from '../model/storage'
import '../config'
@connect(
    state => state.auth,
    { login, offline }
)

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            labelPosition: 'right',
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {
                        required: true, message: '请设置登录名',
                        trigger: 'blur'
                    }, {
                        min: 6, message: '登录名长度不少于6',
                        trigger: 'blur'
                    },
                ],
                password: [
                    {
                        required: true, message: '请输入密码',
                        trigger: 'blur'
                    }, {
                        min: 6, message: '密码长度不少于6',
                        trigger: 'blur'
                    },

                ]
            }
        }
    }

    onPositionChange (value) {
        this.setState({ labelPosition: value })
    }

    onChange (key, value) {
        this.setState({
            form: Object.assign(this.state.form, { [key]: value })
        })
    }

    handleUsername (event) {
        this.setState({ username: event.target.value })
    }

    handlePwd (event) {
        this.setState({ password: event.target.value })
    }

    handleSubmit (e) {
        e.preventDefault()
        this.refs.form.validate((valid) => {
            if (valid) {
                httpPost(global.targetUrl + 'users/login', {
                    username: this.state.form.username,
                    password: MD5(this.state.form.password)
                }).then((response) => {
                    return response.json()
                }).then((data) => {
                    console.log(data)
                    if (data.code === 200) {

                        storage.set('token', data.token)
                        this.props.login()
                        // this.props.history.push('/TodoList')
                    }
                    else {
                        alert("账户名或密码错误")
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            } else {
                console.log('error submit!!')
                return false
            }
        })

    }

    render () {
        return (
            <div >
                {(this.props.isAuth || this.props.isOffline) ? <Redirect to='/Dashbord' /> : <header className="header">Login</header>}
                <Layout.Row gutter="20">
                    <Layout.Col span="8" offset="8">

                        <Card>
                            <div style={{ margin: 20 }}></div>
                            <Form labelPosition='top' ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-form-stacked">
                                <Form.Item label="登录名" prop="username">
                                    <Input value={this.state.form.username} onChange={this.onChange.bind(this, 'username')}></Input>
                                </Form.Item>
                                <Form.Item label="密码" prop="password">
                                    <Input type="password" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} autoComplete="off" />
                                </Form.Item>
                                <Form.Item style={{ textAlign: "center" }}>
                                    <Button onClick={this.handleSubmit.bind(this)}>登录</Button>
                                    <Button plain={true} type="warning" onClick={this.props.offline}>离线访问</Button>
                                </Form.Item>
                            </Form>

                        </Card>
                    </Layout.Col>
                </Layout.Row>
                <div style={{ margin: 20 }}></div>
            </div>
        )
    }
}

export default Login
