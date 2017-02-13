import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Editor from "./Editor";
import {showEditor, closeCardMenu, updateTask,
	toggleTaskDone, deleteTask} from "../actions/";

const mapStateToProps = ({domainData, appState}, {id}) => ({
	task : domainData.tasks.byId[id],
	itemToEdit : appState.itemToEdit,
	attributeToEdit : appState.attributeToEdit,
});

const mapDispatchToProps = (dispatch, {id}) => ({
	onClickTask : (e) => {
		e.stopPropagation();
		dispatch(showEditor(id, "task"));
		dispatch(closeCardMenu());
	},
	onClickSave : (newVal) => dispatch(updateTask(id, newVal)),
	onToggleTaskDone : taskId => dispatch(toggleTaskDone(taskId)),
	onClickDeleteTask : (taskId,index,cardId) =>dispatch(deleteTask(taskId,index, cardId))
});

const TaskProptypes = {
	id : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	task : PropTypes.shape({
		id   : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
		name : PropTypes.string.isRequired,
		done : PropTypes.bool.isRequired,
	}).isRequired,
	index : PropTypes.number.isRequired,
	cardId : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	onClickSave : PropTypes.func.isRequired,
	onClickTask  : PropTypes.func.isRequired,
	onClickDeleteTask   : PropTypes.func.isRequired,
	onToggleTaskDone  : PropTypes.func.isRequired,
	itemToEdit : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	attributeToEdit : PropTypes.string.isRequired,
};

const Task = props =>{
	const {task, itemToEdit, attributeToEdit} = props;
	const shouldShowEditor = itemToEdit === task.id && attributeToEdit === "task";

	return(
		<li className={`task detail ${shouldShowEditor ? "" : "action"}`}>
			<i className={`fa  fa-${task.done?"check-":""}square-o aria-hidden="true"`}
					onClick={() => {props.onToggleTaskDone(task.id);}}>
			</i>
			{
				shouldShowEditor ?
				<div className="editor-wrapper">
					<Editor
						textareaClass={"edit-checklist"}
						shouldShowDelete={true}
						initialValue={task.name}
						onClickSave = { props.onClickSave}
						onClickDelete = {() => {props.onClickDeleteTask(task.id, props.index, props.cardId);}}
					/>
				</div> :
				<span onClick={ props.onClickTask}
						className={`${task.done&&"done"} task-name`}>{task.name}</span>
			}
		</li>
	);
};

Task.propTypes = TaskProptypes;

export default connect(mapStateToProps, mapDispatchToProps)(Task);
