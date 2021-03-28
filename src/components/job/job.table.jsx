import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Table,
} from 'react-bootstrap';

import JobRow from "./job.row.jsx"

export default function JobTable(props) {
    const jobRows = props.jobs.map((job) => <JobRow job={job} key={job._id} />);
    console.log(props.jobs);
    return (
      props.jobs.length > 0 ?
(      <Table bordered condensed hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Personel</th>
            <th>Country</th>
            <th>City</th>
            <th>Address</th>
            <th>Company</th>
            <th>Status</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>{jobRows}</tbody>
      </Table>
      ) : (<p>No jobs matching criteria found.</p>)
    );
  }