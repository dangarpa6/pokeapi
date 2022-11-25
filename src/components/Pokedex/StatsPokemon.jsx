import React from 'react'


const StatsPokemon = ({infoStat}) => {
  return (

    <div className='stats'>
    <li>
        <p>{infoStat.stat.name} </p>
        <h3>{infoStat.base_stat} </h3>
    </li>
    </div>
  )
}

export default StatsPokemon