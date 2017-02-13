import {combineReducers} from "redux";
import uiState from "./uiState";
import appState from "./appState";
import domainData from "./domainData";

export default combineReducers({domainData, appState, uiState});
