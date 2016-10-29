import React,{PropTypes} from "react";

const MainPropTypes = {
	children : PropTypes.node.isRequired,
	onBodyClick : PropTypes.func.isRequired
};

const Main = props => (
	<div className="root-comp" onClick={props.onBodyClick}>
		<header>
			<h1 className="app-name">Reactrello</h1>
		</header>
		{props.children}
	</div>
);

Main.propTypes = MainPropTypes;

export default Main;
