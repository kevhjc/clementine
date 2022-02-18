import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';

import { UserContext } from './context/UserContext';
import CommandPalette from './components/CommandPalette';
import Header from './components/Header';
import Intro from './components/Intro';
import Home from './components/Home';
import LearnMore from './components/LearnMore';
// import Footer from './components/Footer';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);

  return (
    <UserContext.Provider value={session}>
      <CommandPalette>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Intro />} />
            <Route path="home" element={<Home />} />
            <Route path="learn-more" element={<LearnMore />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </CommandPalette>
    </UserContext.Provider>
  );
}

export default App;
