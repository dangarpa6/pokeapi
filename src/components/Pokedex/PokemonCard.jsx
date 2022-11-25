import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StatsPokemon from './StatsPokemon'
import { useNavigate } from 'react-router-dom'
import './style/pokemonCard.css'

const PokemonCard = ({ url }) => {

    const [pokemon, setPokemon] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleClick = () => navigate(`/pokedex/${pokemon.name}`)

    console.log(pokemon)

    return (
        <div className='container'>
            <article onClick={handleClick} className='card'>
                <header className={`card__header bg-${pokemon?.types[0].type.name}`}>
                    <img className='card__avatar' src={pokemon?.sprites.other["official-artwork"]
                    ["front_default"]} alt="" />
                </header>
                <section className='card__body'>
                    <h2 className= 'card__name' > {pokemon?.name} </h2>

                    <ul className='card__list-type'>
                        {
                            pokemon?.types.map(slot => (

                                <li className='card__item-type' key={slot.type.url}>{slot.type.name} </li>

                            ))
                        }
                    </ul>

                </section>


                <hr className='card__hr' />

                <footer className='card__footer'>
                    <ul className='card__list-stats'>
                        {
                            pokemon?.stats.map(stat => (
                                <StatsPokemon
                                    key={stat.stat.url}
                                    infoStat={stat}
                                />
                            ))
                        }
                    </ul>
                </footer>
            </article>
        </div>
    )
}

export default PokemonCard