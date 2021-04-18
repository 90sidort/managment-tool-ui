const currencyList = ['GBP', 'EUR', 'PLN']

export default function(job) {
    const error = {}
    const {
        company,
        location,
        representative,
        currency,
        description,
        title,
        personel,
        rate,
        start,
        end
    } = job

    if (company.length !== 24) error.company = "Invalid company!"
    if (location.length !== 24) error.location = "Invalid location!"
    if (representative.length !== 24) error.representative = "Invalid representative!"
    if (!currencyList.includes(currency)) error.currency = "Invalid currency!"
    if (description.length < 10 || description.length > 1500) error.description = "Description cannot be shorter than 10 characters and longer than 1500!"
    if (title.length < 5 || title.length > 300) error.title = "Title cannot be shorter than 5 characters and longer than 300!"
    if (personel < 1 || personel > 200 || !personel) error.personel = "Personel cannot be smaller than 1 and greater than 200!"
    if (rate < 8 || rate > 500 || !rate) error.rate = "Rate cannot be smaller than 8 and greater than 500!"
    if (!start instanceof Date || isNaN(start)) error.start = "Invalid value for start!"
    if (!end instanceof Date || isNaN(end)) error.end = "Invalid value for end!"
    return error
}