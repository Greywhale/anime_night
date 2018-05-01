import React, { Component } from 'react';
import _ from 'lodash';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import solids from '@fortawesome/fontawesome-free-solid';
import 'bulma/css/bulma.css';
import './main_results.css';

fontawesome.library.add(solids);

export default class Main_Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <button value="Something" />
    );
  }
}