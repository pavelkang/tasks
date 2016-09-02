import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Layout from "./components/Layout";
import TimeSelector from "./components/TimeSelector";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#3b5998',
  }
});

class App extends React.Component {
  render() {

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Layout/>
      </MuiThemeProvider>
    )
  }
}

const app = document.getElementById('app');
ReactDOM.render(<App/>, app);
