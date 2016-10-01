import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import ContentSort from 'material-ui/svg-icons/content/sort';

const style={
  border: '1px solid #ccc',
  cursor: 'text',
  minHeight: 80,
  padding: 10,
  backgroundColor: '#eee',
}

export default class DescEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
  }

  onChange(editorState) {
    console.log(editorState);
    this.setState({editorState});
  }

  focus() {
    this.refs.editor.focus();
  }

  render() {
    const {editorState} = this.state;
    return (
      <div>
      <div style={style} onClick={this.focus.bind(this)}>
        <ContentSort/>
        <Editor editorState={this.state.editorState} onChange={this.onChange.bind(this)} ref='editor'/>
      </div>
      </div>
    )
  }
}
