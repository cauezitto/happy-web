import React from 'react';

import './style.css'

interface HeaderProps{
    title: string,
    count: number
}

const HeaderDashboard = ({title, count}:HeaderProps) => {
  return (
    <header id = 'header-dashboard' >
        <h1>
            {title}
        </h1>

        <span style = {{
          visibility: count > 0? 'visible' : 'hidden'
        }} >
            {count} {count > 1 ? 'orfanatos': 'orfanato'}
        </span>
    </header>
  )
}

export default HeaderDashboard;