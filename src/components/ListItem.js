import React, { Component } from 'react'
import '../App.css'
import { Button,  Checkbox } from 'element-react'
import 'element-theme-default'

class ListItem extends Component {
  deleteTask (name) {
    this.props.deleteItem(name)
  }
  completeTask (name) {
    this.props.completeTask(name)
  }
  render () {
    return (
      <ul>
        {
          this.props.data.map(element => {
            return (
              <li className="listItem" key={element.name}>
                <span style={{ "width": "100%", "text-align": "left"}}>
                <Checkbox checked={element.status === 1}
                  onChange={this.completeTask.bind(this, element.name)}> 
                   <span style={{  margin: 20,textDecorationLine: element.status === 0 ? 'none' : 'line-through' ,color:element.status === 0 ? '#1F2D3D' : '#E5E9F2' }}>{element.name}</span>
                </Checkbox>
                </span>
                <span style={{ "text-align": "right" }}>
                <Button type="text"  icon="delete" onClick={this.deleteTask.bind(this, element.name)}/>
                </span> 
              </li>)
          })
        }
      </ul>
    )
  }
}

export default ListItem