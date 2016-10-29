import React,{PropTypes, Component} from "react";
import CardContainer from "../containers/CardContainer";
import Editor from "./Editor";
import {DropTarget} from "react-dnd";
import Types from "../staticTypes";

const DropTargetSpec = {
	drop () {

	},
	//
	hover (props, monitor, component) {
		const item = monitor.getItem(),
			mouseYPosition = monitor.getClientOffset().y;

		if (item.parentIndex === props.index) { return; }

		const index = mouseYPosition < component.rectPosition.top + 32 ? 0 : props.numOfCards; // 32 is the minium height of list-title-div
		props.moveCard(item.index, item.parentIndex, props.index, index);

		monitor.getItem().index = index;
		monitor.getItem().parentIndex = props.index;
	},
};

const DropTargetCollect = (connect, monitor) => ({
		isOver : monitor.isOver(),
		canDrop : monitor.canDrop(),
		connectDropTarget : connect.dropTarget()
	});

const ListPropTypes = {
	cards : PropTypes.array.isRequired,
	shouldCloseAllEditor : PropTypes.bool.isRequired,
	shouldShowCardMenu : PropTypes.bool.isRequired,
	id : PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	index : PropTypes.number.isRequired,
	title         : PropTypes.string.isRequired,
	curActiveCard : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	curActiveList : PropTypes.string.isRequired,
	curTaskEditing : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
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
	numOfCards : PropTypes.number,
	onDeleteList : PropTypes.func.isRequired,
	moveCard : PropTypes.func.isRequired,
	connectDropTarget : PropTypes.func.isRequired,
	swapCardIndex : PropTypes.func.isRequired
};

class List extends Component {
	render () {
		const showAddCardEditor = !this.props.shouldCloseAllEditor && this.props.curActiveList === `list__${this.props.id}` && this.props.attributeToEdit === "createNewCard";
		return this.props.connectDropTarget(
			<div className="list-container" ref={list => this.rectPosition = list ? list.getBoundingClientRect() : null}>
				<div className="list">
					<div className="action delete-list-icon" >
						<i className="fa fa-trash"
							aria-hidden="true"
							onClick={() => {
								this.props.onDeleteList(this.props.id);
							}
						}>
					</i>
				</div>
				<h2 className="list-title">{this.props.title}</h2>
				<div className="cards-container">
					{
						this.props.cards.map((card, i) =>
							<CardContainer
								id={card.id}
								key={card.id}
								title={card.title}
								index={i}
								description={card.description}
								tasks={card.tasks}
								listId={this.props.id}
								listIndex={this.props.index}
								onDeleteCard={this.props.onDeleteCard}
								curTaskEditing={this.props.curTaskEditing}
								closeAllEditor={this.props.closeAllEditor}
								showEditor={this.props.showEditor}
								shouldShowMenu={this.props.shouldShowCardMenu}
								curActiveCard={this.props.curActiveCard}
								attributeToEdit= {this.props.attributeToEdit}
								currentEditorValue  = {this.props.currentEditorValue}
								onDeleteTask = {this.props.onDeleteTask}
								onChangeEditorValue={this.props.onChangeEditorValue}
								shouldCloseAllEditor={this.props.shouldCloseAllEditor}
								openCardMenu={this.props.openCardMenu}
								onSaveEdit = {this.props.onSaveEdit}
								onToggleDoneTask = {this.props.onToggleDoneTask}
								swapCardIndex = {this.props.swapCardIndex}
								/>
						)
					}
					{
						showAddCardEditor === true ?
						<Editor
							textareaClass={"add-card"}
							showDelete={false}
							placeholder="Add a card..."
							value={this.props.currentEditorValue}
							onChange={this.props.onChangeEditorValue}
							onSaveEdit={(e) => {this.props.onSaveEdit(e,this.props.id);}}
							/> :
							undefined
						}
					</div>
					{
						showAddCardEditor === true ? undefined :
						<a href="#" onClick={(e)=>this.props.onAddACard(e, `list__${this.props.id}`)} className="add-card-btn">Add a card...</a>
					}
				</div>
			</div>
		);
	}
}

List.propTypes = ListPropTypes;

const dropEnabledList = DropTarget(Types.CARD, DropTargetSpec,DropTargetCollect)(List);

export default dropEnabledList;
