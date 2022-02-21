import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';

import { UserContext } from './context/UserContext';
import { SessionContext } from './context/SessionContext';
import CommandPalette from './components/CommandPalette';
import Navigation from './components/Navigation';
import Intro from './components/Intro';
import Auth from './components/Auth';
import Home from './components/Home';
import LearnMore from './components/LearnMore';
import NotFound from './components/NotFound';

export default function App() {
  const [user, setUser] = useState(supabase.auth.user());
  const [session, setSession] = useState(supabase.auth.session());

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(`Supbase auth event: ${_event}`);
      setSession(session);
      setUser(session?.user ?? null);
    });
  }, [user, session]);

  return (
    <SessionContext.Provider value={session}>
      <UserContext.Provider value={user}>
        <CommandPalette>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<Intro />} />
              <Route path="signin" element={<Auth />} />
              {session ? (
                <Route path="home" element={<Home />} />
              ) : (
                <Route path="home" element={<Auth />} />
              )}
              <Route path="/category/:id" />
              <Route path="learn-more" element={<LearnMore />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CommandPalette>
      </UserContext.Provider>
    </SessionContext.Provider>
  );
}
