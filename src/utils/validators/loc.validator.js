export default function(loc){
    const error = {};
    if (loc.address.length <= 0 || loc.address.length > 250) error.name = "Address must be at least 1 character long and shorter than 250 characters!";
    if (loc.postcode.length <= 0 || loc.postcode.length > 25) error.name = "Post code must be at least 1 character long and shorter than 25 characters!";
    if (loc.city.length <= 0 || loc.city.length > 250) error.name = "City must be at least 1 character long and shorter than 250 characters!";
    if (loc.country.length <= 0 || loc.country.length > 250) error.name = "Country must be at least 1 character long and shorter than 250 characters!";
    return error
}