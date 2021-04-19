export const updateCompanyQuery = `
    mutation updateCompany($_id: ID!, $company: CompanyInput!) {
        companyUpdate(_id: $_id, company: $company) {
            _id
            name
        }
    }
`

export const deleteCompanyQuery = `
    mutation deleteCompany ($_id: ID!) {
        companyDelete(_id: $_id) 
    }
`

export const createCompanyQuery = `
    mutation addCompany($company: CompanyInput!) {
        companyAdd(company: $company) {name description industry _id}
    }
`

export const createRepQuery = `
    mutation createRep($representative: RepresentativeInput! ){
        repAdd(representative: $representative) {
            _id
            cid
            name
            phone
            email
        }
    }
`

export const deleteRepQuery = `
    mutation deleteRep($_id: ID!) {
        representativeDelete(_id: $_id)
    }
`

export const updateRepQuery = `
    mutation repUpdate ($_id: ID!, $representative: RepresentativeInput!) {
        representativeUpdate(_id: $_id, representative: $representative) {
            _id
        }
    }
`

export const createLocQuery = `
    mutation createLocation($location: LocationInput!) {
        locationAdd(location: $location) {
            cid
            _id
            city
            address
            country
            postcode
        }
    }
`