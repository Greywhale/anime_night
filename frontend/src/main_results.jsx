import React, { Component } from 'react';
import ResultPlan from './result_plan.jsx';

export default class Main_Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planList: {},
    };
  }

  getPlanList = async () => {
    const fetchStr = "/jointPlanList";
    const response = await fetch(fetchStr);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  componentDidMount() {
    this.getPlanList()
      .then(res => {
        console.log(Object.keys(res.planList).length);
        this.setState({planList: res.planList});
      })
      .catch(
        err => console.log(err)
      );
  }

  //redesign later, this class should take in userList
  //onPlan call backend with userNames store animelist and pass it to planlist?
  render() {
    return (
        <ResultPlan planList={this.state.planList} />
    );
  }
}