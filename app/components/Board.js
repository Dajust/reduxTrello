import React,{PropTypes, Component} from "react";
import HTML5Backend from "react-dnd-html5-backend";
import {DragDropContext} from "react-dnd";
import List from "./List";
import Editor from "./Editor";
// import CardMenu from "./CardMenu";

const BoardPropTypes = {
	allLists       		   : PropTypes.arrayOf(PropTypes.object).isRequired,
	shouldCloseAllEditor : PropTypes.bool.isRequired,
	shouldShowCardMenu : PropTypes.bool.isRequired,
	curActiveCard : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	curTaskEditing : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	curActiveList : PropTypes.string.isRequired,
	attributeToEdit : PropTypes.string.isRequired,
	currentEditorValue : PropTypes.string.isRequired,
	onAddAList : PropTypes.func.isRequired,
	onToggleDoneTask    : PropTypes.func.isRequired,
	onDeleteCard : PropTypes.func.isRequired,
	closeAllEditor : PropTypes.func.isRequired,
	showEditor : PropTypes.func.isRequired,
	openCardMenu : PropTypes.func.isRequired,
	onAddACard : PropTypes.func.isRequired,
	onDeleteTask : PropTypes.func.isRequired,
	onChangeEditorValue : PropTypes.func.isRequired,
	onSaveEdit : PropTypes.func.isRequired,
	onDeleteList : PropTypes.func.isRequired,
	moveCard: PropTypes.func.isRequired,
	swapCardIndex : PropTypes.func.isRequired
};

class Board extends Component {
	render () {
		const showAddListEditor = !this.props.shouldCloseAllEditor && this.props.attributeToEdit === "createNewList";
		return(
			<div className="app-board-container">
				<div className="app-board">
					{
						this.props.allLists.map((list, i) =>
							<List
								title={list.name}
								cards={list.cards}
								numOfCards={list.cards.length}
								id = {list.id}
								key={list.id}
								index={i}
								closeAllEditor={this.props.closeAllEditor}
								openCardMenu={this.props.openCardMenu}
								curActiveCard={this.props.curActiveCard}
								curActiveList={this.props.curActiveList}
								curTaskEditing={this.props.curTaskEditing}
								attributeToEdit     = {this.props.attributeToEdit}
								currentEditorValue  = {this.props.currentEditorValue}
								showEditor={this.props.showEditor}
								shouldShowCardMenu={this.props.shouldShowCardMenu}
								shouldCloseAllEditor={this.props.shouldCloseAllEditor}
								onDeleteTask = {this.props.onDeleteTask}
								onChangeEditorValue={this.props.onChangeEditorValue}
								onAddACard={this.props.onAddACard}
								onSaveEdit={this.props.onSaveEdit}
								onToggleDoneTask = {this.props.onToggleDoneTask}
								onDeleteCard={this.props.onDeleteCard}
								onDeleteList= {this.props.onDeleteList}
								moveCard = {this.props.moveCard}
								swapCardIndex = {this.props.swapCardIndex}
								/>
						)
					}

					<div className="list-container">
						<div className="list">
							<div className= { showAddListEditor? "add-a-list-btn-container show-addlist-editor": "add-a-list-btn-container"}>

								{
									showAddListEditor ?
									<Editor
										textareaClass={"add-list"}
										showDelete={false}
										value = {this.props.currentEditorValue}
										onChange={this.props.onChangeEditorValue}
										placeholder="Type the list name here..."
										onSaveEdit={this.props.onSaveEdit}
										/> :
										<div onClick={this.props.onAddAList} className="add-a-list-btn">
											Add a list...
										</div>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
		);
	}
}

Board.propTypes = BoardPropTypes;

const dragDropEnabledBoard = DragDropContext(HTML5Backend)(Board);

export default dragDropEnabledBoard;
