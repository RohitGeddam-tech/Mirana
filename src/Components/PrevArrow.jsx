import React from "react";
import prev from "../image/brown1.png";

const SliderPrevArrow = (props) => {
  const { onClick } = props;

  return (
    <button
      type="button"
      aria-label='prevArrow'
      data-role="none"
      className="slick-arrow slickPrev"
      style={{ display: "block" }}
      onClick={onClick}
      // isDisabled={className?.includes("slick-disabled")}
    >
      {/* <span> */}
        <img src={prev} alt="banner" />
      {/* </span> */}
    </button>
  );
};

export default SliderPrevArrow;
