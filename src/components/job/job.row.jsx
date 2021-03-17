import React from 'react';

export default function JobRow(props) {
    const job = props.job;
    return (
      <tr>
        <td><a href={`/#/details/${job._id}`}>{job.title}</a></td>
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