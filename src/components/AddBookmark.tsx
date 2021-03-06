import {
  Fragment,
  useState,
  useContext,
  useRef,
  MutableRefObject,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Dialog, Transition } from '@headlessui/react';

import { IAddEntryProps } from '../lib/interfaces';

import { validateUrl } from '../utils/validation';
import { SessionContext } from '../context/SessionContext';

const AddBookmark = ({ userEntries, setUserEntries }: IAddEntryProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const session = useContext(SessionContext);
  const [open, setOpen] = useState(true);
  const newBookmarkTitleRef = useRef() as MutableRefObject<any>;
  const newBookmarkUrlRef = useRef() as MutableRefObject<any>;
  const cancelButtonRef = useRef(null);

  const [helperText, setHelperText] = useState<any>({
    error: null,
    text: null,
  });

  const addBookmark = async () => {
    let newBookmarkTitle = newBookmarkTitleRef.current.value;
    let newBookmarkUrl = newBookmarkUrlRef.current.value;
    let title = newBookmarkTitle.trim();
    let url = newBookmarkUrl.trim();

    try {
      const urlError = validateUrl(newBookmarkUrl);
      if (urlError) {
        setHelperText({
          error: true,
          text: urlError,
        });
        console.log('Error adding bookmark: ', urlError);
      } else {
        let { data: bookmarks } = await supabase
          .from('entries')
          .insert({
            title: title,
            content: url,
            user_id: session.user.id,
            category: 'bookmark',
          })
          .single();
        setOpen(false);
        setUserEntries([bookmarks, ...userEntries]);
        newBookmarkTitleRef.current.value = '';
        newBookmarkUrlRef.current.value = '';
        return navigate('/home/?category=bookmark');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    setOpen(false);
    return location.search === '' ? navigate('/home') : navigate(-1);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={handleModalClose}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-neutral-100 backdrop-blur-lg dark:bg-neutral-900" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-[420px] transform overflow-hidden rounded-md border border-neutral-200 bg-white text-left shadow-2xl transition-all sm:my-8 sm:align-middle dark:border-neutral-700/80 dark:bg-neutral-800 dark:text-neutral-100/80">
              <div className="pt-3 pb-2 pl-5 font-black text-emerald-500 dark:text-emerald-400">
                New bookmark
              </div>
              <div className="px-4 pt-4 pb-4">
                <input
                  ref={newBookmarkTitleRef}
                  type="text"
                  placeholder="Title (optional)"
                  className={
                    'w-full bg-white px-1 py-2 pt-1 text-neutral-900 outline-none backdrop-blur-sm dark:border-neutral-700/80 dark:bg-neutral-800/80 dark:text-white dark:placeholder:text-neutral-100/60'
                  }
                />
              </div>
              <div className="px-4 pt-2 pb-4">
                <input
                  ref={newBookmarkUrlRef}
                  type="url"
                  onFocus={() => (newBookmarkUrlRef.current.value = 'https://')}
                  onKeyUp={(e) => e.key === 'Enter' && addBookmark()}
                  placeholder="Url"
                  className="w-full px-1 py-2 pt-1 bg-white outline-none text-neutral-900 backdrop-blur-sm dark:border-neutral-700/80 dark:bg-neutral-800/80 dark:text-white dark:placeholder:text-neutral-100/60"
                />
              </div>
              <div className="grid items-center justify-between grid-cols-1 px-4 py-4 border-t bg-white/80 dark:border-neutral-700/80 dark:bg-neutral-800/80">
                <div className="col-start-1">
                  {helperText.error && (
                    <p className="pl-1 text-xs font-bold text-red-600 dark:text-red-500">
                      {helperText.text}
                    </p>
                  )}
                </div>
                <div className="col-end-3">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-auto px-4 py-1 ml-4 text-base font-medium bg-white border rounded border-neutral-200 text-neutral-700 hover:bg-neutral-100/80 focus:outline-none dark:border-neutral-500 dark:bg-neutral-500 dark:text-white dark:hover:border-neutral-600/80 dark:hover:bg-neutral-600/80"
                    onClick={handleModalClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-auto px-4 py-1 ml-4 text-base font-medium text-white border rounded border-emerald-500 bg-emerald-500 hover:border-emerald-600 hover:bg-emerald-600 focus:outline-none"
                    onClick={addBookmark}
                  >
                    Add bookmark
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddBookmark;
