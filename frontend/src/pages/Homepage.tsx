import React from "react";
const Homepage = () => {
  return (
    <div>
      Home Page
      {
        // indicates very long content
        Array.from({ length: 100 }, (_, index) => (
          <React.Fragment key={index}>
            {index % 20 === 0 && index ? "more" : "..."}
            <br />
          </React.Fragment>
        ))
      }
    </div>
  );
};

export default Homepage;
