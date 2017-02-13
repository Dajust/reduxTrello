import React,{PropTypes} from "react";
import {connect} from "react-redux";
import Board from "./Board";
import AddList from "./AddList";
import ListContainer from "../containers/ListContainer";
import {closeAllPopups, showEditor, createList} from "../actions/";

const mapStateToProps = ({domainData, appState}) => ({
	allLists : domainData.lists.allLists,
	itemToEdit : appState.itemToEdit,
	attributeToEdit : appState.attributeToEdit,
});

const mapDispatchToProps = (dispatch) => ({
	onClickAddAList : (e) => {e.stopPropagation(); dispatch(showEditor("board", "new list"));},
	onBodyClick : () => dispatch( closeAllPopups() ),
	onClickSaveList : (listName) => dispatch(createList(listName))
});

const AppPropTypes = {
	allLists : PropTypes.array.isRequired,
	onBodyClick : PropTypes.func.isRequired,
	onClickAddAList : PropTypes.func.isRequired,
	onClickSaveList : PropTypes.func.isRequired,
	itemToEdit : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	attributeToEdit : PropTypes.string.isRequired
};

const App = (props) => (
	<div className="root-comp" onClick={props.onBodyClick}>
		<header>
			<a href="https://github.com/Dajust/reduxTrello" target="blank" className="source-code">Browse the code</a>
			<h1 className="app-name">reduxTrello</h1>
		</header>
		<Board>
			{
				props.allLists.map((id, i) =>
					<ListContainer
						id = {id}
						key= {id}
						index={i}
						/>
				)
			}
			<AddList
				onClickAddAList = {props.onClickAddAList}
				onClickSaveList = {props.onClickSaveList}
				itemToEdit = {props.itemToEdit}
				attributeToEdit={props.attributeToEdit}
				/>
		</Board>
	</div>
);

App.propTypes = AppPropTypes;

export default connect(mapStateToProps, mapDispatchToProps)(App);
