import React, { Component } from 'react';
import {Tasks} from '../api/tasks';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked(){
    //update to set checked property to opposite of current value
    Tasks.update(this.props.task._id, 
      { $set:{ checked: !this.props.task.checked }}
    );
  }

  deleteThisTask(){
    Tasks.remove(this.props.task._id);
  }

 render() {
 // give task checked classname if checked of
  const taskClassName = this.props.task.checked ? 'checked':'';
  
  return (
    <li className={taskClassName}>
      <button className="delete" onClick={this.deleteThisTask.bind(this)}>
        &times;	
      </button>

      <input type="checkbox"
        readOnly
        checked={!!this.props.task.checked}
        onClick={this.toggleChecked.bind(this)}
      />
    
      <span className="text"> {this.props.task.text} </span>
     </li>
   );
 }
}
