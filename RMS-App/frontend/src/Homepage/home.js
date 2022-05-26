import logo from '../logo.svg';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='App'>
      <img src={logo} className='App-logo' alt='logo' />
      <Container className='mt-2'>
        <Row>
          <Col lg='5' className='mx-auto'>
            <p className='lead'>
              Welcome to our Restaurant Crispy PanCake. We are the known for our
              best-service since our inception and we are committed for the best
              experience of our customers. We support online orders, orders on
              telephone and dine-in facility. Come taste our food.
            </p>
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col>
            <Link to='/menu' className='btn btn-primary'>
              {' '}
              List of matches
            </Link>{' '}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
