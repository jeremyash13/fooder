import React, { Component } from 'react'
import './App.css';

import {CssBaseline, Container} from '@material-ui/core/';
import Body from './components/Body';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <CssBaseline /> */}
        <Container className="App" maxWidth="xs">
          <Body className="body" />
        </Container>
      </React.Fragment>
    )
  }
}

