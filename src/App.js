import GlobalStyle from './styles/GlobalStyle';
import { Container } from './styles';

import Orders from './components/Orders';
// import logo from './images/logo.svg';

function App() {
  return (
    <>
      <GlobalStyle/>
      <Container>
        <img src='' alt='Logo'/>

        <Orders/>
      </Container>
    </>
  );
}

export default App;
