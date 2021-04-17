export const updateCompanyQuery = `
    mutation updateCompany($_id: ID!, $company: CompanyInput!) {
        companyUpdate(_id: $_id, company: $company) {
        _id
        name
        }
    }
`