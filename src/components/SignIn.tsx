import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

import { validateEmail } from '../utils/validation';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [helperText, setHelperText] = useState<any>({
    error: null,
    text: null,
  });

  const [email, setEmail] = useState('');
  const input = useRef(null);

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const emailError = validateEmail(email);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { error } = await supabase.auth.signIn(
        { email: email }
        // {
        //   redirectTo: 'https://www.clementine.today/home',
        // }
      );
      setHelperText({
        error: false,
        text: 'Success! Check your email to sign in',
      });
      (document.getElementById('email') as HTMLInputElement).value = '';
      if (emailError || error)
        setHelperText({
          error: true,
          text: emailError,
        });
      console.log('Error signing in:', error);
    } catch (error) {
      setHelperText({
        error: true,
        text: 'Uh oh, something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-40 max-w-7xl px-10">
      <div className="text-center">
        <p className="mt-2 text-4xl font-bold leading-8 tracking-tight sm:text-5xl">
          Hey there 👋
        </p>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-xl text-neutral-500 dark:text-neutral-300">
          Sign in via Magic Link with your email
        </p>
      </div>
      <div className="flex justify-center">
        <div className="mt-12 w-full max-w-2xl rounded-lg border border-neutral-200/70 bg-neutral-50 p-4 duration-300 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800/60">
          <form className="relative my-1" action="#">
            <input
              id="email"
              ref={input}
              type={'email'}
              aria-label="Enter your email to be sent a Magic Link to login"
              placeholder="Email"
              required
              className={
                'mt-1 block w-full rounded-lg bg-white px-4 py-3 pr-28 text-neutral-900 outline-none dark:border-neutral-600 dark:bg-neutral-900/70 dark:text-neutral-200'
              }
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="absolute right-1 top-1 flex h-10 w-24 items-center justify-center rounded-md bg-orange-500 px-4 font-sans font-medium text-white transition duration-150 ease-in-out hover:bg-orange-600 dark:bg-orange-700 dark:text-neutral-200"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLogin(email);
              }}
              disabled={loading}
            >
              {loading ? <span>Sending</span> : <span>Send</span>}
            </button>
          </form>
          {!!helperText.text && (
            <div className="mt-6 mb-2 flex justify-center">
              <div
                className={`text-center font-bold ${
                  helperText.error ? ' text-red-600' : ' text-blue-600'
                }`}
              >
                {helperText.text}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 flex justify-center font-medium leading-8 tracking-tight">
        <ul className="px-2 text-center text-lg leading-6">
          By clicking "Send", I agree to Clementine's{' '}
          <Link to="/privacy-policy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </ul>
      </div>
      <div className="mt-12 flex justify-center px-2 font-medium leading-8 tracking-tight">
        <div className="mb-24 mt-12 px-8 py-2 text-center font-mono text-sm font-medium leading-8 tracking-tight text-black dark:text-white">
          <ul className="px-2 text-center text-sm leading-6">
            <strong>Tip:</strong> Remember to check your spam folder and move
            the message to your inbox to access to your Magic Link.
          </ul>
        </div>
      </div>
    </div>
  );
}
