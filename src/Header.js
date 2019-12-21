import React from 'react';
import { logo } from './assets';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__logo--grow">
          <img src={logo} className="header__logo" alt="logo" />
        </div>
        <ul className="header__list">
          <li className="header__list-item">
            <i className="header__icon fas fa-th"></i>
            Módulos
          </li>
          <li className="header__list-item">
            <i className="header__icon fas fa-sign-out-alt"></i>
            Log Out
          </li>
        </ul>
      </nav>
      <div className="header__btn-group">
        <button className="header__btn">HOME</button>
        <button className="header__btn header__btn--active">FAQ</button>
        <button className="header__btn">LOCAIS</button>
        <button className="header__btn">CATEGORIAS</button>
      </div>
    </header>
  );
}

export default Header;
