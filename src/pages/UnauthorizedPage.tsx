import { Link } from 'react-router-dom';

import ButtonForward from '../components/ButtonForward';

const UnauthorizedPage = () => {
  return (
    <div className="h-screen px-4 pt-32">
      <div className="px-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mt-2 text-3xl font-medium leading-8 tracking-tight sm:text-5xl">
            Unauthorized 🙃
          </p>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-neutral-500 dark:text-neutral-300">
            You must be signed in to view this page
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mt-24 font-medium leading-8 tracking-tight text-neutral-900">
          <Link to="/signin">
            <ButtonForward text={'Sign in'} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
