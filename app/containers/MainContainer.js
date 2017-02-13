// import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Main from "../components/Main";

export default connect()(Main);

//
// const MainContainerPropTypes = {
// 	allLists       : PropTypes.array.isRequired,
// 	onSaveCardEdit : PropTypes.func.isRequired,
// 	onSaveTaskEdit : PropTypes.func.isRequired,
// 	onSaveNewCard : PropTypes.func.isRequired,
// 	onSaveNewList : PropTypes.func.isRequired,
// 	onSaveNewTask : PropTypes.func.isRequired,
// 	onToggleDoneTask : PropTypes.func.isRequired,
// 	onDeleteTask : PropTypes.func.isRequired,
// 	onDeleteCard : PropTypes.func.isRequired,
// 	onDeleteList : PropTypes.func.isRequired,
// 	moveCard 		 : PropTypes.func.isRequired,
// 	swapCardIndex : PropTypes.func.isRequired
// };



// class MainContainer extends Component {
	// constructor () {
	// 	super();
	// 	this.state = {
	// 		attributeToEdit   : "NAME_OF_ATTR_TO_BE_EDITED.EG: TITLE",
	// 		currentEditorValue : "",
	// 		curActiveList : "PATH_TO_THE_LIST_IN_FOCUS",
	// 		curActiveCard : "ID_OF_CARD_IN_FOCUS",
	// 		curTaskEditing : "ID_OF_TASK_IN_FOCUS",
	// 		shouldShowCardMenu  : false,
	// 		shouldCloseAllEditor : true
	// 	};
	// }
	//
	// closeAllCardMenu () {
	// 	this.setState({
	// 		shouldShowCardMenu : false
	// 	});
	// }
	//
	// setCurActiveCard (cardId) {
	// 	this.setState({curActiveCard:cardId});
	// }
	//
	// closeAllEditor ( ) {
	// 	this.setState({
	// 		shouldCloseAllEditor : true,
	// 		curActiveCard : "",
	// 		curActiveList : ""
	// 	});
	// }
	//
	// handleShowEditor (attribute, previousVal = "", cardId="", taskId="") {
	// 	this.setState({
	// 		attributeToEdit    : attribute,
	// 		currentEditorValue : previousVal,
	// 		curActiveCard : cardId,
	// 		shouldCloseAllEditor : false,
	// 		curTaskEditing : taskId
	// 	});
	// 	this.closeAllCardMenu();
	// }
	//
	// handleSaveEdit (e, listId, cardId) {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// 	const
	// 			state = this.state,
	// 			props = this.props,
	// 			atd = state.attributeToEdit,
	// 			compulsoryAttributes = ["title", "addTask", "task", "createNewCard", "createNewList"];
	//
	// 	if (compulsoryAttributes.includes(atd) && !state.currentEditorValue.trim().length) {return;}
	// 	this.closeAllEditor();
	// 	if (atd === "task") {
	// 		props.onSaveTaskEdit(state.currentEditorValue, listId, cardId, state.curTaskEditing);
	// 		return;
	// 	}
	// 	if (atd === "addTask") {
	// 		props.onSaveNewTask(state.currentEditorValue, listId, cardId);return;
	// 	}
	// 	if (atd === "createNewCard") {
	// 		props.onSaveNewCard(state.currentEditorValue, listId);return;
	// 	}
	// 	if (atd === "createNewList") {
	// 		props.onSaveNewList(state.currentEditorValue, listId);return;
	// 	}
	//
	// 	props.onSaveCardEdit(atd, state.currentEditorValue, listId, cardId);
	// }
	//
	// handleCloseAllPopover () {
	// 	this.closeAllEditor();
	// 	this.closeAllCardMenu();
	// }
	//
	// handleChangeEditorValue (e) {
	// 	this.setState({
	// 		currentEditorValue : e.target.value
	// 	});
	// }
	//
	
	//
	// handleAddACard (e, listId) {
	// 	e.stopPropagation();
	// 	this.handleShowEditor("createNewCard");
	// 	this.setState({curActiveList:listId});
	// }
	//
	// handleSaveCard (e) {
	// 	e.stopPropagation();
	// 	this.setState({
	// 		curActiveCard : "",
	// 		shouldCloseAllEditor : false
	// 	});
	// }
	//
	// handleAddAList (e) {
	// 	e.stopPropagation();
	// 	this.handleShowEditor("createNewList");
	// }

// 	render () {
// 		return (
// 			<Main onBodyClick={this.handleCloseAllPopover.bind(this)}>
// 				<Board
// 					allLists={this.props.allLists}
// 					shouldCloseAllEditor={this.state.shouldCloseAllEditor}
// 					attributeToEdit={this.state.attributeToEdit}
// 					currentEditorValue={this.state.currentEditorValue}
// 					curActiveCard={this.state.curActiveCard}
// 					curActiveList={this.state.curActiveList}
// 					curTaskEditing={this.state.curTaskEditing}
// 					showEditor = {this.handleShowEditor.bind(this)}
// 					shouldShowCardMenu={this.state.shouldShowCardMenu}
// 					onChangeEditorValue = {this.handleChangeEditorValue.bind(this)}
// 					closeAllEditor={this.closeAllEditor.bind(this)}
// 					openCardMenu={this.openCardMenu.bind(this)}
// 					onAddAList={this.handleAddAList.bind(this)}
// 					onAddACard = {this.handleAddACard.bind(this)}
// 					onDeleteTask = {this.props.onDeleteTask}
// 					onToggleDoneTask = {this.props.onToggleDoneTask}
// 					onSaveEdit={this.handleSaveEdit.bind(this)}
// 					onDeleteCard={this.props.onDeleteCard}
// 					onDeleteList= {this.props.onDeleteList}
// 					swapCardIndex = {this.props.swapCardIndex}
// 					moveCard = {this.props.moveCard}
// 				/>
// 			</Main>
// 		);
// 	}
// }
//
// MainContainer.propTypes = MainContainerPropTypes;

// export default MainContainer;
