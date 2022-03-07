import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

import * as PATHS from '../constants/paths';

import { validateEmail } from '../utils/validation';

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [helperText, setHelperText] = useState<any>({
    error: null,
    text: null,
  });

  const [email, setEmail] = useState('');
  const input = useRef(null);

  const handleSignin = async (email: string) => {
    try {
      setLoading(true);
      const emailError = validateEmail(email);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { error } = await supabase.auth.signIn(
        { email: email },
        {
          redirectTo: 'https://www.clementine.today/home',
        }
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

  const handleSignInWithGoogle = async () => {
    const { error } = await supabase.auth.signIn(
      {
        provider: 'google',
      }
      // {
      //   redirectTo: 'https://www.clementine.today/home',
      // }
    );
    if (error) {
      console.log('Error signing in with Google:', error);
    }
  };

  return (
    <div className="px-10 mx-auto mt-40 mb-24 max-w-7xl">
      <div className="text-center">
        <p className="mt-2 text-4xl font-bold leading-8 tracking-tight sm:text-5xl">
          Hey there 👋
        </p>
        <p className="max-w-2xl mx-auto mt-4 font-sans text-lg text-neutral-500 dark:text-neutral-300">
          Sign in with your email via Magic Link or continue with a third party
        </p>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl p-4 mt-12 duration-300 border rounded-lg border-neutral-200/70 bg-neutral-50 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800/60">
          <form className="relative my-1" action="#">
            <input
              id="email"
              ref={input}
              type={'email'}
              aria-label="Enter your email to be sent a Magic Link"
              placeholder="Enter your email"
              required
              className={
                'mt-1 block w-full rounded-lg bg-white px-4 py-3 pr-28 text-neutral-900 outline-none dark:border-neutral-600 dark:bg-neutral-900/70 dark:text-neutral-200'
              }
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="absolute flex items-center justify-center w-24 h-10 px-4 font-sans font-medium text-white transition duration-150 ease-in-out bg-orange-500 rounded-md right-1 top-1 hover:bg-orange-600 dark:bg-orange-700 dark:text-neutral-200"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSignin(email);
              }}
              disabled={loading}
            >
              {loading ? <span>Sending</span> : <span>Send</span>}
            </button>
          </form>
          {!!helperText.text && (
            <div className="flex justify-center mt-6 mb-2">
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
      <div className="flex justify-center mt-4 font-medium leading-8 tracking-tight">
        <ul className="px-2 leading-6 text-center">
          By clicking "Send", I agree to Clementine's{' '}
          <Link
            to={PATHS.TERMS_OF_SERVICE}
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            to={PATHS.PRIVACY_POLICY}
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Privacy Policy
          </Link>
          .
        </ul>
      </div>
      <div className="flex justify-center px-2 mt-16 font-medium leading-8 tracking-tight">
        <button
          className="flex items-center h-12 px-8 font-sans font-medium text-white transition duration-150 ease-in-out bg-red-500 rounded-md right-1 top-1 gap-x-2 hover:bg-red-600 dark:bg-red-700 dark:text-neutral-200"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSignInWithGoogle();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 640 640"
          >
            <path d="M326.331 274.255v109.761h181.49c-7.37 47.115-54.886 138.002-181.49 138.002-109.242 0-198.369-90.485-198.369-202.006 0-111.509 89.127-201.995 198.369-201.995 62.127 0 103.761 26.516 127.525 49.359l86.883-83.635C484.99 31.512 412.741-.012 326.378-.012 149.494-.012 6.366 143.116 6.366 320c0 176.884 143.128 320.012 320.012 320.012 184.644 0 307.256-129.876 307.256-312.653 0-21-2.244-36.993-5.008-52.997l-302.248-.13-.047.024z" />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
