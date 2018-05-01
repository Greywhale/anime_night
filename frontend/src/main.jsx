import React, { Component } from 'react';
import MainQuery from './main_query.jsx';
import MainResults from './main_results.jsx';

export default class Main extends Component {
    constructor(props) {
      super(props);

      this.state = {
        userList: {}
      };
    }

    setUserList = (newUserList) => {
      this.setState({
        userList: newUserList,
      });
    }

    render() {
      if(Object.keys(this.state.userList).length > 0) {
        return <MainResults userList={this.state.userList} />;
      }
      
      return <MainQuery setUserList={this.setUserList} />;
    }
}