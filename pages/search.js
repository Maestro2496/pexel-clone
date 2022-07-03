import React, {useRef} from "react";

import Banner from "../components/Banner";
import Header from "../components/Header";
import InfiniteScroll from "../components/InfiniteScroll";
import Footer from "../components/Footer";

// All requests made with the client will be authenticated

export default function Search() {
  const ref = useRef();
  return (
    <>
      <Header ref={ref} />
      <Banner ref={ref} />
      <div className="max-w-6xl mx-auto px-4 py-4">
        <InfiniteScroll searchTerm="house" />
      </div>
      <Footer />
    </>
  );
}
