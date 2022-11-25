import { useParams } from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './styles/Details.css'
import StatsPokemon from './Pokedex/StatsPokemon'

const PokemonDetails = () => {

  const [pokeInfo, setPokeInfo] = useState()
const {name} = useParams ()

useEffect(() => {
  const URL = `https://pokeapi.co/api/v2/pokemon/${name}/`
  axios.get(URL)
  .then(res => setPokeInfo(res.data))
  .catch(err=>console.log(err))
}, [])
  return (
    <div className={`full-container bg2-${pokeInfo?.types[0].type.name}`}>
    <div className="wrapper">
    <div className="img-logo">
    <img className='img-poke' src={pokeInfo?.sprites.other['home'].front_default} alt="" />
    </div>
    <h1>{pokeInfo?.name} </h1>
    <p>{pokeInfo?.types[0].type.name}<b></b></p>

    <p>Abilities: <b>{pokeInfo?.abilities[0].ability?.name}</b></p>

    <h3>Principal Moves:</h3>
    <div className="icons">
      <a href="#"> {pokeInfo?.moves[0].move.name} <i className="fab fa-facebook-square"></i></a>
      <a href="#"> {pokeInfo?.moves[1].move.name} <i className="fab fa-instagram"></i></a>
      <a href="#">{pokeInfo?.moves[2].move.name}<i className="fab fa-youtube"></i></a>
      <a href="#">{pokeInfo?.moves[3].move.name}<i className="fab fa-github-square"></i></a>
      <a href="#">{pokeInfo?.moves[4].move.name}<i className="fab fa-telegram"></i></a>
    </div>
    
    <div className="media-info">
      <ul  className='absolute-ul'>
        <li className='sta' >
        {
                            pokeInfo?.stats.map(stat => (
                                <StatsPokemon
                                    key={stat.stat.url}
                                    infoStat={stat}
                                />
                            ))
                        }
        </li>
      </ul>
    </div>


  </div>
  </div>

  
  )
}

export default PokemonDetails