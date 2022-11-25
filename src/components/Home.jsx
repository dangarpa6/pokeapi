import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import './styles/home.css'
import pokeball from '../assets/Pictures/pokeball.png'


const Home = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const inputValue = e.target.name.value.trim()

    if (inputValue.length !== 0) {
      dispatch(setNameTrainer(inputValue))
      navigate('/pokedex')
    }

    e.target.name.value = ''

  }



  return (
    <div className='home-container'>

      <div>
        <img src="" alt="" />
      </div>

      <section className='cardd'>
        <sec className='pic-cont'>
          <img className='pic' src={pokeball} alt="" />
        </sec>
        <h1>Hi trainer</h1>
        <p>To Start give me your trainer name </p>

        <form onSubmit={handleSubmit}>
          <input className='input-home' id='name' type="text" />
          <button className='button-catch'>Catch them all</button>
        </form>
      </section>
    </div>
  )
}

export default Home