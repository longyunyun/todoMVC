import React, { Component } from 'react'
import '../App.css'
import { Button, Checkbox } from 'element-react'
import 'element-theme-default'

class ListItem extends Component {
  deleteTask (todoname, _id) {
    this.props.deleteItem(todoname, _id)
  }
  completeTask (todoname, _id) {
    this.props.completeTask(todoname, _id)
  }
  render () {
    return (
      <ul>
        {
          this.props.data.map(element => {
            return (
              <li className="listItem" key={element.todoname}>
                <span style={{ "width": "100%", "textAlign": "left" }}>
                  <Checkbox checked={element.status === false}
                    onChange={this.completeTask.bind(this, element.todoname, element._id)}>
                    <span style={{
                      margin: 20,
                      textDecorationLine: element.status === true ? 'none' : 'line-through',
                      color: element.status === true ? '#1F2D3D' : '#E5E9F2'
                    }}> {element.todoname}
                    </span>
                  </Checkbox>
                </span>
                <span style={{ "textAlign": "right" }}>
                  <Button type="text" icon="delete"
                    onClick={this.deleteTask.bind(this, element.todoname, element._id)} />
                </span>
              </li>)
          })
        }
      </ul>
    )
  }
}

export default ListItem