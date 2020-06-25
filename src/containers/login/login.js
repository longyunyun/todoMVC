import React, { Component } from 'react'
import { Input, Card, Button, Layout, Form } from 'element-react'
import 'element-theme-default'

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
    render () {
        return (
            <div>
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

                            <Button>登录</Button>
                        </Card>
                    </Layout.Col>
                </Layout.Row>
                <div style={{ margin: 20 }}></div>
            </div>

        )
    }
}

export default Login
