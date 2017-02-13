import React    from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import appReducer from "./reducers/";
// import Immutable from "immutable";
// import MainContainer from "./containers/MainContainer";
import domainData from "./appModule/appModule";
import styles   from "./index.scss";styles;
import App      from "./components/App";

const initialState = {
  domainData,
  appState : {
    listCards : {// how cards are sorted inside lists - sorting matters here
      "0" : ["0", "1", "2"],
      "1" : ["3"],
      "2" : ["4"]
    },
    selectedCard : "ID_OF_CARD_IN_FOCUS",
    itemToEdit : "ID_OF_LIST_CARD_TASK_TO_EDIT",
    attributeToEdit : "EXAMPLE:_TITLE_DESCRIPTION_NEWLIST"
  },
  uiState : {
    cardMenuPosition : {},
    shouldShowCardMenu : false
  }
};

let store = createStore(appReducer, initialState);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
