import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';

const JobRow = withRouter(({ job, location: { search } }) => {
  const selectLocation = { pathname: `/jobs/${job._id}`, search };
  console.log(search, job);
  return (
      <LinkContainer to={selectLocation}>
        <tr>
          <td>{job.title}</td>
          <td>{job.personel}</td>
          <td>{job.location.country}</td>
          <td>{job.location.city}</td>
          <td>{job.location.address}</td>
          <td>{job.company.name}</td>
          <td>{job.status}</td>
          <td>{job.start.toDateString()}</td>
          <td>{job.end.toDateString()}</td>
        </tr>
      </LinkContainer>
  );
})

export default JobRow