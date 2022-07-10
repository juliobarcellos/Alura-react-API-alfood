import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [busca, setBusca] = useState('');
  const [ordena, setOrdena] = useState('');

  useEffect(() => {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => {
        console.log(erro)
      })
  }, []);

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(resposta => {
        setRestaurantes([...restaurantes, ...resposta.data.results])
        setProximaPagina(resposta.data.next)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  function pesquisar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const opcoes = {
      params: {
      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca
    }
    if (ordena) {
      opcoes.params.ordering = ordena
    }
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/', opcoes)
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
      })
  }

  return (<section className={style.ListaRestaurantes}>
    <form onSubmit={pesquisar} className={style.pesquisaRestaurante}>
      <label htmlFor='campoBusca'>Pesquisar:</label>
      <input type='search' id='campoBusca' className={style.campoBusca} value={busca} onChange={evento => setBusca(evento.target.value)} placeholder='digite o nome do restaurante ou prato que deseja pesquisar' />
      <label htmlFor='campoOrdena'>Ordenar Por:</label>
      <select id='campoOrdena' value={ordena} onChange={evento => setOrdena(evento.target.value)} className={style.campoOrdena}>
        <option value='id'>ID</option>
        <option value='nome'>Nome</option>
      </select>
    </form>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={verMais}>
      ver mais
    </button>}
  </section>)
}

export default ListaRestaurantes