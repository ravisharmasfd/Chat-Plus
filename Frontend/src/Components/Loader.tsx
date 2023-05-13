import React from "react";
import { Discuss } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full h-full overflow-hidden flex justify-center items-center">
      <Discuss
        visible={true}
        height="80"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        colors={["#a855f7", "#a855f7"]}
      />
    </div>
  );
};

export default Loader;
