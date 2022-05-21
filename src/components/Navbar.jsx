import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <Link className='logoLink' to='/'>
            MMDB
          </Link>
          <div>My Movie Database</div>
        </div>
        <form className='searchForm'>
          <input id='searchInput' type='text'></input>
          <FontAwesomeIcon className='searchBtn' icon={faSearch} />
        </form>
        <ul className='linkContainer' style={collapsible}>
          <li className='navlink'>
            <Link to='/'>Home</Link>
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
