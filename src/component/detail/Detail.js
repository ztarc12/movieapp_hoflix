import './detail.css'
// import '../detail/detail.css'/

import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import useMoiveData from '../../useMoiveData';

const API_KEY = 'c7a418fcba9e48127f7758a1e5cd1fe6'
const language = 'ko-KR'

function Detail(){
  const navigate = useNavigate()
  const {id} = useParams()
  const [movie, setMoive] = useState(null)
  const [movieGenre, setMovieGenre] = useState(null)
  const detailSimilerMovieImg = 'https://image.tmdb.org/t/p/original'
  const {similerMovies} = useMoiveData(id)

  const [mouseHover, setMouseHover] = useState(false)

  useEffect(()=>{
    const movieDetail = async ()=>{
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${language}`)
        const genre = response.data.genres
        setMoive(response.data)
        setMovieGenre(genre)
      } catch(error) {
        console.log('Error movie Detail', error)
      }
    }
    movieDetail()
  },[id])

  if(!movie) return null
  
  const mouseHoverIn = (movieId)=>{
    setMouseHover(movieId)
  }
  const mouseHoverOut = ()=>{
    setMouseHover(null)
  }
  const DetailPage = (id) => {
    // navigate(`/detail/${id}`)
    window.location.href = `/detail/${id}`
  }
  return(
    <section className="test">
      <div className='detailBox'>
        <div className='detailTopImg' style={{backgroundImage:`url(${detailSimilerMovieImg+movie.backdrop_path})`}}></div>
        <div className='detailInfo'>
          <div className='detailPoster' style={{backgroundImage:`url(${detailSimilerMovieImg+movie.poster_path})`}}></div>
          <div className='movieInfo'>
            <div>
              <h2>{movie.title}</h2>
              <p>{movie.release_date}</p>
              <div className='movieDetailGenre'>
              {
                movieGenre.map((genre)=>{
                  return (
                    <span key={genre.id}>{genre.name}</span>
                  )
                })
              }
              </div>
            </div>
            <div>
              <p>평점 : {Math.floor(movie.vote_average * 100) / 100}점</p>
            </div>
            <div className='movieOverview'>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
        <div className='similerMoive'>
          <div className='similerTitle'>
            <h1>비슷한 영화</h1>
          </div>
          <div className='allMovieBox similerMovieBox'>
            {
              similerMovies.length === 0 ? (
                <p>로딩 중...</p>
              ) : (
                similerMovies.map((similer)=>{
                  return (
                    <div className='card' key={similer.id} style={{backgroundImage:`url(${detailSimilerMovieImg+similer.poster_path})`}}>
                      <div className={`cardInner ${mouseHover === similer.id ? 'show':''}`} onMouseOver={()=>{mouseHoverIn(similer.id)}} onMouseOut={()=>{mouseHoverOut()}}>
                        <h3>{similer.title}</h3>
                        <p>{similer.release_date}</p>
                        <button onClick={()=>{DetailPage(similer.id)}}>자세히 보기</button>
                      </div>
                    </div>
                  )
                })
              )
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Detail