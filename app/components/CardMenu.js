import React, {PropTypes} from "react";

const cardMenuPropTypes = {
	listId : PropTypes.number.isRequired,
	cardId : PropTypes.number.isRequired,
	hasDescription 	  : PropTypes.bool.isRequired,
	onAddATask 				: PropTypes.func.isRequired,
	onEditTitle 			: PropTypes.func.isRequired,
	onEditDescription : PropTypes.func,
	onDeleteCard      : PropTypes.func.isRequired,
	menuPosition      : PropTypes.object.isRequired
};

const CardMenu = (props) =>(
	<div className="card-menu" style={props.menuPosition}>
		<div className="header">Card Actions</div>
		<hr/>
		<div className="action" onClick={props.onAddATask}>Add a task...</div>
		<div className="action" onClick={props.onEditTitle}>Edit title...</div>
		<div className="action" onClick={props.onEditDescription}>
			{props.hasDescription === true ? "Edit description..." : "Add description..."}
		</div>
		<div className="action" onClick={()=>{props.onDeleteCard(props.listId, props.cardId);}}>Delete card...</div>
	</div>
);

CardMenu.propTypes = cardMenuPropTypes;

export default CardMenu;
