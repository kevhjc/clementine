import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

import * as PATHS from '../constants/paths';

import { validateEmail } from '../utils/validation';

export default function SignIn() {
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
    const { error } = await supabase.auth.signIn({
      provider: 'google',
    });
    if (error) {
      console.log('Error signing in with Google:', error);
    }
  };

  const handleSignInWithTwitter = async () => {
    const { error } = await supabase.auth.signIn({
      provider: 'twitter',
    });
    if (error) {
      console.log('Error signing in with Twitter:', error);
    }
  };

  return (
    <div className="mx-auto mt-40 max-w-7xl px-10">
      <div className="text-center">
        <p className="mt-2 text-4xl font-bold leading-8 tracking-tight sm:text-5xl">
          Hey there 👋
        </p>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-neutral-500 dark:text-neutral-300">
          Sign in with your email via Magic Link or continue with a third party
        </p>
      </div>
      <div className="flex justify-center">
        <div className="mt-12 w-full max-w-2xl rounded-lg border border-neutral-200/70 bg-neutral-50 p-4 duration-300 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800/60">
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
              className="absolute right-1 top-1 flex h-10 w-24 items-center justify-center rounded-md bg-orange-500 px-4 font-sans font-medium text-white transition duration-150 ease-in-out hover:bg-orange-600 dark:bg-orange-700 dark:text-neutral-200"
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
      <div className="mt-4 flex justify-center font-medium leading-8 tracking-tight">
        <ul className="px-2 text-center text-sm leading-6">
          By clicking "Send", I agree to Clementine's{' '}
          <Link
            to={PATHS.TERMS_OF_SERVICE}
            className="text-blue-600 hover:underline"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            to={PATHS.PRIVACY_POLICY}
            className="text-blue-600 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </ul>
      </div>
      <div className="mt-16 flex justify-center px-2 font-medium leading-8 tracking-tight">
        <button
          className="right-1 top-1 flex h-12 items-center gap-x-2 rounded-md bg-red-500 px-8 font-sans font-medium text-white transition duration-150 ease-in-out hover:bg-red-600 dark:bg-red-700 dark:text-neutral-200"
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
      <div className="mt-6 flex justify-center px-2 font-medium leading-8 tracking-tight">
        <button
          className="dark:[#0c85d0] right-1 top-1 flex h-12 items-center gap-x-2 rounded-md bg-[#1DA1F2] px-8 font-sans font-medium text-white transition duration-150 ease-in-out hover:bg-[#0d95e8] dark:bg-[#0d95e8] dark:text-neutral-200 dark:hover:bg-[#1DA1F2]"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSignInWithTwitter();
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.23336 4.69629C7.23336 2.96884 8.63335 1.56857 10.36 1.56857C11.3736 1.56857 12.183 2.04804 12.7254 2.74385C13.3079 2.62467 13.8557 2.40913 14.3513 2.11508C14.1559 2.72598 13.7424 3.2396 13.2033 3.56463C13.2038 3.56568 13.2042 3.56674 13.2047 3.56779C13.7334 3.50361 14.2364 3.36302 14.7048 3.15546L14.7037 3.15715C14.3667 3.66183 13.9431 4.10736 13.4561 4.47034C13.4823 4.64672 13.4956 4.82427 13.4956 5.00079C13.4956 8.6871 10.6873 12.9746 5.52122 12.9746C3.93906 12.9746 2.46544 12.511 1.22505 11.7152C0.992632 11.5661 0.925108 11.2568 1.07423 11.0244C1.0874 11.0038 1.10183 10.9846 1.11734 10.9666C1.20582 10.8202 1.37438 10.7309 1.5554 10.7522C2.47066 10.8601 3.38568 10.7485 4.19219 10.3962C3.39226 10.0434 2.77129 9.35975 2.50204 8.51974C2.45359 8.3686 2.48835 8.20311 2.59351 8.08422C2.59716 8.0801 2.60087 8.07606 2.60464 8.0721C1.96391 7.50819 1.55973 6.68208 1.55973 5.76143V5.72759C1.55973 5.56814 1.64411 5.42059 1.78155 5.33974C1.82671 5.31317 1.87537 5.29511 1.92532 5.28558C1.70549 4.86154 1.58116 4.37984 1.58116 3.86958C1.58116 3.40165 1.58384 2.81192 1.91332 2.28081C1.98718 2.16175 2.10758 2.08915 2.2364 2.07195C2.42588 2.01237 2.64087 2.06969 2.77406 2.23302C3.86536 3.57126 5.44066 4.49583 7.23366 4.73961L7.23336 4.69629ZM5.52122 11.9746C4.73387 11.9746 3.97781 11.8435 3.27248 11.6023C4.13012 11.4538 4.95307 11.1159 5.66218 10.5602C5.81211 10.4427 5.87182 10.2435 5.81126 10.0629C5.7507 9.88234 5.583 9.75943 5.39255 9.75607C4.68968 9.74366 4.06712 9.39716 3.67793 8.86845C3.86828 8.85306 4.05428 8.82039 4.23445 8.77167C4.43603 8.71716 4.57363 8.53114 4.56674 8.32243C4.55985 8.11372 4.41029 7.93718 4.20555 7.89607C3.42694 7.73977 2.79883 7.16764 2.56169 6.42174C2.76255 6.47025 2.97102 6.4991 3.18482 6.5061C3.38563 6.51267 3.56646 6.38533 3.62795 6.19405C3.68943 6.00277 3.61666 5.79391 3.44963 5.68224C2.86523 5.29155 2.48116 4.62464 2.48116 3.86958C2.48116 3.70213 2.48352 3.55268 2.49355 3.41719C3.85115 4.79913 5.70873 5.68931 7.77588 5.79338C7.93225 5.80126 8.08328 5.73543 8.18395 5.61553C8.28463 5.49562 8.32332 5.33548 8.28851 5.18284C8.25255 5.02517 8.23336 4.86284 8.23336 4.69629C8.23336 3.52085 9.18591 2.56857 10.36 2.56857C11.5943 2.56857 12.4956 3.71208 12.4956 5.00079C12.4956 8.25709 10.0202 11.9746 5.52122 11.9746Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          Continue with Twitter
        </button>
      </div>
    </div>
  );
}
