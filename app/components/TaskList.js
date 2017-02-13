import React, {PropTypes} from "react";

const TaskListProptypes = {
	children : PropTypes.node.isRequired
};

const TaskList = props =>(
	<div className="check-list-container">
		<ul className="check-list">
			{ props.children }
		</ul>
	</div>
);

TaskList.propTypes = TaskListProptypes;

export default TaskList;
