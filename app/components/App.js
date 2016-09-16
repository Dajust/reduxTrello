import React, {Component} from "react";
import Immutable from "immutable";
import MainContainer from "../containers/MainContainer";
import allLists from "../appModule/appModule";

export default class App extends Component {
	constructor () {
		super()
		this.state = {
			allLists : [],
		}
	}

  componentDidMount () {	
		// Skip Get Data for now

		// Make data immutable
		const immutableAllLists = Immutable.fromJS(allLists);
		this.setState({allLists : immutableAllLists});
  }
  //======== UTILS==========
	findListIndex (listId) {
		return this.state.allLists.findIndex(list =>	list.get("id") === listId)
	}

	findCardIndex (listIndex, cardId) {
		return this.state.allLists.get(listIndex).get("cards")
						.findIndex(card => card.get("id") === cardId);
	}

	findTaskIndex (listIndex, cardIndex, taskId) {
		return this.state.allLists.get(listIndex).get("cards").get(cardIndex).get("tasks")
						.findIndex(task =>  task.get("id") === taskId);
	}

	getPathToAttribute (attribute, listId, cardId, taskId) {
		const
			listIndex  = this.findListIndex(listId),
			cardIndex  = this.findCardIndex(listIndex, cardId),
			attributePath = [listIndex, "cards", cardIndex];

		return  attribute === "task" ?
						attributePath.concat("tasks",this.findTaskIndex(listIndex, cardIndex, taskId)):
						attribute === "taskList" ?
						attributePath.concat("tasks") :
						attribute === "card"?
						attributePath :
						attributePath.concat(attribute);
	}

	updateState (type, updatePath, newData) {
		const newAllLists = type === "update" ? this.state.allLists.updateIn(updatePath, () => newData) :
												type === "delete" ? this.state.allLists.deleteIn(updatePath) :
												type === "create" && updatePath === "newList" ?  newData :
												type === "create" ? this.state.allLists.setIn(updatePath, newData) :
												this.state.allLists;
		this.setState({allLists : newAllLists});
	}

	//===========TASK ACTIONS=============
	handleToggleDoneTask (listId, cardId, taskId) {
		const taskPath     = this.getPathToAttribute("task", listId, cardId, taskId),
					taskDonePath = taskPath.concat("done"),
					isTaskDone   = !this.state.allLists.getIn(taskDonePath);
		this.updateState("update", taskDonePath, isTaskDone);
	}

	handleSaveTaskEdit (val, listId, cardId, taskId){
		const taskNamePath = this.getPathToAttribute ("task", listId, cardId, taskId).concat("name");
		this.updateState("update", taskNamePath, val.trim());
	}

	handleDeleteTask (listId, cardId, taskId){
		const taskPath = this.getPathToAttribute ("task", listId, cardId, taskId);
		this.updateState("delete", taskPath);
	}

	handleSaveNewTask (tastName, listId, cardId) {
		const tasksPath = this.getPathToAttribute("taskList", listId, cardId),
					tasks     = this.state.allLists.getIn(tasksPath),
					newTasks  = tasks.push(Immutable.Map({
						id   : new Date().getTime(),
						name :  tastName.trim(),
						done : false
					}));

		this.updateState("create", tasksPath, newTasks);
	}

//============ CARD ACTIONS =================
	handleSaveCardEdit (attribute, val, listId, cardId){
		const attributePath = this.getPathToAttribute (attribute, listId, cardId);
		this.updateState("update", attributePath, val.trim())
	}

	handleDeleteCard (listId, cardId){
		const cardPath = this.getPathToAttribute ("card", listId, cardId);
		this.updateState("delete", cardPath);
		console.log("handleDeleteCard fired!!", listId, cardId);
	}

	handleSaveNewCard (cardTitle, listId) {
		const listIndex = this.findListIndex(listId),
					listName = this.state.allLists.getIn([listIndex,"name"]),
					cardsPath = [listIndex, "cards"],
					cardsInList = this.state.allLists.getIn(cardsPath),
					newCardsInList  = cardsInList.push(Immutable.Map({
						id    : new Date().getTime(),
						title :  cardTitle.trim(),
						description : "",
						status : listName.toLowerCase(),
						tasks:Immutable.List()
					}));
		this.updateState("create", cardsPath, newCardsInList);
	}

	//=============== List Actions =================
	handleSaveNewList (listName) {
		const newAllLists = this.state.allLists.push(Immutable.Map({
						id    : new Date().getTime(),
						name  : listName.trim(),
						cards : Immutable.List()
					}));
		this.updateState("create", "newList",newAllLists);
	}

	handleDeleteList (listId){
		const listIndex = this.findListIndex(listId);
		this.updateState("delete", [listIndex]);
	}

	render () {
		const al = this.state.allLists,
					allLists = al.size ? al.toJS() : al;
		return (
      <MainContainer
				allLists={allLists}
				onDeleteTask   = {this.handleDeleteTask.bind(this)}
				onSaveCardEdit = {this.handleSaveCardEdit.bind(this)}
				onDeleteCard   = {this.handleDeleteCard.bind(this)}
				onSaveNewCard  = {this.handleSaveNewCard.bind(this)}
				onSaveNewTask  = {this.handleSaveNewTask.bind(this)}
				onSaveTaskEdit = {this.handleSaveTaskEdit.bind(this)}
				onSaveNewList  = {this.handleSaveNewList.bind(this)}
				onDeleteList   = {this.handleDeleteList.bind(this)}
				onToggleDoneTask = {this.handleToggleDoneTask.bind(this)}
			/>
		)
	}
}
