import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {closeEditor} from "../actions/";

class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value : props.initialValue
		};
	}

	componentDidMount() {
		const textarea = this.textarea;
		textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight+"px";
		textarea.select(); textarea.focus();
	}

	handleOnChange = () =>
		this.setState({value:this.textarea.value});

	handleOnKeyDown = (e) => {
		if (e.keyCode === 13) {
			this.props.onClickSave(this.state.value);
			this.props.dispatch(closeEditor());
		}
	}

	render() {
		return (
			<div className="editor">
				<form>
					<div className="input-container">
						<textarea onChange={this.handleOnChange}
											onKeyDown={this.handleOnKeyDown}
											ref={(textarea) => this.textarea = textarea}
											className={this.props.textareaClass}
											value={this.state.value}
											placeholder={this.props.placeholder}
											onClick={(e)=>e.stopPropagation()}/>
					</div>
					<div className="controls">
						<div className="cancel" >Cancel</div>
						<button type="" onClick={(e)=>{e.preventDefault();this.props.onClickSave(this.state.value);}}>Save</button>
						{this.props.shouldShowDelete && <div onClick={this.props.onClickDelete} className="delete">Delete</div>}
					</div>
				</form>
			</div>
		);
	}
}

Editor.propTypes  = {
	initialValue  : PropTypes.string,
	textareaClass : PropTypes.string,
	placeholder   : PropTypes.string,
	shouldShowDelete : PropTypes.bool,
	onClickDelete : PropTypes.func,
	dispatch : PropTypes.func,
	onClickSave 	: PropTypes.func.isRequired
};

Editor.defaultProps = {
	initiaValue : "",
	shouldShowDelete : false
};



export default connect(null, (dispatch) => ({dispatch}))(Editor);
