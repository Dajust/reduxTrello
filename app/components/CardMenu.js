import React, {PropTypes} from "react";

const cardMenuPropTypes = {
	// listId : PropTypes.number.isRequired,
	// cardId : PropTypes.number.isRequired,
	hasDescription 	  : PropTypes.bool.isRequired,
	onClickAddATask 				: PropTypes.func/*.isRequired*/,
	onClickEditTitle 			: PropTypes.func/*.isRequired*/,
	onClickEditDescription : PropTypes.func,
	onClickDeleteCard      : PropTypes.func/*.isRequired*/,
	menuPosition      : PropTypes.object/*.isRequired*/
};

const CardMenu = (props) =>(
	<div className="card-menu" style={props.menuPosition} onClick={(e)=>e.stopPropagation()}>
		<div className="header">Card Actions</div>
		<hr/>
		<div className="action" onClick={props.onClickAddATask}>Add a task...</div>
		<div className="action" onClick={props.onClickEditTitle}>Edit title...</div>
		<div className="action" onClick={props.onClickEditDescription}>
			{props.hasDescription === true ? "Edit description..." : "Add description..."}
		</div>
		<div className="action" onClick={props.onClickDeleteCard}>Delete card...</div>
	</div>
);

CardMenu.propTypes = cardMenuPropTypes;

export default CardMenu;
