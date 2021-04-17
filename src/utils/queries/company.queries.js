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