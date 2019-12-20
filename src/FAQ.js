import React, { useState } from 'react';
import {
  logo, th, signOut,
  search, plus, edit, trash
} from './assets';
import './FAQ.scss';
import axios from 'axios';

function Faq() {
  let [table, setTable] = useState([]);
  let [start, setStart] = useState(0);

  function getData() {
    axios({
      method: 'GET',
      url: 'https://poc.metasix.solutions/parse/classes/FAQ',
      headers: {
        "X-Parse-Application-Id": "br.com.metasix.poc"
      }
    }).then(tb => {
      setStart(1);
      setTable(tb.data.results);
    });
  }
  if (start === 0) getData();

  let [isDisplay, setDisplay] = useState(false);
  function loadData(table) {
    let displays = new Array(table.length).fill(false);
    return table.map((row, i) => {
      if (row.visible) {
        return (
          <React.Fragment key={row.objectId}>
            <tr className="Faq__tr-body" onClick={() => {
                displays[i] = !isDisplay[i];
                setDisplay(displays);
              }}>
              <td>{row.question}</td>
              <td></td>
              <td>{row.position}</td>
              <td>
                <img className="nav__icon" src={edit} alt="Editar Pergunta"></img>
              </td>
              <td>
                <img className="nav__icon" src={trash} alt="Excluir Pergunta"></img>
              </td>
            </tr>
            <tr className="Faq__tr-body" style={{
                display: isDisplay[i] ? 'table-row' : 'none'
              }}>
              <td className="Faq__answer">{row.answer}</td>
            </tr>
          </React.Fragment>
        )
      }
      return null;
    })
  }

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
      <div className="Faq__title">
        <h3 className="Faq__h3">FAQ - Perguntas Frequentes</h3>
        <input className="Faq__search" placeholder="Busque por termo..." onInput={(e) => {
            let val = e.target.value.trim().toLowerCase();
            if (val !== '') {
              setTable(table.filter((el, i) => {
                return el.question.toLowerCase().includes(val)
              }));
            } else {
              getData();
            }
          }}
        ></input>
        <button className="Faq__btn Faq__btn--active Faq__search-btn">
          <img className="Faq__search-icon" src={search} alt="search-icon"></img>
          Buscar
        </button>
      </div>
      <table className="Faq__table">
        <thead>
          <tr className="Faq__tr">
            <th>Pergunta</th>
            <th className="Faq__new-question">
              <img className="nav__icon" src={plus} alt="Nova Pergunta"></img>
              Nova Pergunta
            </th>
            <th>Ordem</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {loadData(table)}
        </tbody>
      </table>
    </div>
  );
}

export default Faq;
