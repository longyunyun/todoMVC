
import React, { Component } from 'react'
import { Input, Card, Button, Layout, Form } from 'element-react'
import 'element-theme-default'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            form: {
                username: '',
                password: '',
                checkPass: ''
            },
            rules: {
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入密码'))
                            } else {
                                if (this.state.form.checkPass !== '') {
                                    this.refs.form.validateField('checkPass')
                                }
                                callback()
                            }
                        }
                    }
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'))
                            } else if (value !== this.state.form.password) {
                                callback(new Error('两次输入密码不一致!'))
                            } else {
                                callback()
                            }
                        }
                    }
                ],
                username: [
                    { required: true, message: '请设置登录名', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            var age = parseInt(value, 10)

                            setTimeout(() => {
                                if (!Number.isInteger(age)) {
                                    callback(new Error('请输入数字值'))
                                } else {
                                    if (age < 18) {
                                        callback(new Error('必须年满18岁'))
                                    } else {
                                        callback()
                                    }
                                }
                            }, 1000)
                        }, trigger: 'change'
                    }
                ]
            }
        }
    }

    handleSubmit (e) {
        e.preventDefault()

        this.refs.form.validate((valid) => {
            if (valid) {
                alert('submit!')
            } else {
                console.log('error submit!!')
                return false
            }
        })
    }

    handleReset (e) {
        e.preventDefault()

        this.refs.form.resetFields()
    }

    onChange (key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        })
    }

    //本地存储一个账户的模拟登录注册写法
    //逻辑：通过判断本地存储，来确定用户是否登录过，点击登陆时进行判断

    LoginClick = () => {

        const username = this.users.value
        const password = this.password.value
        let ls_users = localStorage.getItem('users')
        if (ls_users) {
            //如果ls_users存在证明已有用户注册,判断密码，用户名是否正确
            ls_users = JSON.parse(ls_users)

            if (ls_users.username === username && ls_users.password === password) {
                alert('登录成功')
                this.props.history.push('/home')
            } else {
                alert('用户名或登录密码输入错误')
            }

        } else {
            //没有用户注册，直接保存到本地存储
            localStorage.setItem('users', JSON.stringify({ username, password }))
            this.props.history.push('/home')
        }
    }

    render () {
        return (
            <div className="App">
                <header className="header">Register</header>
                <Layout.Row gutter="20">
                    <Layout.Col span="8" offset="8">
                        <Card>
                            <div style={{ margin: 20 }}></div>
                            <Form labelPosition='left' ref="form" model={this.state.form} rules={this.state.rules} labelWidth="100" className="demo-ruleForm">
                                <Form.Item label="登录名" prop="username">
                                    <Input value={this.state.form.username} onChange={this.onChange.bind(this, 'username')}></Input>
                                </Form.Item>
                                <Form.Item label="密码" prop="password">
                                    <Input type="password" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} autoComplete="off" />
                                </Form.Item>
                                <Form.Item label="确认密码" prop="checkPass">
                                    <Input type="password" value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} autoComplete="off" />
                                </Form.Item>
                            </Form>
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>注册</Button>
                            <Button onClick={this.handleReset.bind(this)}>重置</Button>

                        </Card>
                    </Layout.Col></Layout.Row><div style={{ margin: 20 }}>

                </div>
                <div><p>
                用户名：</p><input type="text" ref= {el=>this.users=el} /><br/>
                密码：<input type= "password"  ref= {el=>this.password=el} /><br/>
                验证码：<input type="text"/><br/>
                <button onClick= {this.LoginClick} > 登录</button>
             </div>
            </div>
           
               
        )
    }
}

export default Register

