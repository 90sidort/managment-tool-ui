const initialJobs = [
  {
    id: 1,
    personel: 10,
    location: {
      id: 1,
      city: 'Gorzów Wielkopolski',
      address: 'Powstancow Slaskich 20',
      country: 'Poland',
      postcode: '66-400',
    },
    title: '10 zbieraczy jabłek',
    company: { id: 1, name: 'Jabłex' },
    start: '2021-03-01',
    end: '2021-03-31',
    status: 'New',
  },
  {
    id: 2,
    personel: 1,
    location: {
      id: 1,
      city: 'Gorzów Wielkopolski',
      address: 'Powstancow Slaskich 20',
      country: 'Poland',
      postcode: '66-400',
    },
    title: '1 kierownik zbierania jabłek',
    company: { id: 1, name: 'Jabłex' },
    start: '2021-03-01',
    end: '2021-03-31',
    status: 'New',
  },
];

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

class JobsFilter extends React.Component {
  render() {
    return <div>This is a placeholder for the jobs filter.</div>;
  }
}

function JobRow(props) {
  const job = props.job;
  return (
    <tr>
      <td>{job.title}</td>
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

function JobTable(props) {
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

class JobAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      companyValue: -1,
      representatives: [],
      locations: [],
    };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onCompanySelectedHandler = this.onCompanySelectedHandler.bind(this);
  }

  async loadRep(cid) {
    const query = `query getRep($cid: ID) {
      representative(cid: $cid) {
        _id
        cid
        email
        phone
        name
      }
    }`;
    const data = await graphQLFetch(query, { cid });
    if (data) {
      this.setState({ representatives: data.representative });
    }
  }

  async loadLoc(cid) {
    const query = `query getLocations($cid: ID) {
      location(cid: $cid) {
        _id
        cid
        city
        country
        address
        postcode
      }
    }`;
    const data = await graphQLFetch(query, { cid });
    if (data) {
      this.setState({ locations: data.location });
    }
  }

  createRepItems() {
    const options = [];
    const reps = this.state.representatives;
    for (let i = 0; i < reps.length; i++) {
      options.push(
        <option key={i} value={reps[i]._id}>
          {reps[i].name}, {reps[i].email}
        </option>
      );
    }
    return options;
  }

  createLocItems() {
    const options = [];
    const locs = this.state.locations;
    for (let i = 0; i < locs.length; i++) {
      options.push(
        <option key={i} value={locs[i]._id}>
          {locs[i].city}, {locs[i].country}, {locs[i].address}, {locs[i].postcode}
        </option>
      );
    }
    return options;
  }

  createCompItems() {
    const options = [];
    const comps = this.props.comp;
    for (let i = 0; i < comps.length; i++) {
      options.push(
        <option key={i} value={comps[i]._id}>
          {comps[i].name}
        </option>
      );
    }
    options.push(
      <option key={-1} value={-1} disabled>
        Select company
      </option>
    );
    return options;
  }

  onCompanySelectedHandler(e) {
    this.loadRep(e.target.value);
    this.loadLoc(e.target.value);
    this.setState({ companyValue: parseInt(e.target.value) });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const form = document.forms.jobAdd;
    const company = document.getElementById('company');
    const job = {
      title: form.title.value,
      personel: parseInt(form.personel.value),
      rate: parseFloat(form.rate.value),
      description: form.description.value,
      currency: form.currency.value,
      representative: form.representative.value,
      location: form.location.value,
      company: company.value,
      start: new Date(form.start.value),
      end: new Date(form.end.value),
      created: new Date(),
      status: 'New',
    };
    this.props.createJob(job);
    // form.assignee.value = "";
    // form.title.value = "";
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h3>Select company to add job</h3>
          <select
            name="company"
            id="company"
            defaultValue={-1}
            onChange={this.onCompanySelectedHandler}
          >
            {this.createCompItems()}
          </select>
        </div>
        {this.state.companyValue !== -1 && (
          <form name="jobAdd" onSubmit={this.onSubmitHandler}>
            <input type="text" name="title" placeholder="Title"></input>
            <input type="number" name="personel" placeholder="Personel" step="1"></input>
            <input type="number" name="rate" placeholder="Rate" step="0.01"></input>
            <input type="text" name="description" placeholder="Description"></input>
            <input type="text" name="currency" placeholder="Currency"></input>
            <select name="representative">{this.createRepItems()}</select>
            <select name="location">{this.createLocItems()}</select>
            <input type="date" name="start" />
            <input type="date" name="end" />
            <button>Add</button>
          </form>
        )}
      </React.Fragment>
    );
  }
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

class SkillAdd extends React.Component {
  constructor() {
    super();
    this.onSkillSubmitHandler = this.onSkillSubmitHandler.bind(this);
  }
  onSkillSubmitHandler(e) {
    e.preventDefault();
    const form = document.forms.skillAdd;
    const skill = {
      name: form.name.value,
    };
    this.props.createSkill(skill);
    form.name.value = '';
  }
  render() {
    return (
      <form name="skillAdd" onSubmit={this.onSkillSubmitHandler}>
        <input type="text" name="name" placeholder="skill" />
        <button>Add skill</button>
      </form>
    );
  }
}

class SkillList extends React.Component {
  constructor() {
    super();
    this.state = {
      skills: [],
    };
    this.createSkill = this.createSkill.bind(this);
  }

  componentDidMount() {
    this.loadSkills();
  }

  async loadSkills() {
    const query = `query {
      skill {
        _id
        name
      }
    }`;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    this.setState({ skills: result.data.skill });
  }

  async createSkill(skill) {
    const query = `mutation addNewSkill($skill: SkillInput!) { skillAdd(skill: $skill) {name _id}} `;

    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { skill } }),
    });
    const result = await response.json();

    this.loadSkills();
  }

  render() {
    return (
      <div>
        <h2>Skills</h2>
        <ul>
          {this.state.skills.map((skill) => (
            <li key={skill._id}>{skill.name}</li>
          ))}
        </ul>
        <SkillAdd createSkill={this.createSkill} />
      </div>
    );
  }
}

class JobList extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      companies: [],
    };
    this.createJob = this.createJob.bind(this);
  }

  componentDidMount() {
    this.loadData();
    this.loadCompany();
  }

  async loadData() {
    const query = `
    query {
      job {
        _id
        personel
        representative { name _id cid email phone}
        location { country address postcode city cid _id}
        title
        company {name}
        status
        start
        end
      }
    }
    `;
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ jobs: data.job });
    }
  }

  async loadCompany() {
    const query = `query {
      company {
        _id
        name
      }
    }`;
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ companies: data.company });
    }
  }

  async createJob(job) {
    const query = `mutation addNewJob($job: JobInput!) { jobAdd(job: $job) {title, _id}} `;

    const data = await graphQLFetch(query, { job });
    if (data) {
      this.loadData();
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Job Tracker</h1>
        <JobsFilter />
        <hr />
        <JobTable jobs={this.state.jobs} />
        <hr />
        <JobAdd createJob={this.createJob} comp={this.state.companies} />
        <hr />
        <SkillList />
      </React.Fragment>
    );
  }
}

const element = <JobList />;

ReactDOM.render(element, document.getElementById('contents'));
