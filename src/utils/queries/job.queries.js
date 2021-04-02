export const jobListQuery = `query getJob(
  $_id: ID,
  $title: String,
  $currency: String,
  $status: String,
  $company: ID,
  $personMin: Int,
  $personMax: Int) {
  job(
    _id: $_id,
    title: $title,
    currency: $currency,
    status: $status,
    company: $company,
    personMin: $personMin,
    personMax: $personMax
  ) {
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
}`;

export const loadComapnyQuery = `query {
  company {
    _id
    name
  }
}`;

export const createJobQuery = `
mutation addNewJob($job: JobInput!) {
    jobAdd(job: $job) {title, _id}
}`;

export const deleteJobQuery = `
mutation deleteJob($_id: ID!) {
  jobDelete(_id: $_id)
}`;

export const loadReps = `query getRep($cid: ID) {
  representative(cid: $cid) {
    _id
    cid
    email
    phone
    name
  }
}`

export const loadLoc = `query getLocations($cid: ID) {
  location(cid: $cid) {
    _id
    cid
    city
    country
    address
    postcode
  }
}`;

export const updateJob = `
  mutation updateJob($_id: ID, $changes: JobInput!){
    updateJob(_id: $_id, changes: $changes) {
    title
    rate
    currency
  }
}`;

export const getJobQuery = `query getJob($_id: ID) {
  job(_id: $_id) {
    _id
    personel
    rate
    currency
    description
    skills {_id name}
    agent { name _id cid email phone}
    representative { name _id cid email phone}
    location { country address postcode city cid _id}
    title
    company {_id name}
    status
    start
    end
    created
  }
}`;