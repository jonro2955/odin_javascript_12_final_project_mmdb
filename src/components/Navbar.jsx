import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function MyNavbar() {
  //on mount
  useEffect(() => {
    // Selection of HTML objects
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    // Defining a function
    function toggleNav() {
      burger.classList.toggle('fa-bars');
      burger.classList.toggle('fa-times');
      nav.classList.toggle('nav-active');
    }
    // Calling the function after click event occurs
    burger.addEventListener('click', function () {
      toggleNav();
    });
  }, []);

  return (
    <header>
      <h1 className='logo'>MMDB</h1>
      <ul className='nav'>
        <li className='navlink'>
          <a href='#!'>Home</a>
        </li>
        <li className='navlink'>
          <a href='#!'>About</a>
        </li>
        <li className='navlink'>
          <a href='#!'>Projects</a>
        </li>
        <li className='navlink'>
          <a href='#!'>Contact</a>
        </li>
      </ul>
      <div className='burger'>
        <i className='fas fa-bars'></i>
      </div>
    </header>
  );
}
