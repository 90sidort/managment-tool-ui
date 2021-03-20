import React from 'react';
import { Link } from 'react-router-dom';

export default function JobRow(props) {
    const job = props.job;
    return (
      <tr>
        <td><Link to={`/details/${job._id}`}>{job.title}</Link></td>
        <td>{job.personel}</td>
        <td>{job.location.city}</td>
        <td>{job.location.address}</td>
        <td>{job.location.country}</td>
        <td>{job.company.name}</td>
        <td>{job.status}</td>
        <td>{job.start.toDateString()}</td>
        <td>{job.end.toDateString()}</td>
      </tr>
    );
  }