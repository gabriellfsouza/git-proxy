import React from 'react';
import logo from './assets/rocket.svg';
import astronaut from './assets/astronaut.svg';
import './App.css';
import UserList from './components/UserList';
import Container from './components/Container';

function App() {
  return (
    <div className="App">
      <Container>
        <UserList />
      </Container>
    </div>
  );
}

export default App;
