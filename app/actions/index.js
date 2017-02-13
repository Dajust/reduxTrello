import * as actionTypes from "./actionTypes";

export const showCardMenu = (cardId, cardMenuIcon) => ({
  type : actionTypes.SHOW_CARD_MENUE,
  cardId,
  cardMenuIcon
});

export const updateEditorValue = (value) => ({
  type : actionTypes.UPDATE_EDITOR_VALUE,
  value
});

export const updateCard = (cardId, cardField, newVal) => ({
  type : actionTypes.UPDATE_CARD,
  cardId,
  cardField,
  newVal
});

export const createTask = (cardId, taskName) => ({
  type : actionTypes.CREATE_TASK,
  taskId : new Date().getTime(),
  cardId,
  taskName
});

export const deleteCard = (cardId, cardIndex, parentListId) => ({
  type : actionTypes.DELETE_CARD,
  cardId,
  cardIndex,
  parentListId,
});

export const toggleTaskDone = (taskId) => ({
  type : actionTypes.TOGGLE_TASK_DONE,
  taskId
});

export const updateTask = (taskId, newVal) => ({
  type : actionTypes.UPDATE_TASK,
  taskId,
  newVal
});

export const deleteTask = (taskId, index, cardId) => ({
  type : actionTypes.DELETE_TASK,
  taskId,
  index,
  cardId
});

export const showEditor = (itemToEdit, attributeToEdit) => ({
  type : actionTypes.SHOW_EDITOR,
  itemToEdit,
  attributeToEdit
});

export const createCard = (cardTitle, listId) => ({
  type : actionTypes.CREATE_CARD,
  cardId : new Date().getTime(),
  cardTitle,
  listId
});

export const createList = (listName) => ({
  type : actionTypes.CREATE_LIST,
  listId : new Date().getTime(),
  listName,
});

export const deleteList = (listId) => ({
  type : actionTypes.DELETE_LIST,
  listId
});

export const sortCard = (listId, hoverID, hoverIndex, dragID, dragIndex) => ({
  type : actionTypes.SORT_CARD,
  hoverID,
  hoverIndex,
  dragID,
  dragIndex,
  listId
});

export const moveCard = (parentListId, cardIndex, newParentListId, newCardIndex) => ({
  type : actionTypes.MOVE_CARD,
  parentListId,
  cardIndex,
  newParentListId,
  newCardIndex
});

export const closeCardMenu = () => ({type : actionTypes.CLOSE_CARD_MENUE});
export const closeEditor = () => ({type : actionTypes.CLOSE_EDITOR});
export const closeAllPopups = () => ({type : actionTypes.CLOSE_ALL_POPUPS});
