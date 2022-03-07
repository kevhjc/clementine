import { Link } from 'react-router-dom';

import ButtonBack from '../components/ButtonBack';

const NotFoundPage = () => {
  return (
    <div className="h-screen px-4 pt-32">
      <div className="px-10 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mt-2 text-3xl font-medium leading-8 tracking-tight sm:text-5xl">
            <strong>404</strong> – Page not found
          </p>
          <p className="max-w-2xl mx-auto mt-4 text-xl text-neutral-500 dark:text-neutral-300">
            Oops! The page you're looking for doesn't exist
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mt-24 font-medium leading-8 tracking-tight text-neutral-900">
          <Link to="/home">
            <ButtonBack text={'Go home'} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
