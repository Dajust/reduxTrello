import React, {Component, PropTypes} from "react";

const EditorPropTypes = {
	value         : PropTypes.string.isRequired,
	textareaClass : PropTypes.string,
	placeholder   : PropTypes.string,
	shouldShowDelete  : PropTypes.bool,
	onChange      : PropTypes.func.isRequired,
	onDelete : PropTypes.func,
	onSaveEdit 		: PropTypes.func.isRequired
};

class Editor extends Component {
	componentDidMount() {
		const textarea = this.refs.textarea;
		textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight+"px";
		textarea.select(); textarea.focus();
	}

	render() {
		return (
			<div className="editor">
				<form>

					<div className="input-container">
						<textarea onChange={this.props.onChange}
											ref="textarea"
											className={this.props.textareaClass}
											value={this.props.value}
											placeholder={this.props.placeholder}
											onClick={(e)=>e.stopPropagation()}/>
					</div>
					<div className="controls">
						<div className="cancel" >Cancel</div>
						<button type="" onClick={this.props.onSaveEdit}>Save</button>
						{this.props.shouldShowDelete === true ? <div onClick={this.props.onDelete} className="delete">Delete</div> : undefined }
					</div>
				</form>
			</div>
		);
	}

}

Editor.propTypes = EditorPropTypes;

export default Editor;
