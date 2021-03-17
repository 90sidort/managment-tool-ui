import React from 'react';

import Contents from './content.jsx';

function NavBar() {
  return (
    <nav>
      <a href="/">Home</a>
      {' | '}
      <a href="/#/jobs">Jobs List</a>
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