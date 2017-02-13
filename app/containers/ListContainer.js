import {connect} from "react-redux";
import List from "../components/List";
import {showEditor, createCard, deleteList, moveCard} from "../actions/";

const mapStateToProps = ({domainData, appState, uiState}, {id, index}) => ({
  index,
  list  : domainData.lists.byId[id],
  cards : appState.listCards[id],
  listByIds : domainData.lists.byId,
	listCards : appState.listCards,
  itemToEdit : appState.itemToEdit,
	attributeToEdit : appState.attributeToEdit,
  numOfCards : appState.listCards[id].length
});

const mapDispatchToProps = (dispatch, {id}) => ({
  onClickAddACard : () => dispatch(showEditor(id, "new card")),
  onClickSave : (cardTitle) => dispatch(createCard(cardTitle, id)),
  onClickDeleteList : () => dispatch(deleteList(id)),
  handleOnMoveCard : (parentListId, cardIndex, newCardIndex) =>
   dispatch(moveCard(parentListId, cardIndex, id, newCardIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
