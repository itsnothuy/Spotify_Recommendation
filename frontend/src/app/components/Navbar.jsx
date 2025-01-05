"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {

    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path); 
    };
    return (
    <nav className="w-full fixed bg-white border-gray-200 rounded-lg backdrop-blur-md dark:bg-gray-900/5 z-10">
        <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-3">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={() => handleNavigation("")}>
            
            <span className="ml-20 self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            MusicFinder ♪
            </span>
        </a>
        <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
        >
            <span className="sr-only">Open main menu</span>
            <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
            >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
            />
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto mr-20" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800/10 md:dark:bg-gray-900/0 mr-20 ">
            <li>
                <a
                href="#"
                className="block py-2 px-3 mx-5 text-white text-xl bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
                onClick={() => handleNavigation("")}
                >
                Home
                </a>
            </li>
            <li>
                <a
                href="#"
                onClick={() => handleNavigation("/about")}
                className="block py-2 px-3 mx-5 text-gray-900 text-xl rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                About
                </a>
            </li>
            </ul>
        </div>
        </div>
    </nav>
    );
};

export default Navbar;
