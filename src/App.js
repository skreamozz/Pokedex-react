import React from 'react';
import { Pokedex ,ListadoPokemon} from './componentes';
import { Col, Container, Row} from 'react-bootstrap';
import { PokemonProvider } from './context/PokemonContext';

const Provider = () => {
  return (
  <PokemonProvider>
    <App></App>
  </PokemonProvider>
  )
}

const App = () => {
  return (
      <Container>
        <Row>
          <Col lg={5}>
            <Pokedex/>
          </Col>
          <Col lg={5}>
            <ListadoPokemon/>
          </Col>
        </Row>
        
        
 
        
      </Container>

  );
}

export default Provider;
