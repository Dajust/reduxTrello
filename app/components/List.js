import React,{PropTypes} from "react";
import CardContainer from "../containers/CardContainer";
import Editor from "./Editor";
import {DropTarget} from "react-dnd";
import Types from "../staticTypes";

const DropTargetSpec = {
	drop (props, monitor) {
		console.log("drop got fired!");
		const droppedItem = monitor.getItem();
		console.log("Yikes!! you dropped", droppedItem, " on me - ", props.title);
		return {
			...droppedItem,
			placeDropped : props.title
		};
	},
	//
	//
	hover (props) {
		console.log("Hey you over me:", props.title);
	},
	// canDrop (props, monitor) {
	// 	const item = monitor.getItem();
	// 	console.log("Hey! yea..\n, You can drop ",item," on me!!! I am", props.title);
	// },
}

const DropTargetCollect = function DropTargetCollect(connect, monitor) {
	return {
		isOver : monitor.isOver(),
		canDrop : monitor.canDrop(),
		connectDropTarget : connect.dropTarget()
	}
}

const ListPropTypes = {
	cards : PropTypes.array.isRequired,
	shouldCloseAllEditor : PropTypes.bool.isRequired,
	shouldShowCardMenu : PropTypes.bool.isRequired,
	id : PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	title         : PropTypes.string.isRequired,
	curActiveCard : PropTypes.string.isRequired,
	curActiveList : PropTypes.string.isRequired,
	curTaskEditing : PropTypes.string,
	attributeToEdit : PropTypes.string.isRequired,
	currentEditorValue : PropTypes.string.isRequired,
	showEditor : PropTypes.func.isRequired,
	onDeleteTask : PropTypes.func.isRequired,
	onChangeEditorValue : PropTypes.func.isRequired,
	onToggleDoneTask    : PropTypes.func.isRequired,
	onDeleteCard : PropTypes.func.isRequired,
	closeAllEditor : PropTypes.func.isRequired,
	openCardMenu   : PropTypes.func.isRequired,
	onSaveEdit : PropTypes.func.isRequired,
	onAddACard : PropTypes.func.isRequired,
	onDeleteList : PropTypes.func.isRequired
}

const List = props =>{
	const showAddCardEditor = !props.shouldCloseAllEditor && props.curActiveList === `list__${props.id}` && props.attributeToEdit === "createNewCard";
	return props.connectDropTarget(
		<div className="list-container">
			<div className="list">
			<div className="action delete-list-icon" >
				<i className="fa fa-trash"
						aria-hidden="true"
						onClick={() => {
								props.onDeleteList(props.id);
							}
						}>
				</i>
			</div>
				<h2 className="list-title">{props.title}</h2>
				<div className="cards-container">
					{
						props.cards.map(card =>
							<CardContainer
								id={card.id}
								key={card.id}
								title={card.title}
								description={card.description}
								tasks={card.tasks}
								listId={props.id}
								onDeleteCard={props.onDeleteCard}
								curTaskEditing={props.curTaskEditing}
								closeAllEditor={props.closeAllEditor}
								showEditor={props.showEditor}
								shouldShowMenu={props.shouldShowCardMenu}
								curActiveCard={props.curActiveCard}
								attributeToEdit     = {props.attributeToEdit}
								currentEditorValue  = {props.currentEditorValue}
								onDeleteTask = {props.onDeleteTask}
								onChangeEditorValue={props.onChangeEditorValue}
								shouldCloseAllEditor={props.shouldCloseAllEditor}
								openCardMenu={props.openCardMenu}
								onSaveEdit = {props.onSaveEdit}
								onToggleDoneTask = {props.onToggleDoneTask}
							/>
						)
					}
					{
						showAddCardEditor === true ?
						<Editor
							textareaClass={"add-card"}
							showDelete={false}
							placeholder="Add a card..."
							value={props.currentEditorValue}
							onChange={props.onChangeEditorValue}
							onSaveEdit={(e) => {props.onSaveEdit(e,props.id)}}
						/> :
						undefined
					}
				</div>
				{
					showAddCardEditor === true ? undefined :
					<a href="#" onClick={(e)=>props.onAddACard(e, `list__${props.id}`)} className="add-card-btn">Add a card...</a>
				}

			</div>
		</div>
	)
}

List.propTypes = ListPropTypes;

const dropEnabledList = DropTarget(Types.CARD, DropTargetSpec,DropTargetCollect)(List);

export default dropEnabledList;
