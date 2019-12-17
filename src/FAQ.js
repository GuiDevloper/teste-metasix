import React from 'react';
import logo from './assets/images/logo.png';
import th from './assets/icons/th-solid.svg';
import signOut from './assets/icons/sign-out-alt-solid.svg';
import './FAQ.scss';

function App() {
  return (
    <div className="Faq">
      <nav className="nav">
        <div className="nav__logo--grow">
          <img src={logo} className="nav__logo" alt="logo" />
        </div>
        <ul className="nav__list">
          <li className="nav__list-item">
            <img src={th} className="nav__icon" alt="Módulos" />
            Módulos
          </li>
          <li className="nav__list-item">
            <img src={signOut} className="nav__icon" alt="signOut" />
            Log Out
          </li>
        </ul>
      </nav>
      <header className="Faq__header">
        <button className="Faq__btn">HOME</button>
        <button className="Faq__btn Faq__btn--active">FAQ</button>
        <button className="Faq__btn">LOCAIS</button>
        <button className="Faq__btn">CATEGORIAS</button>
      </header>
    </div>
  );
}

export default App;
