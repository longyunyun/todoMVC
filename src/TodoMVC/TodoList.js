import React, { Component } from 'react'
import '../App.css'
import ListItem from './ListItem'
import { Button, Card, Message, Layout } from 'element-react'
import 'element-theme-default'

class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      list: [
        {
          name: '任务1', status: 0

        }
      ],
      inputVal: '',
    
    }
  }
  addTask () {
    if (!this.state.inputVal) return
    this.setState({
      list: [...this.state.list, {
        name: this.state.inputVal,
        status: 0
      }],
      inputVal: ''
    })
  }
  handleChange (e) {
    this.setState({
      inputVal: e.target.value
    })
  }
  deleteItem (name) {
    const data = this.state.list.filter(element => element.name !== name)
    this.setState({
      list: data
    })
  }
  completeTask (name) {
    const TodoList = []
    this.state.list.forEach((element, index) => {
      if (element.name === name) {
        const item = this.state.list[index]
        TodoList.push(Object.assign({}, item, { status: item.status === 0 ? 1 : 0 }))
        this.setState({
          list: TodoList
        })
      } else {
        TodoList.push(element)
      }
    })
  }
  render () {
    return (
      <div className="reactTodoList">
        <header className="header">todos</header>
        <Layout.Row gutter="20">
          <Layout.Col span="8" offset="8"> 
           <Card className="box-card"
            header={
              <div className="clearfix">

                <span style={{ "lineHeight": "36px" }}>

                  <input type="text" value={this.state.inputVal} onChange={this.handleChange.bind(this)}
                    placeholder="在此添加任务"></input>
                  <span style={{ "float": "right" }}>
                  <Button type="text" icon="plus" onClick={this.addTask.bind(this)}/>
                    {/* <Button type="primary" icon="plus" className="addTodo" onClick={this.addTask.bind(this)}/> */}
                
       
                  </span>
                </span>

              </div>
            }
          >
            <div className="text item">
              <ListItem data={this.state.list} deleteItem={this.deleteItem.bind(this)}
                completeTask={this.completeTask.bind(this)} />
            </div>
    
            <div className="demonstration">
              <p style={{"font":"12px  Extra ,Extra ,Small"}}>共{this.state.list.length}个任务</p>
              </div>
          </Card>
  
          </Layout.Col>
        </Layout.Row>
        {/* 
        <input type="text" value={this.state.inputVal} onChange={this.handleChange.bind(this)} placeholder="What needs to be done"></input>
        <Button className="addTodo" onClick={this.addTask.bind(this)}>确认</Button>

        <ListItem data={this.state.list} deleteItem={this.deleteItem.bind(this)}
          completeTask={this.completeTask.bind(this)} /> */}
      </div>
    )
  }
}
export default TodoList