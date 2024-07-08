import axios from "axios";
import { useEffect, useState } from "react";

const useMoiveData = (id)=>{
  const API_KEY = 'c7a418fcba9e48127f7758a1e5cd1fe6'
  const language = 'ko-KR'
  const trendDataUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=${language}`
  const popularDataUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}`
  const genreListDataUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${language}`
  const discoverDataUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
  const [trendMovies, setTrandMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [genreListMovies, setGenreMovis] = useState([])
  const [discoverMovies, setDiscoverMovies] = useState([])
  const [similerMovies, setSimilerMovies] = useState([])
  useEffect(()=>{
    const movieData = async ()=>{
      try {
        const trendDataResult = await axios.get(trendDataUrl)
        const popularDataResult = await axios.get(popularDataUrl)
        const genreListDataResult = await axios.get(genreListDataUrl)
        const discoverDataResult = await axios.get(discoverDataUrl)
        const trendData = trendDataResult.data.results
        const popularData = popularDataResult.data.results
        const genreListData = genreListDataResult.data.genres
        const discoverData = discoverDataResult.data.results

        setPopularMovies(popularData)
        setGenreMovis(genreListData)
        setDiscoverMovies(discoverData)

        // Banner 포스터
        const randomPoster = trendData[Math.floor(Math.random() * trendData.length)]
        setTrandMovies(randomPoster)

         // 비슷한 영화 / 영화 상세페이지
         if(id) {
          const similerDataUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=${language}`
          const similarDataResult = await axios.get(similerDataUrl)
          const similarData = similarDataResult.data.results
          setSimilerMovies(similarData)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    movieData()
  }, [id, API_KEY, language, trendDataUrl, popularDataUrl, genreListDataUrl, discoverDataUrl])
  return {trendMovies, popularMovies, genreListMovies, discoverMovies, similerMovies}
}

export default useMoiveData