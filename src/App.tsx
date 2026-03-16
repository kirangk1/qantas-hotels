import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import HotelsList from './components/HotelsList/HotelsList';
import HotelDetails from './components/HotelDetails/HotelDetails';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Container className="p-3">
        <Routes>
          <Route path="/" element={<HotelsList />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
