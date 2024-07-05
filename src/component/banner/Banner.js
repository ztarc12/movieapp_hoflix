import './banner.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import useMoiveData from '../../useMoiveData';
import { useNavigate } from 'react-router-dom';

function Banner(){
  const navigate = useNavigate()
  const { trendMovies } = useMoiveData()

  const imgUrl = `https://image.tmdb.org/t/p/original${trendMovies.backdrop_path}`

  const DetailPage = (id) => {
    navigate(`/detail/${id}`)
  }

  return(
    <div className="banner" style={{backgroundImage :`url(${imgUrl})`}}>
      <div>
        <div className='bannerInfo'>
          <h2>금주의 영화 TOP 20</h2>
          <h1>{trendMovies.title}</h1>
          <button className='infoBtn' onClick={()=>{DetailPage(trendMovies.id)}}>
            <FontAwesomeIcon icon={faCircleInfo} /> 자세히 보기
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner