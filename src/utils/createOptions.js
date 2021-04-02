import React from 'react'

export const createOptions = function(name, element) {
    const options = [];
    const optionArr = element
    for (let i = 0; i < optionArr.length; i++) {
      options.push(
        <option key={i} value={optionArr[i]._id}>
          {name === 'companies' && `${optionArr[i].name}`}
          {name === "skills" && `${optionArr[i].name}`}
          {name === 'rep' && `${optionArr[i].name}, ${optionArr[i].email}`}
          {name === 'loc' && `${optionArr[i].city}, ${optionArr[i].country}, ${optionArr[i].address}, ${optionArr[i].postcode}`}
        </option>
      );
    }
    if (name === "companies") {
      options.push(
        <option key={-1} value={-1} disabled>
          Select company
        </option>
      );
    }
    return options;
  }