const validIndustries = ['Services', 'Agriculture', 'Manufacturing']

export default function(company){
    const error = {};
    console.log(company);
    if (company.name.length <= 0 || company.name.length > 150) error.name = "Name must be at least 1 character long and shorter than 150 characters!";
    if (!validIndustries.includes(company.industry)) error.industry = 'Invalid industry!';
    if (company.description.length < 5 || company.description.length > 500) error.description = "Description must be at least 5 characters long and shorter than 500 characters!";
    return error
}