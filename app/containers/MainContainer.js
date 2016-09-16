import React, {Component, PropTypes} from "react";
import Board from "../components/Board";
import Main from "../components/Main";

const MainContainerPropTypes = {
	allLists       : PropTypes.array.isRequired,
	onSaveCardEdit : PropTypes.func.isRequired,
	onSaveTaskEdit : PropTypes.func.isRequired,
	onSaveNewCard : PropTypes.func.isRequired,
	onSaveNewList : PropTypes.func.isRequired,
	onSaveNewTask : PropTypes.func.isRequired,
	onToggleDoneTask : PropTypes.func.isRequired,
	onDeleteTask : PropTypes.func.isRequired,
	onDeleteCard : PropTypes.func.isRequired,
	onDeleteList : PropTypes.func.isRequired
}

class MainContainer extends Component {
	constructor () {
		super()
		this.state = {
			attributeToEdit   : "NAME_OF_ATTR_TO_BE_EDITED.EG: TITLE",
			currentEditorValue : "",
			curActiveList : "PATH_TO_THE_LIST_IN_FOCUS",
			curActiveCard : "PATH_TO_THE_CARD_IN_FOCUS",
			curTaskEditing : "PATH_TO_THE_TASK_IN_FOCUS",
			shouldShowCardMenu  : false,
			shouldCloseAllEditor : true
		}
	}

	closeAllCardMenu () {
		this.setState({
			shouldShowCardMenu : false
		})
	}

	setCurActiveCard (cardPath) {
		this.setState({curActiveCard:cardPath})
	}

	closeAllEditor ( ) {
		this.setState({
			shouldCloseAllEditor : true,
			curActiveCard : "",
			curActiveList : ""
		})
	}

	handleShowEditor (attribute, previousVal = "", cardPath = "", taskPath = "") {
		this.setState({
			attributeToEdit    : attribute,
			currentEditorValue : previousVal,
			curActiveCard : cardPath,
			shouldCloseAllEditor : false,
			curTaskEditing : taskPath
		});
		this.closeAllCardMenu();
	}

	handleSaveEdit (e, listId, cardId) {
		e.preventDefault();
		e.stopPropagation();
		const
				state = this.state,
				props = this.props,
				atd = state.attributeToEdit,
				compulsoryAttributes = ["title", "addTask", "task", "createNewCard", "createNewList"];

		if (compulsoryAttributes.includes(atd) && !state.currentEditorValue.trim().length) {return}
		this.closeAllEditor();
		if (atd === "task") {
			props.onSaveTaskEdit(state.currentEditorValue, listId, cardId, parseInt(state.curTaskEditing.split("_").pop()));
			return;
		}
		if (atd === "addTask") {
			props.onSaveNewTask(state.currentEditorValue, listId, cardId);return
		}
		if (atd === "createNewCard") {
			props.onSaveNewCard(state.currentEditorValue, listId);return
		}
		if (atd === "createNewList") {
			props.onSaveNewList(state.currentEditorValue, listId);return
		}

		props.onSaveCardEdit(atd, state.currentEditorValue, listId, cardId);
	}

	handleCloseAllPopover () {
		this.closeAllEditor();
		this.closeAllCardMenu();
	}

	handleChangeEditorValue (e) {
		this.setState({
			currentEditorValue : e.target.value
		});
	}

	openCardMenu (cardId) {
		this.closeAllEditor();
		this.setCurActiveCard(cardId);
		this.setState({shouldShowCardMenu:true})
	}

	handleAddACard (e, listId) {
		e.stopPropagation();
		this.handleShowEditor("createNewCard");
		this.setState({curActiveList:listId});
	}

	handleSaveCard (e) {
		e.stopPropagation();
		this.setState({
			// curActiveList : listId,
			curActiveCard : "",
			shouldCloseAllEditor : false
		});
	}

	handleAddAList (e) {
		e.stopPropagation();
		this.handleShowEditor("createNewList");
	}

	render () {
		return (
			<Main onBodyClick={this.handleCloseAllPopover.bind(this)}>
				<Board
					allLists={this.props.allLists}
					shouldCloseAllEditor={this.state.shouldCloseAllEditor}
					attributeToEdit={this.state.attributeToEdit}
					currentEditorValue={this.state.currentEditorValue}
					curActiveCard={this.state.curActiveCard}
					curActiveList={this.state.curActiveList}
					curTaskEditing={this.state.curTaskEditing}
					showEditor = {this.handleShowEditor.bind(this)}
					shouldShowCardMenu={this.state.shouldShowCardMenu}
					setCurActiveCard={this.setCurActiveCard.bind(this)}
					onChangeEditorValue = {this.handleChangeEditorValue.bind(this)}
					closeAllEditor={this.closeAllEditor.bind(this)}
					openCardMenu={this.openCardMenu.bind(this)}
					onAddAList={this.handleAddAList.bind(this)}
					onAddACard = {this.handleAddACard.bind(this)}
					onDeleteTask = {this.props.onDeleteTask}
					onToggleDoneTask = {this.props.onToggleDoneTask}
					onSaveEdit={this.handleSaveEdit.bind(this)}
					onDeleteCard={this.props.onDeleteCard}
					onDeleteList= {this.props.onDeleteList}
				/>
			</Main>
		)
	}
}

MainContainer.propTypes = MainContainerPropTypes;

export default MainContainer;
