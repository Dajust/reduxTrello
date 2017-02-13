// import {combineReducers} from "redux";
import {removeItemFromObject, removeItemFromArray} from "../utils/";
import { UPDATE_CARD, CREATE_TASK, DELETE_CARD,
  UPDATE_TASK, TOGGLE_TASK_DONE, DELETE_TASK,
  CREATE_CARD, CREATE_LIST, DELETE_LIST
} from "../actions/actionTypes";

const updateCard = (state, {cardId, cardField, newVal}) => ({
  ...state,
  cards : {
    ...state.cards,
    byId : {
      ...state.cards.byId,
      [cardId] : {
        ...state.cards.byId[cardId],
        [cardField] : newVal
      }
    }
  }
});

const addTaskIdToParentCardTasks = (cards, {cardId, taskId}) => ({
  ...cards,
  byId : {
    ...cards.byId,
    [cardId] : {
      ...cards.byId[cardId],
      tasks : [
        ...cards.byId[cardId].tasks,
        taskId
      ]
    }
  }
});

const addNewTask = (tasks, {taskId, taskName}) => ({
  ...tasks,
  byId : {
    ...tasks.byId,
    [taskId] : {
      id : taskId,
      name : taskName,
      done : false
    }
  }
});

const createTask = (state, action) => ({
  ...state,
  cards : addTaskIdToParentCardTasks(state.cards, action),
  tasks : addNewTask(state.tasks, action),
});

const deleteAllTasksInCard = (tasks, cards, {cardId}) => {
  const newTasks = {
    ...tasks,
    byId : {
      ...tasks.byId
    }
  },
  tasksInCard = cards.byId[cardId].tasks;

  tasksInCard.forEach((taskId) => delete newTasks.byId[taskId]);
  return newTasks;
};

const _deleteCard = (cards, {cardId}) => ({
  ...cards,
    byId : removeItemFromObject(cardId, cards.byId)
});

const deleteCard = (state, action) => ({
  ...state,
  tasks : deleteAllTasksInCard(state.tasks, state.cards, action),
  cards : _deleteCard(state.cards, action),
});

const createCard = (state, {cardId, cardTitle}) => ({
  ...state,
  cards : {
    ...state.cards,
    byId : {
      ...state.cards.byId,
      [cardId] : {
        id : cardId,
        title : cardTitle,
        description : "",
        tasks : []
      }
    }
  }
});

const updateTask = (state, {taskId, newVal}) => ({
  ...state,
  tasks : {
    ...state.tasks,
    byId : {
      ...state.tasks.byId,
      [taskId] : {
        ...state.tasks.byId[taskId],
        name : newVal
      }
    }
  }
});

const toggleTaskDone = (state, {taskId}) => ({
  ...state,
  tasks : {
    ...state.tasks,
    byId : {
      ...state.tasks.byId,
      [taskId] : {
        ...state.tasks.byId[taskId],
        done : !state.tasks.byId[taskId].done
      }
    }
  }
});

const removeTaskFromCard = (cards, {cardId, index}) => ({
  ...cards,
  byId : {
    ...cards.byId,
    [cardId] : {
      ...cards.byId[cardId],
      tasks : removeItemFromArray(index, cards.byId[cardId].tasks)
    }
  }
});

const _deleteTask = (tasks, taskId) => ({
  ...tasks,
  byId : removeItemFromObject(taskId, tasks.byId)
});

const deleteTask = (state, action) => ({
  ...state,
  cards : removeTaskFromCard(state.cards, action),
  task : _deleteTask(state.tasks, action)
});

const createList = (state, {listId, listName}) => ({
  ...state,
  lists : {
    ...state.lists,
    byId : {
      ...state.lists.byId,
      [listId] : {
        id : listId,
        name : listName
      }
    },
    allLists : [...state.lists.allLists, listId]
  }
});

const deleteList = (state, {listId}) => ({
  ...state,
  lists : {
    ...state.lists,
    byId : removeItemFromObject(listId, state.lists.byId),
    allLists : state.lists.allLists.filter((id)=> id !== listId)
  }
});

export default function domainData(state = {}, action) {
  switch (action.type) {
    case UPDATE_CARD: return updateCard(state, action);
    case CREATE_TASK : return createTask(state, action);
    case DELETE_CARD : return deleteCard(state, action);
    case UPDATE_TASK : return updateTask(state, action);
    case TOGGLE_TASK_DONE : return toggleTaskDone(state, action);
    case DELETE_TASK : return deleteTask (state, action);
    case CREATE_CARD : return createCard(state, action);
    case CREATE_LIST : return createList(state, action);
    case DELETE_LIST: return deleteList(state, action);
    default: return state;
  }
}
