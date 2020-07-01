import React, { Component } from 'react'
import { DatePicker, Button, Card, Layout } from 'element-react'
import 'element-theme-default'
import { httpPost } from '../components/Fetch'
import '../config'
import '../App.css'

class Statistic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usercount: 0,
      averageopentime: 0,
      mydate: null
    }
  }

  handleSubmit (e) {
    e.preventDefault()

    //获取服务器数据
    httpPost(global.targetUrl, {
      date: this.state.mydate
    })
      .then((response) => {
        return response.json()
      }).then((data) => {
        this.setState({
          usercount: data.usercount,
          averageopentime: data.meanofOpenTime,
        })
      }).catch(function (error) {
        console.log(error)
      })

  }

  render () {
    const { mydate } = this.state
    return (

      <div className='App'>
        <header className="header">Statistic</header>
        <Layout.Row gutter="20">
          <Layout.Col span="8" offset="8">
            <Card className="box-card">

              <DatePicker
                value={mydate}
                placeholder="选择日期"
                onChange={date => {
                  console.debug('DatePicker1 changed: ', date)
                  this.setState({ mydate: date })
                }}

              />
              <Button onClick={this.handleSubmit.bind(this)}>查询</Button>
              <div style={{ margin: 20 }}></div>
              <div>
                活动用户数量：{this.state.usercount}</div>
              <div>
                平均页面加载时间：{this.state.averageopentime}</div>
            </Card>
          </Layout.Col>
        </Layout.Row>
        <div style={{ margin: 20 }}></div>
      </div>
    )
  }
}
export default Statistic