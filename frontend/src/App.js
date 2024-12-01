import './App.css';
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import BookEvent from "./pages/BookEvent";
import EventCategory from "./pages/EventCategory";
import Events from "./pages/Events";
import Cart from './pages/Cart'
import LoginSignup from "./pages/LoginSignup";
import Footer from './components/Footer/Footer';
import sports_banner from "./assets/sports_banner.jpeg";
import technical_banner from "./assets/technical_banner.jpeg";
import cultural_banner from "./assets/cultural_banner.png";
import competition_banner from "./assets/competition_banner.jpeg";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<BookEvent/>}/>
        <Route path='/technical' element={<EventCategory banner={technical_banner} category="Technical"/>}/>
        <Route path='/cultural' element={<EventCategory banner={cultural_banner} category="Cultural"/>}/>
        <Route path='/competitions' element={<EventCategory banner={competition_banner} category="Competition"/>}/>
        <Route path='/sports' element={<EventCategory banner={sports_banner} category="Sports"/>}/>
        <Route path='/events' element={<Events />} />
        <Route path='/events/:eventId' element={<Events />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
