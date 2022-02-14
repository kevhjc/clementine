export default function Button() {
  return (
    <div className='inline-flex relative w-fit'>
      <div className='absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 px-2 text-md bg-gray-200 rounded-full z-10'></div>
      <button
        type='button'
        data-mdb-ripple='true'
        data-mdb-ripple-color='light'
        className='bg-red-500 hover:bg-red-600 justify-center px-12 py-3 mb-2 text-white font-medium leading-tight rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out flex items-center'
      ></button>
    </div>
  );
}
