import React, { Component } from 'react';
import _ from 'lodash';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import solids from '@fortawesome/fontawesome-free-solid';
import 'bulma/css/bulma.css';
import './App.css';

fontawesome.library.add(solids);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onRemoveUser = this.onRemoveUser.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
    this.onAnalyze = this.onAnalyze.bind(this);

    this.state = {
      queryUsers: [],
      userInput: null,
    };
  }

  getUserLists = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  };

  handleChange({ target }) {
    this.setState({
      userInput: target.value,
    });
  }

  onRemoveUser(userName) {
    const updateUsers = this.state.queryUsers;
    const index = updateUsers.indexOf(userName);
    if (index > -1) {
      updateUsers.splice(index, 1);
    }

    this.setState({
      queryUsers: updateUsers,
    });
  }

  onAddUser() {
    if (this.state.userInput === null || this.state.queryUsers.indexOf(this.state.userInput) > -1) {
      return;
    }

    const updateUsers = this.state.queryUsers;
    updateUsers.push(this.state.userInput);
    this.setState({
      queryUsers: updateUsers,
      userInput: '',
    });

    this.userInput.focus();
  }

  onAnalyze(){
    this.getUserLists()
      .then(
        res => this.setState({ response: res.express })
      )
      .catch(
        err => console.log(err)
      );
  }

  render() {
    const inputMap = [];
    _.map(this.state.queryUsers, (user) => {
      inputMap.push(
        <a className="panel-block">
          {user}
          <div className="delete_user" onClick={() => { this.onRemoveUser(user); }}>
            <FontAwesomeIcon icon="times-circle" />
          </div>
        </a>,
      );
    });

    return (
      <div id="input_page">
        <div className="input_header">
          <div className="select">
            <select>
              <option>My Anime List</option>
              <option disabled>Coming Soon!</option>
            </select>
          </div>
          <input
            className="input"
            type="text"
            placeholder="User Name"
            id="username_input"
            value={this.state.userInput}
            onChange={this.handleChange}
            ref={(input) => { this.userInput = input; }}
          />
          <a className="button is-link" onClick={() => { this.onAddUser(); }}>
            <span className="icon is-small">
              <FontAwesomeIcon icon="plus" />
            </span>
          </a>
        </div>
        <br />
        <div className="input_body">
          <nav className="panel">
            <p className="panel-heading">
              Query Users
            </p>
            {inputMap}
          </nav>
        </div>
        <br />
        <div className="input_footer">
          <a className="button is-link" id="next_button" onClick={() => { this.onAnalyze(); }}>
            Analyze
            <span className="icon is-small" id="next_arrow">
              <FontAwesomeIcon icon="angle-right" />
            </span>
          </a>
        </div>
      </div>
    );
  }
}

//TODO:
// tab -> + -> analyze
// enter hit + default
// fade in users on add
// black borders
// icon and title
// grey out analyze until 2 users