// ALLOW findDOMNode because of DND
/* eslint "react/no-find-dom-node": 0 */

import React, {PropTypes, Component} from "react";
import {findDOMNode} from "react-dom";
import TaskList from "./TaskList";
import CardMenu from "./CardMenu";
import Editor from "./Editor";
import {DragSource, DropTarget} from "react-dnd";
import Types from "../staticTypes";

let initialState; // initialState before beginDrag DnD

const dragSourceSpec = {
	beginDrag (props) {
		return {
			id : props.id,
			index : props.index,
			parentIndex : props.listIndex,
			setInitialState : props.setState,
			curState : props.curState
		};
	},

	isDragging(props, monitor) {
		return monitor.getItem().id === props.id;
 },

	// endDrag (props) {
	// 	// if (!monitor.didDrop()) {props.replacePlaceholderWithCurDraggingCard(props.curState); return;}
	// 	// props.replacePlaceholderWithCurDraggingCard(props.curState);
	// }
},

dragSourceCollect = function dragSourceCollect (connect, monitor) {
	return {
		isDragging : monitor.isDragging(),
		connectDragSource : connect.dragSource(),
		connectDragPreview : connect.dragPreview(),
		dragItem : monitor.getItem()
	};
};

const cardDropTargetSpec = {
  hover(props, monitor, component) {
    const item   = monitor.getItem(),
					id     = props.id,
					dragId = item.id,
					dragIndex = item.index,
					hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragId === id) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.swapCardIndex(props.listIndex, dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const cardDropTargetCollect = (connect, monitor) => ({
	isOver : monitor.isOver(),
	connectDropTarget : connect.dropTarget()
});

const CardPropTypes = {
	tasks             : PropTypes.array,
	shouldShowDetails : PropTypes.bool.isRequired,
	shouldShowEditor  : PropTypes.bool.isRequired,
	shouldShowMenu 	  : PropTypes.bool.isRequired,
	attributeToEdit   : PropTypes.string.isRequired,
	onToggleShowMenu  : PropTypes.func.isRequired,
	curTaskEditing    : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	onDeleteTask      : PropTypes.func.isRequired,
	onEditTitle 			: PropTypes.func.isRequired,
	onEditTask  			: PropTypes.func.isRequired,
	onSaveEdit 				: PropTypes.func.isRequired,
	index             : PropTypes.number.isRequired,
	listIndex         : PropTypes.number.isRequired,
	id 								: PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
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
	curState : PropTypes.object.isRequired,// we want to preserve card state while/after DnD
	isDragging : PropTypes.bool,
	connectDragSource : PropTypes.func.isRequired,
	setState : PropTypes.func.isRequired,
	connectDropTarget : PropTypes.func.isRequired,
	dragItem : PropTypes.object,
	isOver :  PropTypes.bool.isRequired,
	swapCardIndex : PropTypes.func.isRequired
};

class Card extends Component{
	componentDidMount() {
		if (initialState !== undefined) {
			this.props.setState(initialState);
			initialState = undefined;
		}
	}

	render () {
		const {isDragging, dragItem} = this.props;

		if (isDragging) {
			initialState = dragItem.curState;
		}
		return this.props.connectDragSource(
			this.props.connectDropTarget(
				<div className="card ">
					<div className="menu-icon action" >
						<i className="fa fa-ellipsis-v"
								aria-hidden="true"
								onClick={(e) => {
										this.props.onToggleShowMenu(e.target);
										e.stopPropagation();
									}
								}>
						</i>
					</div>
					{
						this.props.shouldShowMenu &&
						<CardMenu
							cardId = {this.props.id}
							listId = {this.props.listId}
							hasDescription  = {!!this.props.description.length}
							onAddATask      = {this.props.onAddATask}
							onEditTitle     = {this.props.onEditTitle}
							menuPosition    = {this.props.menuPosition}
							onDeleteTask    = {this.props.onDeleteTask}
							onDeleteCard    = {this.props.onDeleteCard}
							onEditDescription = {this.props.onEditDescription}
						/>
					}
					<div className="card-title-container">
						{
							this.props.shouldShowEditor &&  this.props.attributeToEdit === "title" ?
							<Editor
								textareaClass = {"edit-checklist"}
								onChange      = {this.props.onChangeEditorValue}
								value         = {this.props.currentEditorValue}
								onSaveEdit    = {this.props.onSaveEdit}
							/> :

							<div className="card-title action" onClick={this.props.onToggleShowDetails}>
								<i className={this.props.shouldShowDetails?"fa fa-caret-down":"fa fa-caret-right"} aria-hidden="true"></i>
								<span className="title">{this.props.title}</span>
							</div>
						}
					</div>
					{
						this.props.shouldShowDetails === true ?
						<div className="card-details">
							<div className="description">
								{
									this.props.shouldShowEditor && this.props.attributeToEdit === "description" ?
									<Editor
										textareaClass = {"edit-checklist"}
										placeholder   = "Add a description..."
										onChange      = {this.props.onChangeEditorValue}
										value         = {this.props.currentEditorValue}
										onSaveEdit    = {this.props.onSaveEdit}
									/> :
									this.props.description === undefined || this.props.description === "" ?
									<div onClick={this.props.onEditDescription} className="add-description-prompt action">Add a description...</div> :
									<div onClick={this.props.onEditDescription} className="card-description action">{this.props.description}</div>
								}
							</div>
							<TaskList
								cardId = {this.props.id}
								tasks  = {this.props.tasks}
								listId = {this.props.listId}
								onEditTask = {this.props.onEditTask}
								onSaveEdit = {this.props.onSaveEdit}
								onDeleteTask    = {this.props.onDeleteTask}
								curTaskEditing  = {this.props.curTaskEditing}
								attributeToEdit = {this.props.attributeToEdit}
								onToggleDoneTask 		= {this.props.onToggleDoneTask}
								shouldShowEditor    = {this.props.shouldShowEditor}
								currentEditorValue  = {this.props.currentEditorValue}
								onChangeEditorValue = {this.props.onChangeEditorValue}
							/>

						<div className={`add-task-wrapper ${this.props.shouldShowEditor &&  this.props.attributeToEdit === "addTask" ? "active" : ""}`}>
								{
									this.props.shouldShowEditor &&  this.props.attributeToEdit === "addTask" ?
									<Editor
										textareaClass = {"edit-checklist"}
										onChange      = {this.props.onChangeEditorValue}
										placeholder   = "Add a task..."
										value         = {this.props.currentEditorValue}
										onSaveEdit    = {this.props.onSaveEdit}
									/> :

									<div onClick={this.props.onAddATask}>Add a task...</div>
								}
							</div>

						</div> : undefined
					}
					<div className={isDragging ? "placeholder" : ""}></div>
				</div>
			)
		);
	}
}

Card.propTypes = CardPropTypes;

const dropableCard = DropTarget(Types.CARD, cardDropTargetSpec, cardDropTargetCollect)(Card);

const draggableCard = DragSource(Types.CARD, dragSourceSpec, dragSourceCollect)(dropableCard);

export default draggableCard;
