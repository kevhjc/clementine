import { useState, useRef } from 'react';
import { supabase } from '../supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const input = useRef(null);

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
    } catch (error) {
      console.log(
        'Error handling login: ',
        error.error_description || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-40 px-4 font-mono">
      <div className="mx-auto max-w-7xl px-10">
        <div className="text-center">
          <p className="mt-2 text-3xl font-medium leading-8 tracking-tight sm:text-5xl">
            Let's get started
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-xl text-neutral-500 dark:text-neutral-300">
            Sign in via Magic Link with your email below
          </p>
        </div>
        <div className="flex justify-center">
          <div className="mt-12 w-3/4 rounded-lg border border-red-100 bg-red-50 p-4 duration-300 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
            <form className="relative my-1" action="#">
              <input
                ref={input}
                aria-label="Enter your email to be sent a Magic Link to login"
                placeholder="Enter your email..."
                type="text"
                required
                className={
                  'mt-1 block w-full rounded-lg bg-white px-4 py-3 pr-28 text-neutral-900 outline-none dark:bg-neutral-900/70 dark:text-neutral-200'
                }
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="absolute right-1 top-1 flex h-10 w-24 items-center justify-center rounded bg-red-500 px-4 font-sans font-medium text-white transition duration-150 ease-in-out hover:bg-red-600 dark:bg-red-700 dark:text-neutral-200"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin(email);
                }}
                disabled={loading}
              >
                {loading ? <span>Loading</span> : <span>Send</span>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
