import React, {PropTypes} from "react";
import Editor from "./Editor";

const CheckListProptypes = {
	id     : PropTypes.number.isRequired,
	name   : PropTypes.string.isRequired,
	listId : PropTypes.number.isRequired,
	cardId : PropTypes.number.isRequired,
	status : PropTypes.bool.isRequired,
	onSaveEdit     : PropTypes.func.isRequired,
	onEditTask     : PropTypes.func.isRequired,
	onDeleteTask   : PropTypes.func.isRequired,
	curTaskEditing : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	onToggleDoneTask    : PropTypes.func.isRequired,
	shouldShowEditor    : PropTypes.bool.isRequired,
	currentEditorValue  : PropTypes.string.isRequired,
	onChangeEditorValue : PropTypes.func.isRequired
};

const CheckListTask = props =>{
	const shouldShowEditor = props.shouldShowEditor && props.curTaskEditing === props.id;

	return(
		<li className={`task detail ${shouldShowEditor ? "" : "action"}`}>
			<i className={`fa  fa-${props.status?"check-":""}square-o aria-hidden="true"`}
					onClick={() => {props.onToggleDoneTask(props.listId,props.cardId,props.id);}}>
			</i>
			{
				shouldShowEditor ?
				<div className="editor-wrapper">
					<Editor
						textareaClass={"edit-checklist"}
						shouldShowDelete={true}
						onChange={props.onChangeEditorValue}
						value={props.currentEditorValue}
						onSaveEdit = {props.onSaveEdit}
						onDelete = {()=> {props.onDeleteTask(props.listId, props.cardId, props.id);}}
					/>
				</div> :
				<span onClick={(e)=>props.onEditTask(e, "task", props.name, props.id)} className={`task-name ${props.status?"done":""}`}>{props.name}</span>
			}
		</li>
	);
};

CheckListTask.propTypes = CheckListProptypes;

export default CheckListTask;
