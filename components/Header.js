/* This example requires Tailwind CSS v2.0+ */
import React, {Fragment, useEffect, useState} from "react";
import {Popover, Transition} from "@headlessui/react";
import {MenuIcon, XIcon} from "@heroicons/react/outline";
import clsx from "clsx";
import {useDispatch} from "react-redux";
import {update} from "../features/searchSlice";
import Image from "next/image";
const Header = React.forwardRef((props, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const [scroll, setScrollY] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setScrollY(0);
      });
    };
  }, []);
  return (
    <Popover
      className={clsx("  sticky top-0 z-50", {
        "bg-white": scroll,
        "bg-gradient-to-r from-slate-400 to-teal-800": !scroll,
      })}
    >
      <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div>
          <a href="#" className="flex relative h-12 w-12">
            <span className="sr-only">Workflow</span>
            <Image layout="fill" className="h-8 w-auto sm:h-10" src="/logo.svg" alt="" />
          </a>
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
          <nav className="flex space-x-10">
            <a
              href="#footer"
              className={clsx("text-base font-medium  hover:text-gray-900", {
                "text-black": scroll,
                "text-white": !scroll,
              })}
            >
              Developer
            </a>
          </nav>
          <form
            className={clsx(
              "relative mx-4 h-12 max-w-5xl flex flex-1 items-center justify-center",
              {
                hidden: !scroll,
              }
            )}
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(update(searchTerm));
              setSearchTerm("");
            }}
          >
            <input
              type="text"
              className="p-4 absolute w-full h-12 rounded-lg placeholder:text-lg placeholder:font-semibold bg-slate-300"
              value={searchTerm}
              placeholder="Search for free photos"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <button type="submit" className="absolute right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="#000000"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className=""
              >
                <circle cx="11" cy="11" r="9" fill="none"></circle>
                <line x1="17.5" y1="17.5" x2="22" y2="22"></line>
              </svg>
            </button>
          </form>

          <div className="flex items-center md:ml-12">
            <a
              onClick={() => {
                ref.current.focus();
              }}
              href="#"
              className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
            >
              Search
            </a>
          </div>
        </div>
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
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="relative h-12 w-12">
                  <Image layout="fill" className="h-8 w-auto" src="/logo.svg" alt="Workflow" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                  Developer
                </a>
              </div>
              <div className="mt-6">
                <a
                  onClick={() => {
                    ref.current.focus();
                  }}
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
                >
                  Search
                </a>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
});

Header.displayName = Header;
export default Header;
