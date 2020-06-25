import React, { Component } from 'react'
import '../App.css'
import ListItem from './ListItem'
import { Button, Card, Checkbox, Layout } from 'element-react'
import 'element-theme-default'

class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      checkAll: false,
      isIndeterminate: true,
      notCompleteCount: 0,
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
    const data = []
    var temp = this.state.notCompleteCount
    this.state.list.forEach((element) => {
      if (element.name !== name) {
        data.push(element)
      } else {
        if (element.status === 1) { temp-- }
      }
    })
    // const data = this.state.list.filter(element => element.name !== name)
    this.setState({
      list: data,
      notCompleteCount: temp
    })
  }
  completeTask (name) {
    const TodoList = []
    var temp = this.state.notCompleteCount
    this.state.list.forEach((element, index) => {
      if (element.name === name) {
        const item = this.state.list[index]
        TodoList.push(Object.assign({}, item, { status: item.status === 0 ? 1 : 0 }))
        if (element.status === 1) {
          temp--
        }
        else {
          temp++
        }
        this.setState({
          list: TodoList,
          // notCompleteCount: this.state.notCompleteCount
          notCompleteCount: temp
        })
      } else {
        TodoList.push(element)
      }
    })
  }
  handleCheckAllChange (checked) {
    const TodoList = []
    this.state.list.forEach((element, index) => {
      if (element.name !== "") {
        const item = this.state.list[index]
        TodoList.push(Object.assign({}, item, { status: checked === true ? 1 : 0 }))
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
  }

  handleCheckedCitiesChange (value) {
    const checkedCount = value.length
    const citiesLength = this.state.cities.length
    this.setState({
      checkedCities: value,
      checkAll: checkedCount === citiesLength,
      isIndeterminate: checkedCount > 0 && checkedCount < citiesLength,
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
                    <input type="text" value={this.state.inputVal} onChange={this.handleChange.bind(this)}
                      placeholder="在此添加任务"></input>
                    <span style={{ "float": "right" }}>
                      <Button type="text" icon="plus" onClick={this.addTask.bind(this)} />
                    </span>
                  </span>
                </div>
              }
            >
              <div style={{ margin: '15px 0' }}></div>
              <div className="text item">
                <ListItem data={this.state.list} deleteItem={this.deleteItem.bind(this)}
                  completeTask={this.completeTask.bind(this)} />
              </div>
              <div >
                <p style={{ "font": "12px  Extra ,Extra ,Small" }}>共{this.state.list.length}个任务,已完成{this.state.notCompleteCount}个,
                {this.state.list.length - this.state.notCompleteCount}个待完成</p>
              </div>
            </Card>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}
export default TodoList