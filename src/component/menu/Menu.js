import { Link } from 'react-router-dom'
import './menu.css'
import { useEffect, useState } from 'react'

function Menu(){
  const [scrolled, setScrolled] = useState(false);

  useEffect(()=>{
    const userScroll = () => {
      if(window.scrollY > 0) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }


    window.addEventListener('scroll', userScroll)
    return ()=>{
      window.addEventListener('scroll', userScroll)
    }
  }, [])
  return (
    <nav className={scrolled ? 'mainMenu scrolled' : 'mainMenu'}>
      <div className='menuBox'>
        <Link to={'/'} className='logoBox'>
          <img src={`${process.env.PUBLIC_URL}/Logo.svg`}></img>
        </Link>
        <ul className='subMenu'>
          <li><Link to={'/search'} className='moreBtn'>영화 더 보기</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Menu