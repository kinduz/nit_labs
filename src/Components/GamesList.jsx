import { useSelector } from 'react-redux'
import GamesItem from './GamesItem'

const GamesList = ({deleteGame}) => {
  const games = useSelector(state => state.games.games)
  
  return (
    <div className="all__games d-flex center">
      {games.length ? games.map(game => {
        return <GamesItem deleteGame={deleteGame} game={game} key={game.id}/>
      }) : (
        <span className='empty__list'>Похоже, по данному запросу ничего не найдено :(</span>
      )}
    </div>
  )
}

export default GamesList