import {
  SHOW_CARD_MENUE, CLOSE_ALL_POPUPS, SHOW_EDITOR, CLOSE_EDITOR,
  DELETE_CARD, CREATE_CARD,  CREATE_LIST, DELETE_LIST,
  SORT_CARD, MOVE_CARD
} from "../actions/actionTypes";

import {
  removeItemFromArray, removeItemFromObject,
   swapCardIndex, addItemToArray} from "../utils";

const setSelectedCard = (state, {cardId}) => ({
  ...state,
  selectedCard : cardId
});

const showEditor = (state, {itemToEdit, attributeToEdit}) => ({
  ...state,
  itemToEdit,
  attributeToEdit
});

const closeEditor = (state) => ({
  ...state,
  itemToEdit : "",
  attributeToEdit : ""
});

const removeCardFromList = (state, {parentListId, cardIndex}) => ({
  ...state,
  listCards : {
    ...state.listCards,
    [parentListId] : removeItemFromArray(cardIndex, state.listCards[parentListId])
  }
});

const addCardToList = (state, {listId, cardId}) => ({
  ...state,
  listCards : {
    ...state.listCards,
      [listId] : [...state.listCards[listId], cardId]
  }
});

const addListToListCards = (state, {listId}) => ({
  ...state,
  listCards : {
    ...state.listCards,
    [listId] : []
  }
});

const removeListFromListCards = (state, {listId}) => ({
  ...state,
  listCards : removeItemFromObject(listId, state.listCards)
});

const sortCard = (state, action) => ({
  ...state,
  listCards : {
    ...state.listCards,
    [action.listId] : swapCardIndex(state.listCards[action.listId], action)
  }
});

const moveCard = (state, {parentListId, cardIndex, newParentListId, newCardIndex}) => ({
  ...state,
  listCards : {
    ...state.listCards,
    [parentListId] : removeItemFromArray(cardIndex, state.listCards[parentListId]),
    [newParentListId] : addItemToArray(state.listCards[parentListId][cardIndex], newCardIndex, state.listCards[newParentListId]),
  }
});

export default function appState(state = {}, action) {
  switch (action.type) {
    case SHOW_CARD_MENUE: return setSelectedCard(state, action);
    case SHOW_EDITOR : return showEditor(state, action);
    case CLOSE_EDITOR :
    case CLOSE_ALL_POPUPS : return closeEditor(state);
    case DELETE_CARD : return removeCardFromList(state, action);
    case CREATE_CARD : return addCardToList(state, action);
    case CREATE_LIST : return addListToListCards(state, action);
    case DELETE_LIST : return removeListFromListCards(state, action);
    case SORT_CARD : return sortCard(state, action);
    case MOVE_CARD : return moveCard(state, action);
    default: return state;
  }
}
