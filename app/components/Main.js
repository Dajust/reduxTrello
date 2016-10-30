import React,{PropTypes} from "react";

const MainPropTypes = {
	children : PropTypes.node.isRequired,
	onBodyClick : PropTypes.func.isRequired
};

const Main = props => (
	<div className="root-comp" onClick={props.onBodyClick}>
		<header>
			<a href="https://github.com/Dajust/reacTrello" target="blank" className="source-code">Browse the Code</a>
			<h1 className="app-name">reacTrello</h1>
		</header>
		{props.children}
	</div>
);

Main.propTypes = MainPropTypes;

export default Main;
