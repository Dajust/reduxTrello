// ALLOW findDOMNode because of DND
/* eslint "react/no-find-dom-node": 0 */

import React, {PropTypes, Component} from "react";
import {findDOMNode} from "react-dom";
import TaskList from "./TaskList";
import CardMenu from "./CardMenu";
import Editor from "./Editor";
import Task from "./Task";
import {DragSource, DropTarget} from "react-dnd";
import Types from "../staticTypes";

let initialState; // initialState before beginDrag DnD

const dragSourceSpec = {
	beginDrag : ({id, index, parentListId, curState}) => ({
		id,
		index,
		parentListId,
		curState
	}),

	isDragging : (props, monitor) =>
		monitor.getItem().id === props.id
 ,

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
					hoverId = props.id,
					dragId = item.id,
					dragIndex = item.index,
					hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragId === hoverId) {
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
    props.handleOnSortCard(hoverId, hoverIndex, dragId, dragIndex);

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


class Card extends Component{
	componentDidMount() {
		if (initialState !== undefined) {
			this.props.onSetState(initialState);
			initialState = undefined;
		}
	}

	render () {
		const {
			card, onClickDeleteCard, onShowDetails,connectDragSource,
			connectDropTarget, showEditor, isSelectedCard,
			attributeToEdit, updateCard, itemToEdit,isDragging,dragItem
		} = this.props,
		isItemToEdit = itemToEdit === card.id,
		onClickSave = (value)	=>{updateCard(attributeToEdit, value);};

		// const { dragItem} = this.props;
		//
		if (isDragging) {
			initialState = dragItem.curState;
		}
		return connectDragSource(
			connectDropTarget(
				<div className="card ">
					<div className="menu-icon action" >
						<i className="fa fa-ellipsis-v"
								aria-hidden="true"
								onClick={(e) => {
										this.props.onClickMenu(e.target);
										e.stopPropagation();
									}
								}>
						</i>
					</div>
					{
						this.props.shouldShowCardMenu &&
						<CardMenu
							hasDescription    = {!!card.description.length}
							onClickAddATask   = {(e)=>{onShowDetails(); showEditor("new task"); e.stopPropagation();}}
							onClickEditTitle  = {(e)=>{onShowDetails(); showEditor("title"); e.stopPropagation(); }}
							menuPosition    = {this.props.menuPosition}
							onClickDeleteCard  = {onClickDeleteCard}
							onClickEditDescription = {(e)=>{onShowDetails(); showEditor( "description"); e.stopPropagation(); }}
						/>
					}
					<div className="card-title-container">
						{

							isItemToEdit &&  attributeToEdit === "title" ?
							<Editor
								textareaClass = {"edit-checklist"}
								initialValue   = {card.title}
								onClickSave   = {onClickSave}
							/> :

							<div className="card-title action" onClick={this.props.onToggleShowDetails}>
								<i className={this.props.shouldShowDetails?"fa fa-caret-down":"fa fa-caret-right"} aria-hidden="true"></i>
								<span className="title">{card.title}</span>
							</div>
						}
					</div>
					{
						this.props.shouldShowDetails === true ?
						<div className="card-details">
							<div className="description">
								{
									isItemToEdit && attributeToEdit === "description" ?
									<Editor
										textareaClass = {"edit-checklist"}
										placeholder   = "Add a description..."
										initialValue   = {card.description}
										onClickSave   = {onClickSave}
									/> :

								<div onClick={(e)=>{showEditor("description"); e.stopPropagation();}}
										className={`action  ${card.description ? "card-description" : "add-description-prompt"}`}>
										{card.description ? card.description : "Add a description..."}
									</div>
								}
							</div>
							<TaskList>
								{
									card.tasks.map((taskId, i) =>
										<Task
											id = {taskId}
											key = {taskId}
											index = {i}
											cardId = {card.id}
										/>)
								}
							</TaskList>

						<div className={`add-task-wrapper ${isSelectedCard &&  attributeToEdit === "addTask" ? "active" : ""}`}>
								{
									isItemToEdit && attributeToEdit === "new task" ?
									<Editor
										textareaClass = {"edit-checklist"}
										placeholder   = "Add a task..."
										onClickSave   = {(taskName)=>{this.props.onAddATask(card.id, taskName);}}
									/> :
									<div onClick={(e)=>{showEditor( "new task"); e.stopPropagation();}}>Add a task...</div>
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

Card.propTypes = {
	card  : PropTypes.shape({
		id    : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
		title : PropTypes.string.isRequired,
		tasks : PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number ])).isRequired,
		description : PropTypes.string.isRequired
	}).isRequired,
	index : PropTypes.number.isRequired,
	parentListId : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	shouldShowDetails : PropTypes.bool.isRequired,
	shouldShowCardMenu : PropTypes.bool.isRequired,
	currentEditorValue : PropTypes.string,
	itemToEdit : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	attributeToEdit : PropTypes.string.isRequired,
	isSelectedCard  : PropTypes.bool.isRequired,
	onClickMenu 		: PropTypes.func.isRequired,
	curTaskEditing  : PropTypes.oneOfType([PropTypes.string, PropTypes.number ])/*.isRequired*/,
	showEditor 	: PropTypes.func.isRequired,
	onShowDetails : PropTypes.func.isRequired,
	updateCard 	: PropTypes.func.isRequired,
	menuPosition      : PropTypes.object.isRequired,
	onAddATask 				: PropTypes.func.isRequired,
	onToggleShowDetails : PropTypes.func.isRequired,
	onClickDeleteCard      : PropTypes.func.isRequired,
	curState : PropTypes.object.isRequired,// we want to preserve card state while/after Dn*/,
	isDragging : PropTypes.bool,
	connectDragSource : PropTypes.func.isRequired,
	onSetState : PropTypes.func.isRequired,
	connectDropTarget : PropTypes.func.isRequired,
	dragItem : PropTypes.object,
	isOver :  PropTypes.bool.isRequired,
	handleOnSortCard : PropTypes.func.isRequired
};

const dropableCard = DropTarget(Types.CARD, cardDropTargetSpec, cardDropTargetCollect)(Card);
const draggableCard = DragSource(Types.CARD, dragSourceSpec, dragSourceCollect)(dropableCard);

export default draggableCard;
