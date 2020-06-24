import React, { Component } from 'react'
import '../App.css'

class ListItem extends Component {
  deleteTask(name) {
    this.props.deleteItem(name)
  }
  completeTask(name) {
    this.props.completeTask(name)
  }
  render() {
    return (
      <ul>
        {
          this.props.data.map(element => {
            return (
              <li className="listItem" key={element.name}>
                <input type="checkbox"
                  checked={element.status === 1}
                  onChange={this.completeTask.bind(this, element.name)}/>
                <span style={{textDecorationLine: element.status === 0 ? 'none' : 'line-through'}}>{element.name}</span>
                <button className="delete" onClick={this.deleteTask.bind(this, element.name)}>删除</button>
              </li>)
        })
      }
      </ul>
    )
  }
}

export default ListItem