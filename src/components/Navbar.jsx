// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className='border-b border-4 shadow-xl md:flex md:items-center md:justify-between p-4 pb-0  md:pb-4'>
      {/* <!-- Logo text or image --> */}
      <div className='flex items-center justify-between mb-4 md:mb-0'>
        <h1 className='leading-none text-2xl text-grey-darkest font-bold'>
          <Link to='/'>MMDB</Link>
        </h1>
      </div>
      {/* <!-- END Logo text or image --> */}

      {/* <!-- Search field --> */}
      <form className='mb-4 w-full md:mb-0 md:w-1/4 '>
        <label className='hidden' htmlFor='search-htmlForm'>
          Search
        </label>
        <input
          className=' border-2 border-indigo-500/50  p-2 rounded-lg shadow-inner w-full'
          placeholder='Search movies'
          type='text'
        />
        <button className='hidden'>Submit</button>
      </form>
      {/* <!-- END Search field --> */}

      {/* <!-- Global navigation --> */}
      <nav>
        <ul className='list-reset md:flex md:items-center'>
          <li className='md:ml-4'>
            <a
              className='block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0'
              href='#!'
            >
              Products
            </a>
          </li>
          <li className='md:ml-4'>
            <a
              className='border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0'
              href='#!'
            >
              About
            </a>
          </li>
          <li className='md:ml-4'>
            <a
              className='border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0'
              href='#!'
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      {/* <!-- END Global navigation --> */}
    </header>
  );
}
