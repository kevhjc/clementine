import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';

import { UserContext } from './context/UserContext';
import CommandPalette from './components/CommandPalette';
import Navigation from './components/Navigation';
import Intro from './components/Intro';
import Auth from './components/Auth';
import Home from './components/Home';
import LearnMore from './components/LearnMore';
// import Footer from './components/Footer';

function App() {
  const [session, setSession] = useState(supabase.auth.session());

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);

  return (
    <UserContext.Provider value={session}>
      <CommandPalette>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Intro />} />
            <Route path="signin" element={<Auth />} />
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