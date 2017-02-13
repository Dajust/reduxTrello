import {
  SHOW_CARD_MENUE, CLOSE_CARD_MENUE, CLOSE_ALL_POPUPS,
  UPDATE_EDITOR_VALUE,
} from "../actions/actionTypes";

function setMenuPosition (menuIcon) {
  // set position based on the clicked menu-icon position
  const
    iconPosition 	= menuIcon.getBoundingClientRect(),
    cardMenuWidth = 145 + 5,
    top  		 = iconPosition.top,
    leftPos  = iconPosition.right - cardMenuWidth,
    left 		 = leftPos < 0 ? 0 : leftPos
  ;

  return {top : top, left : left};
}

const closeCardMenu = (uiState) =>({
  ...uiState,
  shouldShowCardMenu : false
});

const showCardMenu = (uiState = {}, action) => ({
  ...uiState,
  cardMenuPosition : setMenuPosition(action.cardMenuIcon),
  shouldShowCardMenu : true
});

const updateEditorValue = (uiState = {}, action) => ({
  ...uiState,
  currentEditorValue : action.value
});

export  default function uiState(uiState = {}, action) {
  switch (action.type) {
    case SHOW_CARD_MENUE: return showCardMenu(uiState, action);
    case CLOSE_CARD_MENUE:
    case CLOSE_ALL_POPUPS : return closeCardMenu(uiState);
    case UPDATE_EDITOR_VALUE : return updateEditorValue(uiState, action);
    default: return uiState;
  }
}
