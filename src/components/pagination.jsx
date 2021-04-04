import React from 'react'
import { Button } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';

export default function(props) {
    console.log(props);
    const {pages, currentPage, changer} = props
    const paginator = []
    for(let i = 0; i < pages; i++) {
      paginator.push((
        <Button key={i} onClick={() => changer(i+1)}>
        {i+1}
      </Button>
      ))
    }
    return (
      <div>
        {paginator}
      </div>
    )
}