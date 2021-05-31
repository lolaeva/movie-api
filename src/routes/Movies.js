import React from 'react'
import {
  Link,
} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
// import SingleMovie from './SingleMovie'

const Movies = (props) => {
  
  // const [ singleMovie, setSingleMovie ] = useState({})

  // const bd = movies[0]
  // console.log(bd)
  // const background_style = {
  //   backgroundImage: `url(https://image.tmdb.org/t/p/original/${bd})`,
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center center',
  //   backgroundRepeat: 'no-repeat',
  // }
  console.log('MOVIES', props.movies)
  return (
    <section className="content content-m">
      {/* <div >
        <h2>{ (movies[0]).title }</h2>
        <p>{ (movies[0]).overview }</p>
      </div> */}
        {props.movies.map(movie => (
          <div key={movie.id} className="content-m_item">
            <div className="content-m_item__main">              
              <Link to={`/movies/${movie.id}`} onClick={() => props.setId(movie.id)}>
                <img className="content-m_item__poster"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt="">
                </img>
              </Link>
            </div>
              <div className="content-m_item__info">
                <div className="content-m_item__title">
                  {movie.title}
                </div>
                <div className="content-m_item__text">
                  <FontAwesomeIcon icon={faStar} />
                    {movie.vote_average} | {movie.release_date}
                </div>
              </div>
            </div>
        ))}
    </section>
  )
}

export default Movies