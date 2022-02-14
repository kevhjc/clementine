import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Intro from './components/Intro';
import LearnMore from './components/LearnMore';
// import Container from './components/Container';

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Intro />} />
          <Route path='learn-more' element={<LearnMore />} />
          {/* <Container /> */}
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
