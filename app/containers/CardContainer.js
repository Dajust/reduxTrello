import React, {PropTypes, Component} from "react";
import Card from "../components/Card";

const CardContainerPropTypes = {
	listId      : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	id 	 				: PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	title       : PropTypes.string.isRequired,
	index : PropTypes.number.isRequired,
	listIndex : PropTypes.number.isRequired,
	description : PropTypes.string,
	showEditor  : PropTypes.func.isRequired,
	tasks       : PropTypes.array,
	curActiveCard : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	attributeToEdit : PropTypes.string.isRequired,
	curTaskEditing : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	currentEditorValue : PropTypes.string.isRequired,
	onChangeEditorValue : PropTypes.func.isRequired,
	onDeleteTask : PropTypes.func.isRequired,
	closeAllEditor : PropTypes.func.isRequired,
	shouldShowMenu  : PropTypes.bool.isRequired,
	onDeleteCard : PropTypes.func.isRequired,
	onToggleDoneTask : PropTypes.func.isRequired,
	shouldCloseAllEditor : PropTypes.bool.isRequired,
	openCardMenu  : PropTypes.func.isRequired,
	onSaveEdit  : PropTypes.func.isRequired,
	swapCardIndex : PropTypes.func.isRequired
};

class CardContainer extends Component {
	constructor (props) {
		super(props);
		this.state = {
			shouldShowDetails : false,
			menuPosition     : {}
		};
	}

	getPath () {
		return `${this.props.id}__${this.props.listId}`;
	}

	setmenuPosition(menuIcon) {
		// set position based on the clicked menu-icon position
		const
			iconPosition 	= menuIcon.getBoundingClientRect(),
			cardMenuWidth = 145 + 5,
			top  		 = iconPosition.top,
			leftPos  = iconPosition.right - cardMenuWidth,
			left 		 = leftPos < 0 ? 0 : leftPos
		;

		this.setState({
			menuPosition : {top : top, left : left}
		});
	}

	handleToggleShowDetails () {
		this.setState({
			shouldShowDetails : !this.state.shouldShowDetails
		});
	}

	handleShowEditor (event, attribute, previousVal, taskId) {
		event.stopPropagation();
		this.props.showEditor(attribute, previousVal, this.props.id, taskId);
		this.setState({shouldShowDetails  : true});
	}

	handleSaveEdit (e) {
		this.props.onSaveEdit(e, this.props.listId, this.props.id);
	}

	handleEditTitle (e) {
		this.handleShowEditor(e, "title", this.props.title);
	}

	handleEditDescription (e) {
		this.handleShowEditor(e, "description", this.props.description || "");
	}

	handleAddTask (e) {
		this.handleShowEditor(e, "addTask", "");
	}

	toggleShowMenu (menuIcon) {
		this.setmenuPosition(menuIcon);
		this.props.openCardMenu(this.props.id);
	}

	render () {
		const isCurActiveCard  = (this.props.curActiveCard === this.props.id),
					shouldShowMenu   = this.props.shouldShowMenu && isCurActiveCard,
					shouldShowEditor = !this.props.shouldCloseAllEditor && isCurActiveCard;

		return (
			<Card
				id                  = {this.props.id}
				title               = {this.props.title}
				tasks               = {this.props.tasks}
				index 							= {this.props.index}
				description         = {this.props.description}
				listId              = {this.props.listId}
				listIndex 					=	{this.props.listIndex}
				attributeToEdit     = {this.props.attributeToEdit}
				currentEditorValue  = {this.props.currentEditorValue}
				shouldShowDetails   = {this.state.shouldShowDetails}
				menuPosition        = {this.state.menuPosition}
				curTaskEditing      = {this.props.curTaskEditing}
				onChangeEditorValue = {this.props.onChangeEditorValue}
				onEditTitle         = {this.handleEditTitle.bind(this)}
				onAddATask          = {this.handleAddTask.bind(this)}
				onEditTask          = {this.handleShowEditor.bind(this)}
				onDeleteTask        = {this.props.onDeleteTask}
				onSaveEdit     			= {this.handleSaveEdit.bind(this)}
				onEditDescription   = {this.handleEditDescription.bind(this)}
				onToggleShowDetails = {this.handleToggleShowDetails.bind(this)}
				onToggleShowMenu    = {this.toggleShowMenu.bind(this)}
				onToggleDoneTask 		= {this.props.onToggleDoneTask}
				onDeleteCard     		= {this.props.onDeleteCard}
				shouldShowEditor    = {shouldShowEditor}
				shouldShowMenu      = {shouldShowMenu}
				curState 		        = {this.state}
				setState     				= {this.setState.bind(this)}
				swapCardIndex 			= {this.props.swapCardIndex}
				/>
		);
	}
}

CardContainer.propTypes = CardContainerPropTypes;

// const draggableCard = DragSource(Types.CARD, dragSourceSpec, dragSourceCollect)(CardContainer);

export default CardContainer;
