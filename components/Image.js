import React, {useState} from "react";
import Image from "next/image";

export default function ImageComponent({image}) {
  return (
    <>
      <div className="relative  w-auto h-auto rounded-md overflow-hidden">
        <Image layout="responsive" src={image.url} alt="" className="" width={500} height={500} />
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {image.photographer}</span>
        </button>
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
        {image.photographer}
      </p>
    </>
  );
}
