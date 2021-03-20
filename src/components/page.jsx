import React from 'react';
import { NavLink } from 'react-router-dom';

import Contents from './content.jsx';

function NavBar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {' | '}
      <NavLink to="/jobs">Jobs List</NavLink>
    </nav>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Contents />
    </div>
  );
}