import React from 'react';
import { Pokedex ,ListadoPokemon} from './componentes';
import { Container, Navbar , Nav } from 'react-bootstrap';
import {BrowserRouter as Router, Switch,Route, Link} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Navbar expand='lg' bg='primary' variant='dark' fixed='top'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Link className='nav-link' to='/'>Home</Link>
            <Link className='nav-link' to='/listado' >Listado</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
          <Switch>
            <Route path='/listado'>
                <ListadoPokemon/>
            </Route>
            <Route path='/'>
              <Pokedex/>
            </Route>
          </Switch>  
        
      </Container>
    </Router>
  );
}

export default App;
