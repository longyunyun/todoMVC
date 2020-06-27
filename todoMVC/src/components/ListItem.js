import React, { Component } from 'react'
import '../App.css'
import { Button,  Checkbox } from 'element-react'
import 'element-theme-default'

class ListItem extends Component {
  deleteTask (todoname) {
    this.props.deleteItem(todoname)
  }
  completeTask (todoname) {
    this.props.completeTask(todoname)
  }
  render () {
    return (
      <ul>
        {
          this.props.data.map(element => {
            return (
              <li className="listItem" key={element.todoname}>
                <span style={{ "width": "100%", "textAlign": "left"}}>
                <Checkbox checked={element.status === false}
                  onChange={this.completeTask.bind(this, element.todoname)}> 
                   <span style={{  margin: 20,textDecorationLine: element.status === true ? 'none' : 'line-through' ,color:element.status === true ? '#1F2D3D' : '#E5E9F2' }}>{element.todoname}</span>
                </Checkbox>
                </span>
                <span style={{ "textAlign": "right" }}>
                <Button type="text"  icon="delete" onClick={this.deleteTask.bind(this, element.todoname)}/>
                </span> 
              </li>)
          })
        }
      </ul>
    )
  }
}

export default ListItem