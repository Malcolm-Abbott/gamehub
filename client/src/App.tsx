import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Home } from './Pages/Home/Home';
import { Favorites } from './Pages/Favorites/Favorites';
import { NotFound } from './Pages/NotFound/NotFound';
import { Genres } from './Pages/Genres/Genres';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} >
            <Route index element={<Home />} />
            <Route path="/genres/:genreId" element={<Genres />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
