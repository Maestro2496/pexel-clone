import React, {useCallback, useRef} from "react";
import useSWRInfinite from "swr/infinite";
import {useSelector} from "react-redux";
import ImageComponent from "./Image";


const fetcher = async (url) => {
  const response = await fetch(url);
  return response.json();
};
export default function InfiniteScroll() {
  const searchTerm = useSelector((state) => {
    return state.searchTerm.term;
  });

  const getKey = useCallback(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/api/search?page=${pageIndex}&search=${searchTerm}`;
    },
    [searchTerm]
  );
  const {data, size, setSize, error, isValidating} = useSWRInfinite(getKey, fetcher);
  const observer = useRef();

  if (error) {
    throw error;
  }
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);
  const isRefreshing = isValidating && data && data.length === size;
  const lastElement = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (isLoadingMore || isEmpty || isRefreshing || isReachingEnd) return;
            setSize(size + 1);
          }
        },
        {
          root: null,
          threshold: 0.5,
        }
      );
      if (node) observer.current.observe(node);
    },
    [size, setSize, isEmpty, isLoadingMore, isRefreshing, isReachingEnd]
  );

  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-3 sm:grid-cols-3 gap-y-4 md:grid-cols-3 lg:grid-cols-4"
      >
        {data?.map((photos) => {
          return photos.map((image, index) => {
            if (index === photos.length - 1) {
              return (
                <div key={image.id} className="relative" ref={lastElement}>
                  <ImageComponent image={image} />
                </div>
              );
            }
            return (
              <li key={image.id} className="relative">
                <ImageComponent image={image} />
              </li>
            );
          });
        })}
        {isLoadingMore ? (
          <>
            {new Array(12).fill("").map((elm, idx) => {
              return (
                <li
                  className="relative h-32 w-auto sm:h-72 rounded-md overflow-hidden bg-slate-300 animate-pulse"
                  key={idx}
                ></li>
              );
            })}
          </>
        ) : null}
      </ul>
    </div>
  );
}
