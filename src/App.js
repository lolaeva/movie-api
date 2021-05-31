import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  const [ movies, setMovies ] = useState([])
  const [ id, setId ] = useState()
  const [ singleMovie, setSingleMovie ] = useState({})

  const api_key = process.env.REACT_APP_API_KEY
  const url = 'https://api.themoviedb.org'

  useEffect(() => {
    axios
    .get(`${url}/3/movie/popular?api_key=${api_key}&language=en-US&page=1`)
      .then(response => {
        console.log(response.data.results)
        setMovies(response.data.results)
      })
  }, [])

  useEffect( () => {
    if( id ) {
      axios
      .get(`${url}/3/movie/${id}?api_key=${api_key}&language=en-US`)
        .then(response => {
          setSingleMovie(response.data)
        })
    }
  }, [id])

  
  const SingleMovie = ({ movie }) => {
    const bg = `https://image.tmdb.org/t/p/original/${singleMovie.backdrop_path}`
    const background_style = {
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    }
    console.log('SINGLE', singleMovie)

    return (
      <section className="content content-sm" style={background_style}>
        <div className="content content-sm__main">
          <div>
            <img className="content-sm__poster" src={`https://image.tmdb.org/t/p/original/${singleMovie.poster_path}`} ></img>
          </div>
          <div className="content-sm__info">
            <h2 className="content-sm__title">{ singleMovie.title }</h2>
            <div>
              <FontAwesomeIcon icon={faStar} />
              <span>  { singleMovie.vote_average } | </span>
              <span>{ singleMovie.release_date }</span>
            </div>
            <div>
              <h3>Overview</h3>
              <p>{ singleMovie.overview }</p>
              <p>{ singleMovie.tagline }</p>
              <div className="">{ singleMovie.genres.map(g => 
                <span> {g.name} </span>
              )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const Movies = () => {
    return (
      
        <div className="content content-m">
          {movies.map(movie => (
            <div key={movie.id} className="content-m_item">
              <div className="content-m_item__main">              
                <Link to={`/movies/${movie.id}`} onClick={() => setId(movie.id)}>
                  <img className="content-m_item__poster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} ></img>
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
        </div>
    )
  }

  const Home = () => {

    const background_style = movies[0] ? 
      {
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movies[0].backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      } : false
    if( movies[0] ) {
      return (
        <section className="movies">
          <div style={background_style} className="movies__background">
            <h1>{ (movies[0]).title }</h1>
            <p>{ (movies[0]).overview }</p>
          </div>
          <h1>Popular Movies</h1>
          <Movies />
        </section>
      )
    } else {
      return (
        <section className="movies">
          <h1>Popular Movies</h1>
          <Movies />
        </section>
      )
    }
  }

  const About = () => (
    <section className="content">
      <h2>ABOUT</h2>
    </section>
  )

  const match = useRouteMatch('/movies/:id')
  const movie = match ? movies.find(movie => movie.id === Number(match.params.id)) : null

  return (
    <div className="container">
      {/* <Router> */}
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/movies/:id">
            <SingleMovie movie={movie} />
          </Route>
        </Switch>
        <Footer />
      {/* </Router> */}
    </div>
    
  )

}


export default App