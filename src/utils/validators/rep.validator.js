const validateEmail =  function(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) return true
    else return false
}

const validatePhone = function(phone) {
    if(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone)) return true
    else return false
}

export default function(rep){
    const error = {};
    if (rep.name.length <= 0 || rep.name.length > 150) error.name = "Name must be at least 1 character long and shorter than 150 characters!";
    if(!validateEmail(rep.email) || rep.email.length > 250 ) error.email = "Invalid email. Check format and length (250 chars max)!";
    if(!validatePhone(rep.phone)) error.phone = "Invalid phone number. Check format and length. Type number without spaces!";
    return error
}