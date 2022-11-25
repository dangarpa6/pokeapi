import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from './Pokedex/PokemonCard'
import SearchInput from './Pokedex/SearchInput'
import SelectType from './Pokedex/SelectType'
import './styles/pokedex.css'
import './styles/pagination.css'
import pokelogo from '../assets/Pictures/pokelogo.png'


const Pokedex = () => {

  const [pokemons, setPokemons] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [optionType, setOptionType] = useState('All') //aqui esta el estado en el padre que viene del componente select type, donde se guarda la informacion.

  useEffect(() => {

    if (optionType !== 'All') {


      //Aqui se hace la logica de cuando el usuario quiere filtrar por tipo
      const URL = `https://pokeapi.co/api/v2/type/${optionType}/`
      axios.get(URL)
        .then(res => {
          const arr = res.data.pokemon.map(e => e.pokemon)
          setPokemons({ results: arr })
        })
        .catch(err => console.log(err))

    } else if (pokeSearch) {

      //Aqui se hace la logica cuando el usuario busca por el input
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`
      const obj = {
        results: [{ url }] //Esto es un arreglo que dentro del arreglo hay un objeto y ese objeto tiene una propiedad que se llama url
      }
      setPokemons(obj)

    } else {
      // Aquí se hace la lógica cuando el usuario quiere todos los pokemons
      const URL = 'https://pokeapi.co/api/v2/pokemon'
      axios.get(URL)
        .then(res => setPokemons(res.data))
        .catch(err => console.log(err))
    }

  }, [pokeSearch, optionType])

  const nameTrainer = useSelector(state => state.nameTrainer)

  const [page, setPage] = useState(1)
  const pokemonsPerPage = 12;
  const lastIndex = page * pokemonsPerPage;
  const firstIndex = lastIndex - pokemonsPerPage;
  const pokemonPaginated = pokemons?.results.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(pokemons?.results.length / pokemonsPerPage)

  const numbers = [];
  //Empezar ciclo en 1, que itere hasta que i sea menor (<) o igual
  //al total de paginas y que vaya sumando
  //luego que le agregue esa i a numbers
  for (let i = 1; i <= totalPages; i++) {
    numbers.push(i)
  }

  console.log(numbers)

  return (
    <div className='containerpokedex'>
      <headerpoke />
      <div className='up'>
        <div className='logo'>
          <img className='logoo' src={pokelogo}/>
        </div>
        <h2 className='welco'>Welcome {nameTrainer}, Catch them all  </h2>

        <SearchInput setPokeSearch={setPokeSearch} setOptionType={setOptionType} />
        <SelectType
          setOptionType={setOptionType}
          setPokeSearch={setPokeSearch}
        />
      </div>
      <div className='cards-container'>
        {
          pokemonPaginated?.map(pokemon => (
            <PokemonCard
              key={pokemon.url}
              url={pokemon.url}
            />
          ))
        }
        <div className='pagination-box'>
          <button onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >Previous page</button>

          <button className='pagination-numbers'>
            {/*por cada numero muestre un boton*/}
            {numbers.map(numbers => (
              <button onClick={() => setPage(numbers)}>{numbers}</button>
            ))}
          </button>

          <button onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >Next Page</button>
        </div>

      </div>
    </div>
  )
}

export default Pokedex