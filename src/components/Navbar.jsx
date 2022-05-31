import { useEffect, useState, useContext } from 'react';
import { MyContext } from './MyContext';
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MyNavbar() {
  const contextProps = useContext(MyContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target !== document.querySelector('.fa-bars')) {
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
          <input id='searchInput' type='text'></input>
          <FontAwesomeIcon className='searchBtn' icon={faSearch} />
        </form>
        <ul
          className='navLinksContainer'
          style={
            showMobileMenu
              ? { display: 'flex', right: '0' }
              : { right: '-100px' }
          }
        >
          <li className='navlink'>
            <Link to='/'>Home</Link>
          </li>
          <li className='navlink'>
            <Link to='/lists'>Lists</Link>
          </li>
          <li className='navlink'>
            <Link to='/login'>{contextProps.user ? contextProps.user.email : 'Login'}</Link>
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
