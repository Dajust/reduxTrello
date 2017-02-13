import React, {PropTypes} from "react";
import Editor from "./Editor";

const AddListProptypes = {
  onClickAddAList : PropTypes.func.isRequired,
  onClickSaveList : PropTypes.func.isRequired,
  itemToEdit : PropTypes.oneOfType([PropTypes.string, PropTypes.number ]).isRequired,
	attributeToEdit  : PropTypes.string.isRequired
};
const AddList = (props) => {
  const showAddListEditor = props.itemToEdit === "board" && props.attributeToEdit === "new list";
  return(
    <div className="list-container">
      <div className="list">
        <div className= { showAddListEditor? "add-a-list-btn-container show-addlist-editor": "add-a-list-btn-container"}>
          {
            showAddListEditor ?
            <Editor
              textareaClass={"add-list"}
              placeholder="Add a list..."
              onClickSave={props.onClickSaveList} /> :
            <div onClick={props.onClickAddAList} className="add-a-list-btn">
              Add a list...
            </div>
          }
        </div>
      </div>
    </div>
  );
};

AddList.propTypes = AddListProptypes;

export default AddList;
