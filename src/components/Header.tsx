import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { MenuAlt3Icon } from "@heroicons/react/outline";
import { HomeIcon, InfoCircledIcon } from "@radix-ui/react-icons";

export default function Header() {
  return (
    <Popover className="font-mono">
      {({ open }) => (
        <>
          <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-neutral-50 py-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex justify-start pl-6 lg:w-0 lg:flex-1">
              <a href="/">
                <span className="header-link text-xl font-black">Canvas</span>
              </a>
            </div>
            <Popover.Button className="mr-6 flex items-center justify-center rounded-md p-2 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-100">
              <span className="sr-only">Open menu</span>
              <MenuAlt3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
            <Popover.Overlay
              className={`${open ? "fixed inset-0" : "opacity-0"}`}
            />
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute right-0 top-20 z-10 w-auto max-w-sm origin-top-right transform pr-6 transition"
            >
              <div className="divide-y-2 divide-neutral-100 overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-neutral-200 dark:divide-neutral-700 dark:bg-neutral-800 dark:ring-neutral-700">
                <div className="px-5 pb-6">
                  <div className="mt-6">
                    <nav className="grid gap-y-2">
                      <Popover.Button>
                        <Link
                          to="/home"
                          className="flex items-center rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600"
                        >
                          <span className="sr-only">Go home</span>
                          <HomeIcon
                            className="h-6 w-6 flex-shrink-0 text-neutral-600 dark:text-neutral-100"
                            aria-hidden="true"
                          />
                          <span className="ml-3 font-medium text-neutral-900 dark:text-neutral-300">
                            Home
                          </span>
                        </Link>
                      </Popover.Button>
                      <Popover.Button>
                        <Link
                          to="/learn-more"
                          className="flex items-center rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600"
                        >
                          <span className="sr-only">Learn more</span>
                          <InfoCircledIcon
                            className="h-6 w-6 flex-shrink-0 text-neutral-600 dark:text-neutral-100"
                            aria-hidden="true"
                          />
                          <span className="ml-3 font-medium text-neutral-900 dark:text-neutral-300">
                            Learn More
                          </span>
                        </Link>
                      </Popover.Button>
                    </nav>
                  </div>
                </div>
                <div className="space-y-6 py-6 px-5">
                  <div>
                    <a
                      href="/"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-red-600 dark:bg-red-700"
                    >
                      Sign up
                    </a>
                    <p className="mt-6 text-center text-sm font-medium text-neutral-500 dark:text-neutral-300">
                      Already have an account?{" "}
                      <a
                        href="/"
                        className="text-red-500 underline decoration-transparent transition duration-200 ease-in-out hover:decoration-inherit dark:text-red-400"
                      >
                        Log in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
          <Outlet />
        </>
      )}
    </Popover>
  );
}
