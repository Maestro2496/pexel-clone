import React, {useState} from "react";
import Image from "next/image";

export default function ImageComponent({image}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className="relative  w-auto h-auto rounded-md overflow-hidden"
        onMouseEnter={() => {
          setShow(true);
        }}
        onMouseLeave={() => {
          setShow(false);
        }}
      >
        <Image layout="responsive" src={image.url} alt="" className="" width={500} height={500} />
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {image.photographer}</span>
        </button>

        {show && (
          <a
            href={image.photographer_url}
            className="bg-slate-200/80 backdrop-blur-sm absolute z-30 inset-x-2 bottom-1 rounded-md text-center px-2"
            target="blank"
          >
            {image.photographer}
          </a>
        )}
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
        {image.photographer}
      </p>
    </>
  );
}
