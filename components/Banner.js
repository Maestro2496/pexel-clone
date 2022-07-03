import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {update} from "../features/searchSlice";

const Banner = React.forwardRef((props, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  return (
    <>
      <div className=" w-full px-6  items-center h-36  flex flex-col space-y-4  justify-center bg-gradient-to-r from-slate-400 to-teal-800">
        <div className=" max-w-2xl flex flex-col space-y-6">
          <h1 className="font-semibold text-2xl text-white">
            Stock photos, royalty free images from Pexels API.
          </h1>
          <form
            className="relative  h-12 max-w-5xl flex items-center justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(update(searchTerm));
              setSearchTerm("");
            }}
          >
            <input
              ref={ref}
              type="text"
              className="p-4 absolute w-full h-12 rounded-lg placeholder:text-lg placeholder:font-semibold"
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
        </div>
      </div>
    </>
  );
});

Banner.displayName = Banner;
export default Banner;
