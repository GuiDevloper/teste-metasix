import React, { useState } from 'react';
import {
  search, plus, edit, trash
} from './assets';
import './FAQ.scss';
import axios from 'axios';
import Header from './Header';

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
                <img className="Faq__icon" src={edit} alt="Editar Pergunta"></img>
              </td>
              <td>
                <img className="Faq__icon" src={trash} alt="Excluir Pergunta"></img>
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
      <Header></Header>
      <div className="Faq__title">
        <h2 className="Faq__h3">FAQ - Perguntas Frequentes</h2>
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
            <th className="Faq__th">Pergunta</th>
            <th className="Faq__th Faq__new-question">
              <img className="Faq__icon" src={plus} alt="Nova Pergunta"></img>
              Nova Pergunta
            </th>
            <th className="Faq__th">Ordem</th>
            <th className="Faq__th">Editar</th>
            <th className="Faq__th">Excluir</th>
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
