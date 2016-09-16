import React, {PropTypes} from "react";
import Task from "./Task";

const TaskListProptypes = {
	tasks  : PropTypes.array,
	listId : PropTypes.number.isRequired,
	cardId : PropTypes.number.isRequired,
	onSaveEdit   : PropTypes.func.isRequired,
	onDeleteTask : PropTypes.func.isRequired,
	onEditTask   : PropTypes.func.isRequired,
	activeTask   : PropTypes.string,
	shouldShowEditor : PropTypes.bool.isRequired,
	attributeToEdit  : PropTypes.string.isRequired,
	curTaskEditing   : PropTypes.string,
	onToggleDoneTask    : PropTypes.func.isRequired,
	currentEditorValue  : PropTypes.string.isRequired,
	onChangeEditorValue : PropTypes.func.isRequired
}

const TaskList = props =>(
	<div className="check-list-container">
		<ul className="check-list">
			{
				props.tasks.map(task =>
					<Task
						id     = {task.id}
						key    = {task.id}
						name   = {task.name}
						status = {task.done}
						listId = {props.listId}
						cardId = {props.cardId}
						onEditTask   = {props.onEditTask}
						onSaveEdit   = {props.onSaveEdit}
						onDeleteTask = {props.onDeleteTask}
						curTaskEditing   = {props.curTaskEditing}
						attributeToEdit  = {props.attributeToEdit}
						onToggleDoneTask = {props.onToggleDoneTask}
						currentEditorValue  = {props.currentEditorValue}
						onChangeEditorValue = {props.onChangeEditorValue}
						shouldShowEditor    = {props.shouldShowEditor}
					/>
				)
			}
		</ul>
	</div>
);

TaskList.propTypes = TaskListProptypes;

export default TaskList;
