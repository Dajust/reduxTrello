import Board from "../components/Board";
import {connect} from "react-redux";

const mapStateToProps = ({domainData, appState}) => ({
	allLists   : domainData.lists.allLists,
	listByIds : domainData.lists.byId,
	listCards : appState.listCards
});

export default connect(mapStateToProps)(Board);
