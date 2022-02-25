import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

import * as ROUTES from './constants/routes';

import { SessionContext } from './context/SessionContext';

import CommandPalette from './components/CommandPalette';
import Navigation from './components/Navigation';
import Intro from './components/Intro';
import SignIn from './components/SignIn';
import Home from './components/Home';
import EntryItemView from './components/EntryItemView';
import LearnMore from './components/LearnMore';
import NotFound from './components/NotFound';

const App = () => {
  const [session, setSession] = useState(supabase.auth.session());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(`Supabase auth event: ${_event}`);
      setSession(session);
    });
  }, [session]);

  useEffect(() => {
    if (session && location.pathname === '/signin') {
      return navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionContext.Provider value={session}>
      <CommandPalette>
        <Routes>
          <Route path={ROUTES.ROOT} element={<Navigation />}>
            <Route index element={session ? <Home /> : <Intro />} />
            <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
            {session ? (
              <Route path={ROUTES.HOME} element={<Home />} />
            ) : (
              <Route path={ROUTES.HOME} element={<SignIn />} />
            )}
            <Route path={ROUTES.ENTRIES} element={<EntryItemView />} />
            <Route path={ROUTES.NEW_ENTRY} element={<Home />} />
            <Route path={ROUTES.LEARN_MORE} element={<LearnMore />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Route>
        </Routes>
      </CommandPalette>
    </SessionContext.Provider>
  );
};

export default App;
