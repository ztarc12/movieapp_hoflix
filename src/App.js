import './App.css';
import Menu from './component/menu/Menu';
import Banner from './component/banner/Banner';
import Search from './component/search/Search';
import Detail from './component/detail/Detail';

import { HashRouter as Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Menu></Menu>
      <Routes>
        <Route path='/' element={<Banner/>}></Route>
        <Route path='/movieapp_hoflix' element={<Banner/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route path='/detail/:id' element={<Detail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;