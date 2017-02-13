import React,{PropTypes, Component} from "react";
import HTML5Backend from "react-dnd-html5-backend";
import {DragDropContext} from "react-dnd";

const BoardPropTypes = {
	children : PropTypes.node.isRequired,
};

class Board extends Component {
	render () {
		return(
			<div className="app-board-container">
				<div className="app-board">
					{this.props.children }
				</div>
			</div>
		);
	}
}

Board.propTypes = BoardPropTypes;

const dragDropEnabledBoard = DragDropContext(HTML5Backend)(Board);

export default dragDropEnabledBoard;
