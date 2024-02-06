import React from 'react';
import Container from 'react-bootstrap/Container';
import './App.scss';
import HotelsList from './components/HotelsList/HotelsList';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  return (
    <>
      <div className="App">
        <Header />
        <Container className="p-3">
          <HotelsList />
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default App;
