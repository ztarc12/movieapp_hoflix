import './search.css'
import { useState } from 'react'
import useMoiveData from '../../useMoiveData'
import { useNavigate } from 'react-router-dom'

function Search() {
  const {popularMovies, genreListMovies, discoverMovies} = useMoiveData()
  const discoverMoviesImg = 'https://image.tmdb.org/t/p/original'
  const navigate = useNavigate()
  
  //마우스 이벤트
  const [selectGenre,setSelectGenre] = useState('')
  const clickGenreBtn = (genreId)=>{
    setSelectGenre(genreId)
  }

  const [mouseHover, setMouseHover] = useState(false)
  const mouseHoverIn = (movieId)=>{
    setMouseHover(movieId)
  }
  const mouseHoverOut = ()=>{
    setMouseHover(null)
  }
  const DetailPage = (id) => {
    navigate(`/detail/${id}`)
  }
  //장르 별 영화 출력
  const genreMovies = selectGenre
  ? discoverMovies.filter((movie) =>
      movie.genre_ids.includes(parseInt(selectGenre))
    )
  : discoverMovies;

  return (
    <section className='search'>
      <div className='genreTitle'>
        <h1 style={{color:'#fff'}}>장르별 영화 찾기</h1>
      </div>
      <div className='genreBtn'>
        <button onClick={()=>{clickGenreBtn('')}}>전체</button>
        {
          genreListMovies.map((genre)=>{
            return(
              <button className={selectGenre===genre.id ? 'active' : ''} onClick={()=>{clickGenreBtn(genre.id)}}>{genre.name}</button>
            )
          })
        }
      </div>
      <div className='allMovieBox'>
        {
          genreMovies.length === 0 ? (
            <p className='noData'>선택된 장르에 해당하는 영화가 없습니다.</p>
          ) : (
            genreMovies.map((movie)=>{ 
              return(
                <div key={movie.id} className='card' style={{backgroundImage:`url(${discoverMoviesImg+movie.backdrop_path})`}}>
                  <div className={`cardInner ${mouseHover === movie.id ? 'show':''}`} onMouseOver={()=>{mouseHoverIn(movie.id)}} onMouseOut={()=>{mouseHoverOut()}}>
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date}</p>
                    <button onClick={()=>{DetailPage(movie.id)}}>자세히 보기</button>
                  </div>
                </div>
              )
            })
          )
        }
      </div>
    </section>
  )
}

export default Search