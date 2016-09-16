import React, {PropTypes} from "react";
import TaskList from "./TaskList";
import CardMenu from "./CardMenu";
import Editor from "./Editor";
import {DragSource} from "react-dnd";
import Types from "../staticTypes";

const dragSourceSpec = {
	beginDrag (props) {
		console.log("Hey, you dragded me: ", props.title);
		return {id : props.id}
	},
	endDrag (props, monitor) {
		if (!monitor.didDrop) {console.log("ugggh! you didn't dropped!"); return }
		console.log("you dropped me in", monitor.getDropResult().placeDropped);
	}
}

const dragSourceCollect = function dragSourceCollect (connect, monitor) {monitor;
	return {
		isDragging : monitor.isDragging,
		connectDragSource : connect.dragSource(),
		connectDragPreview : connect.dragPreview()
	}
}

const CardPropTypes = {
	tasks             : PropTypes.array,
	shouldShowDetails : PropTypes.bool.isRequired,
	shouldShowEditor  : PropTypes.bool.isRequired,
	shouldShowMenu 	  : PropTypes.bool.isRequired,
	attributeToEdit   : PropTypes.string.isRequired,
	onToggleShowMenu  : PropTypes.func.isRequired,
	curTaskEditing    : PropTypes.string,
	onDeleteTask      : PropTypes.func.isRequired,
	onEditTitle 			: PropTypes.func.isRequired,
	onEditTask  			: PropTypes.func.isRequired,
	onSaveEdit 				: PropTypes.func.isRequired,
	id 								: PropTypes.number.isRequired,
	menuPosition      : PropTypes.object.isRequired,
	title             : PropTypes.string.isRequired,
	listId            : PropTypes.number,
	description       : PropTypes.string,
	onAddATask 				: PropTypes.func.isRequired,
	onEditDescription : PropTypes.func,
	onToggleDoneTask    : PropTypes.func.isRequired,
	onToggleShowDetails : PropTypes.func.isRequired,
	currentEditorValue  : PropTypes.string.isRequired,
	onChangeEditorValue : PropTypes.func.isRequired,
	onDeleteCard      : PropTypes.func.isRequired,
},

Card = props => props.connectDragSource(
  <div className="card">
		<div className="menu-icon action" >
			<i className="fa fa-ellipsis-v"
					aria-hidden="true"
					onClick={(e) => {
							props.onToggleShowMenu(e.target);
							e.stopPropagation();
						}
					}>
			</i>
		</div>
		{
			props.shouldShowMenu === true ?
			<CardMenu
				cardId = {props.id}
				listId = {props.listId}
				hasDescription  = {!!props.description.length}
				onAddATask      = {props.onAddATask}
				onEditTitle     = {props.onEditTitle}
				menuPosition   = {props.menuPosition}
				onDeleteTask    = {props.onDeleteTask}
				onDeleteCard    = {props.onDeleteCard}
				onEditDescription = {props.onEditDescription}
			/> : undefined
		}
		<div className="card-title-container">
			{
				props.shouldShowEditor &&  props.attributeToEdit === "title" ?
				<Editor
					textareaClass = {"edit-checklist"}
					// onCancelEdit  = {props.onCloseEditor}
					onChange      = {props.onChangeEditorValue}
					value         = {props.currentEditorValue}
					onSaveEdit    = {props.onSaveEdit}
				/> :

				<div className="card-title action" onClick={props.onToggleShowDetails}>
					<i className={props.shouldShowDetails?"fa fa-caret-down":"fa fa-caret-right"} aria-hidden="true"></i>
					<span className="title">{props.title}</span>
				</div>
			}
		</div>
		{
			props.shouldShowDetails === true ?
			<div className="card-details">
				<div className="description">
					{
						props.shouldShowEditor && props.attributeToEdit === "description" ?
						<Editor
							textareaClass = {"edit-checklist"}
							placeholder   = "Add a description..."
							onChange      = {props.onChangeEditorValue}
							value         = {props.currentEditorValue}
							onSaveEdit    = {props.onSaveEdit}
						/> :
						props.description === undefined || props.description === "" ?
						<div onClick={props.onEditDescription} className="add-description-prompt action">Add a description...</div> :
						<div onClick={props.onEditDescription} className="card-description action">{props.description}</div>
					}
				</div>
				<TaskList
					cardId = {props.id}
					tasks  = {props.tasks}
					listId = {props.listId}
					onEditTask = {props.onEditTask}
					onSaveEdit = {props.onSaveEdit}
					onDeleteTask    = {props.onDeleteTask}
					curTaskEditing  = {props.curTaskEditing}
					attributeToEdit = {props.attributeToEdit}
					onToggleDoneTask 		= {props.onToggleDoneTask}
					shouldShowEditor    = {props.shouldShowEditor}
					currentEditorValue  = {props.currentEditorValue}
					onChangeEditorValue = {props.onChangeEditorValue}
				/>

				<div className={`add-task-wrapper ${props.shouldShowEditor &&  props.attributeToEdit === "addTask" ? "active" : ""}`}>
					{
						props.shouldShowEditor &&  props.attributeToEdit === "addTask" ?
						<Editor
							textareaClass = {"edit-checklist"}
							onChange      = {props.onChangeEditorValue}
							placeholder   = "Add a task..."
							value         = {props.currentEditorValue}
							onSaveEdit    = {props.onSaveEdit}
						/> :

						<div onClick={props.onAddATask}>Add a task...</div>
					}
				</div>

			</div> : undefined
		}
	</div>
);

Card.PropTypes = CardPropTypes;

const draggableCard = DragSource(Types.CARD, dragSourceSpec, dragSourceCollect)(Card);

export default draggableCard;
