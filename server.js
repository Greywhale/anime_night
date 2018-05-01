const path = require('path');
const url = require('url');
const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const {parseString} = require('xml2js');
const _ = require('lodash');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const userList = {};

app.get('/populateUsers', (req, res) => {
  const inputValues = req.query.user;
  const requests = inputValues.map(userName => {
    const callPath = 'http://myanimelist.net/malappinfo.php?u='+userName+'&status=all&type=anime';
    const options = {
      uri: callPath,
    };
    return request.getAsync(options);
  });

  Promise.all(requests).then(responses => {
    for(let i = 0; i < responses.length; i++) {
      const content = responses[i].body;
      parseString(content, function (err, result) {
        const sortedAnime = parseAnimeXML(result['myanimelist'].anime);
        userList[inputValues[i]] = sortedAnime;
      });
    }
    const planList = createJointPlanList();
    res.send({ planList: planList });
  });
  
});

app.listen(port, () => console.log(`Listening on port ${port}`));

function parseAnimeXML(allAnime) {
  const sortedAnime = {};

  const statusWatching = '1';
  const statusComplete = '2';
  const statusOnHold = '3';
  const statusDropped = '4';
  const statusPlan = '6';

  const animeWatching = _.filter(allAnime, {'my_status': [statusWatching]});
  const animeComplete = _.filter(allAnime, {'my_status': [statusComplete]});
  const animeOnHold = _.filter(allAnime, {'my_status': [statusOnHold]});
  const animeDropped = _.filter(allAnime, {'my_status': [statusDropped]});
  const animePlan = _.filter(allAnime, {'my_status': [statusPlan]});

  sortedAnime['watching'] = animeWatching;
  sortedAnime['completed'] = animeComplete;
  sortedAnime['onHold'] = animeOnHold;
  sortedAnime['dropped'] = animeDropped;
  sortedAnime['plan'] = animePlan;

  return sortedAnime;
}

function createJointPlanList() {
  let jointPlanList = {};
  const theRestList = {};

  for(const user in userList) {
    const userObj = userList[user];
    const indivPlanList = userObj.plan;
    for(const indivAnime in indivPlanList){
      jointPlanList[indivPlanList[indivAnime].series_title] = "";
    }

    const keyArray = ['watching', 'completed', 'onHold', 'dropped'];
    for(const index in keyArray) {
      const inspectList = userObj[keyArray[index]];
      for(const indivAnime in inspectList){
        theRestList[inspectList[indivAnime].series_title] = "";
      }
    }
  }

  const finalPlanList = _.pickBy(jointPlanList, (value, key) => {
    return theRestList[key]  === undefined
  });

  return finalPlanList;
}