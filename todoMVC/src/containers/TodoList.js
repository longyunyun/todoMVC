import React, { Component } from 'react'
import '../App.css'
import ListItem from '../components/ListItem'
import storage from '../model/storage'
import { Button, Card, Checkbox, Layout, Tabs } from 'element-react'
import 'element-theme-default'
import { httpPost } from '../components/Fetch'
import {  deleteService, completeService } from '../service/todoServices'
import '../config'
//任务状态 未完成 true ;已完成false
class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      name: 'tempList',
      checkAll: false,
      isIndeterminate: true,
      notCompleteCount: 0,
      list: [
        {
          todoname: '任务1', status: true
        }
      ],
      inputVal: '',
    }
  }
  //新建任务
  addTask () {
    if (!this.state.inputVal) return
    httpPost(global.targetUrl+'todos/create', {
      todoname: this.state.inputVal,
      status: true
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
      if (data.code === 200) {
        this.componentDidMount()
      }
    }).catch(function (error) {
      console.log(error)
    })
    this.setState({
      list: [...this.state.list, {
        todoname: this.state.inputVal,
        status: true
      }],
      inputVal: ''
    })
    // 缓存数据
    storage.set('todolist', [...this.state.list, {
      todoname: this.state.inputVal,
      status: true
    }])

  }

  handleChange (e) {
    this.setState({
      inputVal: e.target.value
    })
  }

  deleteItem (todoname, _id) {
    //服务器删除任务
    deleteService(_id)
    const data = []
    var temp = this.state.notCompleteCount
    this.state.list.forEach((element) => {
      if (element.todoname !== todoname) {
        data.push(element)
      } else {
        if (element.status === false) { temp-- }
      }
    })
    this.setState({
      list: data,
      notCompleteCount: temp
    })
    // 缓存数据
    storage.set('todolist', data)
    storage.set('notCompleteCount', temp)
  }

  deleteCompleteItem () {
    const data = this.state.list.filter(element => element.status === true)
    this.setState({
      list: data,
      notCompleteCount: 0
    })
    // 缓存数据
    storage.set('todolist', data)
    storage.set('notCompleteCount', 0)

    httpPost(global.targetUrl+'todos/delteCompleted').then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
      if (data.code === 200) {
        this.componentDidMount()
      }
    }).catch(function (error) {
      console.log(error)
    })
  }

  completeTask (todoname, _id) {
    //服务
    completeService(_id)
    const TodoList = []
    var temp = this.state.notCompleteCount
    this.state.list.forEach((element, index) => {
      if (element.todoname === todoname) {
        const item = this.state.list[index]
        TodoList.push(Object.assign({}, item, { status: item.status === true ? false : true }))
        if (element.status === false) {
          temp--
        }
        else {
          temp++
        }
        this.setState({
          list: TodoList,
          notCompleteCount: temp
        })
      } else {
        TodoList.push(element)
      }
    })
    // 缓存数据
    storage.set('todolist', TodoList)
    storage.set('notCompleteCount', temp)
  }

  handleCheckAllChange (checked) {
    const TodoList = []
    this.state.list.forEach((element, index) => {
      if(element.status===checked){
        completeService(element._id)
      }
      if (element.todoname !== "") {
        const item = this.state.list[index]
        TodoList.push(Object.assign({}, item, { status: checked === true ? false : true }))
        this.setState({
          list: TodoList,
          isIndeterminate: false,
          checkAll: checked,
          notCompleteCount: checked === true ? TodoList.length : 0,
        })
      } else {
        TodoList.push(element)
      }
    })
    // 缓存数据
    storage.set('todolist', TodoList)
    storage.set('notCompleteCount', checked === true ? TodoList.length : 0)
  }

  //生命周期函数  页面加载就会触发
  componentDidMount () {
    //获取缓存的数据
    var todolist = storage.get('todolist')
    var notCompleteCount = storage.get('notCompleteCount')
    if (todolist) {
      //拿到缓存的数据 自动刷新
      this.setState({
        list: todolist,
        notCompleteCount: notCompleteCount
      })
    }
    //获取服务器数据
    httpPost(global.targetUrl+'todos/todoList')
      .then((response) => {
        return response.json()
      }).then((data) => {

        var temp = 0
        data.forEach((element) => {
          if (element.status === false) {
            temp++
          }
        })
        this.setState({
          list: data,
          notCompleteCount: temp
        })
      }).catch(function (error) {
        storage.remove("token")
        console.log(error)
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
                    <Checkbox
                      checked={this.state.checkAll}
                      indeterminate={this.state.isIndeterminate}
                      onChange={this.handleCheckAllChange.bind(this)} />
                    <input type="text"
                      value={this.state.inputVal}
                      onChange={this.handleChange.bind(this)}
                      placeholder="在此添加任务" />
                    <span style={{ "textAlign": "right" }}>
                      <Button type="text" icon="plus" onClick={this.addTask.bind(this)} />
                    </span>
                  </span>
                </div>
              }
            >
              {
                this.state.list.length > 0 &&
                <div className="text item">
                  <Tabs activeName="1">
                    <Tabs.Pane label={<span>全部任务（{this.state.list.length}）</span>} name="1">
                      <ListItem data={this.state.list} deleteItem={this.deleteItem.bind(this)}
                        completeTask={this.completeTask.bind(this)} />
                    </Tabs.Pane>
                    <Tabs.Pane label={<span>已完成（{this.state.notCompleteCount}）</span>} name="2">
                      <ListItem data={this.state.list.filter(element => element.status === false)}
                        deleteItem={this.deleteItem.bind(this)}
                        completeTask={this.completeTask.bind(this)} />
                    </Tabs.Pane>
                    <Tabs.Pane label={<span>待完成（{this.state.list.length - this.state.notCompleteCount}）</span>} name="3">
                      <ListItem data={this.state.list.filter(element => element.status === true)}
                        deleteItem={this.deleteItem.bind(this)}
                        completeTask={this.completeTask.bind(this)} />
                    </Tabs.Pane>
                  </Tabs>
                  <span style={{ "float": "right" }}>
                    {
                      this.state.list.filter(element => element.status === false).length > 0 &&
                      <Button type="text" icon="delete" onClick={this.deleteCompleteItem.bind(this)} >删除已完成项目</Button>
                    }
                  </span>
                </div>
              }
            </Card>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}
export default TodoList