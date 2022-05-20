import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MyNavbar() {
  const [collapsible, setCollapsible] = useState({ right: '-100%' });

  function toggleMenu() {
    if (collapsible) {
      setCollapsible();
    } else {
      setCollapsible({ display: 'flex' });
    }
  }

  return (
    <nav>
      <div className='navContainer'>
        <div className='logo'>
          <Link to='/'>MMDB</Link>
        </div>
        <form className='searchForm'>
          <input id='searchInput' type='text'></input>
          <button>Search</button>
        </form>
        <ul className='linkContainer' style={collapsible}>
          <li className='navlink'>
            <a href='#!'>Home</a>
          </li>
          <li className='navlink'>
            <a href='#!'>Lists</a>
          </li>
          <li className='navlink'>
            <a href='#!'>Profile</a>
          </li>
        </ul>
        <div className='burger' onClick={toggleMenu}>
          <i className='fas fa-bars'></i>
        </div>
      </div>
    </nav>
  );
}
