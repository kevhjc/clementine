import { CodeIcon, ImageIcon, Link1Icon } from '@radix-ui/react-icons';

const features = [
  {
    name: 'Text',
    description: 'Add notes or code snippets',
    icon: CodeIcon,
  },
  {
    name: 'Links',
    description: 'Save links to webpages',
    icon: Link1Icon,
  },
  {
    name: 'Media',
    description: 'Embed images or videos',
    icon: ImageIcon,
  },
];

export default function Intro() {
  return (
    <div className='px-4 font-mono mt-36'>
      <div className='max-w-7xl mx-auto px-10'>
        <div className='text-center'>
          <p className='mt-2 text-3xl leading-8 font-medium tracking-tight text-gray-900 sm:text-5xl'>
            Say 👋 to <span className='font-black'>Canvas.</span>
          </p>
          <p className='mt-4 max-w-2xl text-xl text-gray-500 mx-auto'>
            A place to save your thoughts and ideas
          </p>
        </div>

        <div className='mt-24 flex justify-center'>
          <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10'>
            {features.map((feature) => (
              <div key={feature.name} className='relative'>
                <dt>
                  <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-100 text-black'>
                    <feature.icon className='h-6 w-6' aria-hidden='true' />
                  </div>
                  <p className='ml-16 text-lg leading-6 font-black text-gray-900'>
                    {feature.name}
                  </p>
                </dt>
                <dd className='mt-2 ml-16 font-sans text-base text-gray-500'>
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className='flex justify-center text-center mt-24 leading-8 font-medium tracking-tight text-gray-900'>
          <div className='inline-flex relative w-fit'>
            <button
              type='button'
              data-mdb-ripple='true'
              data-mdb-ripple-color='light'
              className='animate-bounce bg-red-500 hover:bg-red-600 justify-center px-12 py-3 mb-2 text-white font-medium leading-tight rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out flex items-center'
            >
              Sign up
            </button>
          </div>
        </div>
        <div className='flex justify-center text-center leading-8 font-medium tracking-tight text-gray-900'>
          <p className='mt-6 text-center font-medium text-gray-500'>
            Already have an account?{' '}
            <a
              href='/'
              className='text-red-500 underline decoration-transparent hover:decoration-inherit transition duration-200 ease-in-out'
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
