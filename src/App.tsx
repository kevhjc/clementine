import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabase';

import * as ROUTES from './constants/routes';

import { SessionContext } from './context/SessionContext';

import CommandPalette from './components/CommandPalette';
import Navigation from './components/Navigation';
import IntroPage from './pages/IntroPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import NoteEntryPage from './pages/NoteEntryPage';
import LearnMorePage from './pages/LearnMorePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

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
            <Route index element={<IntroPage />} />
            <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
            {session ? (
              <Route path={ROUTES.HOME} element={<HomePage />} />
            ) : (
              <Route path={ROUTES.HOME} element={<SignInPage />} />
            )}
            <Route path={ROUTES.ENTRIES} element={<NoteEntryPage />} />
            <Route path={ROUTES.NEW_ENTRY} element={<HomePage />} />
            <Route path={ROUTES.LEARN_MORE} element={<LearnMorePage />} />
            <Route
              path={ROUTES.PRIVACY_POLICY}
              element={<PrivacyPolicyPage />}
            />
            <Route path={ROUTES.TERMS_OF_SERVICE} element={<TermsPage />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CommandPalette>
    </SessionContext.Provider>
  );
};

export default App;
