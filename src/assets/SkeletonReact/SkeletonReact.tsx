import ContentLoader from "react-content-loader";
import React from "react";

const SkeletonLoader = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"

  >
    <rect x="158" y="160" rx="0" ry="0" width="111" height="0" />
    <circle cx="135" cy="109" r="105" />
    <rect x="0" y="226" rx="26" ry="26" width="280" height="27" />
    <rect x="-1" y="270" rx="24" ry="24" width="280" height="88" />
    <rect x="7" y="388" rx="28" ry="28" width="90" height="27" />
    <rect x="129" y="378" rx="47" ry="47" width="150" height="45" />
  </ContentLoader>
)

export default SkeletonLoader;