import React, { Component } from 'react'
import { Input, Card, Button, Layout, Form } from 'element-react'
import 'element-theme-default'
import { httpPost } from '../components/Fetch'
import MD5 from 'crypto-js/md5'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            labelPosition: 'right',
            form: {
                username: '',
                password: ''
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
    handleUsername (event) { this.setState({ username: event.target.value }) }
    handlePwd (event) { this.setState({ password: event.target.value }) }

    handleSubmit (e) {
        e.preventDefault()
        httpPost('http://localhost:3001/login', {
            username: this.state.form.username,
            password: MD5(this.state.form.password)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data)
            if (data.code === 200) {
                this.props.history.push('/TodoList')
            }
            else {
                alert(data.message)
            }
        }).catch(function (error) {
            console.log(error)
        })
    }
    render () {
        return (
            <div className="App">
                <header className="header">Login</header>
                <Layout.Row gutter="20">
                    <Layout.Col span="8" offset="8">
                        <Card>
                            <div style={{ margin: 20 }}></div>
                            <Form labelPosition='left' labelWidth="100" model={this.state.form} className="demo-form-stacked">
                                <Form.Item label="登录名">
                                    <Input value={this.state.form.username} onChange={this.onChange.bind(this, 'username')}></Input>
                                </Form.Item>
                                <Form.Item label="密码">
                                    <Input type="password" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')}></Input>
                                </Form.Item>
                            </Form>
                            <Button onClick={this.handleSubmit.bind(this)}>登录</Button>
                        </Card>
                    </Layout.Col>
                </Layout.Row>
                <div style={{ margin: 20 }}></div>
            </div>
        )
    }
}

export default Login
