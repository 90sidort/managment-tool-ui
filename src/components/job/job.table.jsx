import JobRow from "./job.row"

export default function JobTable(props) {
    const jobRows = props.jobs.map((job) => <JobRow job={job} key={job._id} />);
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Personel</th>
            <th>City</th>
            <th>Address</th>
            <th>Country</th>
            <th>Company</th>
            <th>Status</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>{jobRows}</tbody>
      </table>
    );
  }