import React from 'react'

const Searchinput = ({setPokeSearch, setOptionType}) => {
const handleSubmit = e => {
    e.preventDefault() //sirve para al hacer un summit, apretar enter o apretar el boton no se recargue la pagina.
    setPokeSearch(e.target.searchText.value.trim().toLowerCase()) //Se agrga el trim para quitar los espacios vacios
    setOptionType('All')
    e.target.searchText.value = ""
}
//e.target

return (   
    <form onSubmit ={handleSubmit}>
        <input id= 'searchText' type="text" />
        <button>Search</button>
 
    </form>
)
}
export default Searchinput