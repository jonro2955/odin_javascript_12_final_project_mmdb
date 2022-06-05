import { useEffect, useState, useContext } from 'react';
import { AppContext } from './contexts/AppContext';
import { Link } from 'react-router-dom';
import SearchResults from './SearchResults';

export default function Navbar() {
  const appContext = useContext(AppContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchInputValue, setSearchString] = useState();

  /*Toggle the mobile menu off when clicking anything that isn't the 
  burger button (.fa-bars)*/
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target.getAttribute('class') !== 'fas fa-bars') {
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
        </form>
        {/* Whenever searchInputValue state changes, <SearchResults/> will 
        get the new value and update itself. If the searchInputValue is an
        empty string, <SearchResults/> will make itself disappear*/}
        <SearchResults searchInputValue={searchInputValue} />
        <ul
          className='navLinksContainer'
          style={
            showMobileMenu
              ? { display: 'flex', right: '0' }
              : { right: '-100px' }
          }
        >
          <li className='noBullet' key='Home'>
            <Link style={{ textDecoration: 'none' }} to='/'>
              <h2 className='navlink'>Home</h2>
            </Link>
          </li>
          <li className='noBullet' key='Lists'>
            <Link style={{ textDecoration: 'none' }} to='/lists'>
              <h2 className='navlink'>Lists</h2>
            </Link>
          </li>
          <li className='noBullet' key='Login'>
            <Link style={{ textDecoration: 'none' }} to='/login'>
              <h2 className='navlink'>
                {appContext.user ? appContext.user.email : 'Login'}
              </h2>
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
