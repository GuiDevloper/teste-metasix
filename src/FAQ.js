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
  // only gets data from API on first render
  if (start === 0) getData();

  let [isDisplay, setDisplay] = useState(false);
  function loadData(table) {
    // temp var to define show/hide answers
    let displays = new Array(table.length).fill(false);
    table.sort((a, b) => a.position - b.position);
    return table.map((row, i) => {
      if (row.visible) {
        return (
          <React.Fragment key={row.objectId}>
            <tr className="Faq__tr-body">
              <td className="Faq__first-td" onClick={() => {
                // show/hide this specific answer
                displays[i] = !isDisplay[i];
                setDisplay(displays);
              }}>
                {row.question}
              </td>
              <td></td>
              <td className="Faq__th--hide-m">{row.position}</td>
              <td className="Faq__th--hide-m">
                <img className="Faq__icon" src={edit} alt="Editar Pergunta"></img>
              </td>
              <td className="Faq__th--hide-m">
                <img className="Faq__icon" src={trash} alt="Excluir Pergunta"></img>
              </td>
            </tr>
            <tr className="Faq__tr-body" style={{
                display: isDisplay[i] ? 'table-row' : 'none'
              }}>
              <td className="Faq__answer">{row.answer}</td>
              <td className="Faq__td--show-m">
                <img className="Faq__icon Faq__icon--show-m" src={edit} alt="Editar Pergunta"></img>
                <img className="Faq__icon Faq__icon--show-m" src={trash} alt="Excluir Pergunta"></img>
              </td>
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
        <div className="Faq__search-container">
          <input className="Faq__search" placeholder="Busque por termo..." onInput={(e) => {
              let val = e.target.value.trim().toLowerCase();
              if (val !== '') {
                // filter questions with search terms
                setTable(table.filter((el) => {
                  return el.question.toLowerCase().includes(val)
                }));
              } else {
                // restart with data from API
                getData();
              }
            }}
          ></input>
          <button className="Faq__search-btn">
            <img className="Faq__icon Faq__search-icon" src={search} alt="search-icon"></img>
            BUSCAR
          </button>
        </div>
      </div>
      <table className="Faq__table">
        <thead>
          <tr className="Faq__tr">
            <th className="Faq__th Faq__first-th">Pergunta</th>
            <th className="Faq__th Faq__new-question">
              <img className="Faq__icon Faq__plus-icon" src={plus} alt="Nova Pergunta"></img>
              <p className="Faq__th--hide-m">Nova Pergunta</p>
            </th>
            <th className="Faq__th Faq__th--hide-m">Ordem</th>
            <th className="Faq__th Faq__th--hide-m">Editar</th>
            <th className="Faq__th Faq__last-th Faq__th--hide-m">Excluir</th>
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
