import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

//app component
class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            hideCompleted:false,
        };
    }

    handleSubmit(event){
        event.preventDefault();
        //find text field using react ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        // insert collection
        Tasks.insert({ 
            text, 
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
        
        //clear form text
        ReactDOM.findDOMNode(this.refs.textInput).value='';
    }

    //event handler to update hideCompleted stated asynchronously
    toggleHideCompleted(){
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    renderTasks(){
        
        let filteredTasks = this.props.tasks;
        //filter out completed tasks if hide completed is checked
        if(this.state.hideCompleted){
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }

        return filteredTasks.map((task) => (
        <Task key={task._id} task={task} />
        ));
    }

    render(){
        return (
            <div className="container">
                <header>
                    <h1>Todo List ({this.props.incompleteCount})</h1>
                    <label className="hide-completed">                 
                        <input type="checkbox"
                            readOnly
                            checked = {this.state.hideCompleted}
                            onClick = {this.toggleHideCompleted.bind(this)}
                        /> 
                        Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper /> 

                    { this.props.currentUser ?
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                        <input type="text" ref="textInput" placeholder="Add new tasks"/>

                    </form> :'' }  


                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}


//data container
export default withTracker(() => {
    return {
        tasks: Tasks.find({},{ sort: {createdAt:-1} }).fetch(),
        incompleteCount: Tasks.find({ checked: {$ne:true} }).count(),
        currentUser: Meteor.user(),
    };
})(App);