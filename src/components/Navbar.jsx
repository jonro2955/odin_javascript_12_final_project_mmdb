import { useEffect, useState, useContext } from 'react';
import { AppContext } from './contexts/AppContext';
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchResults from './SearchResults';

export default function Navbar() {
  const appContext = useContext(AppContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchInputValue, setSearchString] = useState();

  /*Toggle mobile menu off when clicking anything that isn't fa-bars (burger)*/
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (
        e.target === document.querySelector('.fa-bars') ||
        e.target === document.getElementById('searchInput')
      ) {
        setShowMobileMenu(true);
      } else {
        setShowMobileMenu(false);
      }
    });
  }, []);

  return (
    <nav>
      <div className='navContainer'>
        <Link className='logoBox' to='/'>
          <div className='logoLink'>MMDB</div>
          <div className='logoText'>My Movie Database</div>
        </Link>
        <form className='searchForm'>
          <input
            className='searchInput'
            type='text'
            placeholder='Search'
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          ></input>
          {/* <FontAwesomeIcon className='searchIcon' icon={faSearch} /> */}
        </form>
        {/* Whenever searchInputValue state changes, <SearchResults/> will 
        get the new value and update itself*/}
        <SearchResults searchInputValue={searchInputValue} />
        <ul
          className='navLinksContainer'
          style={
            showMobileMenu
              ? { display: 'flex', right: '0' }
              : { right: '-100px' }
          }
        >
          <li className='navlink' key='Home'>
            <Link to='/'>Home</Link>
          </li>
          <li className='navlink' key='Lists'>
            <Link to='/lists'>Lists</Link>
          </li>
          <li className='navlink' key='Login'>
            <Link to='/login'>
              {appContext.user ? appContext.user.email : 'Login'}
            </Link>
          </li>
        </ul>
        <div
          className='burger'
          onClick={() => {
            setShowMobileMenu(!showMobileMenu);
          }}
        >
          <i className='fas fa-bars'></i>
        </div>
      </div>
    </nav>
  );
}
