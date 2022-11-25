import axios from 'axios'
import React, {useEffect, useState} from 'react'


const SelectType = ({optionType,setOptionType, setPokeSearch}) => {

const [listTypes, setListTypes] = useState()

useEffect(() => {

    const URL = 'https://pokeapi.co/api/v2/type'
    axios.get(URL)
    .then(res=>setListTypes(res.data.results))
    .catch(err=>console.log(err))


}, [])

const handleChange = e => {
    setOptionType(e.target.value) // Ese onchange de abajo se encarga de guardar en un estado el valor que esta en ese select puede ser all, fire, water
    setPokeSearch('')
  }

  return (
    <select value ={optionType} onChange={handleChange}> //para cambiar de una opcion a otra en cuanto a tipos de pokemon
     <option value="All">All pokemons</option>
     {
        listTypes?.map(type=>(
            <option value={type.name}>{type.name}</option>
        ))
     }
        </select>
  )
}

export default SelectType