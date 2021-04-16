import React from "react";
import CategorySidebar from "../components/categorySidebar";

const Homepage = () => {
  return (
    <div>
      <div>Homepage</div>

      <CategorySidebar />
    </div>
  );
};

//Should I lift the state from category sidebar?

export default Homepage;
