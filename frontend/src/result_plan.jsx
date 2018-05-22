import React from 'react';
import 'bulma/css/bulma.css';
import './result_plan.css';

const Main_Results = ({planList}) => {
  const animeTable = [];
  for(const anime in planList){
    animeTable.push(
      <tr key={anime}>
      <td className="image_column">
        <img className="anime_img" alt="" src={planList[anime].picture[0]} />
      </td>
      <th>
        <span>
          {anime}
          <br />
          <a className="info_click" href="" onClick={() => {return false;}}> More Info >> </a>
        </span>
      </th>
      <td>{planList[anime].totalEpisodes}</td>
      </tr>
    );
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="image_header"></th>
          <th><abbr title="Name">Name</abbr></th>
           <th><abbr title="# of Episodes"># of Episodes</abbr></th>
        </tr>
      </thead>
      <tbody>
        {animeTable}
      </tbody>
    </table>
  );
}

export default Main_Results;
