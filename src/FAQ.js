import React from 'react';
import logo from './assets/images/logo.png';
import './FAQ.scss';

function App() {
  return (
    <div className="Faq">
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
