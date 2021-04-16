import React, { useEffect, useState } from "react";
import CategoryApi from "../apis/categoryApi.jsx";
import { NavLink, Switch, Route } from "react-router-dom";

const CategorySidebar = () => {
  const [categories, setCategories] = useState([]);

  //fetch the data from the back-end and update the categories state hook.
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await CategoryApi.get("/");
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // return a list of navigation links to different category pages of posts and set up routes for each category
  return (
    <div>
      <nav>
        <li>
          <NavLink exact to="/" activeClassName="selected">
            All
          </NavLink>
        </li>
        {categories.map((object) => (
          <li key={object.category_id}>
            <NavLink to={`/${object.name}`} activeClassName="selected">
              {object.name}
            </NavLink>
          </li>
        ))}
      </nav>
      <Switch>
        {categories.map((object) => (
          <Route path={`/${object.name}`} key={object.category_id} />
        ))}
      </Switch>
    </div>
  );
};

export default CategorySidebar;
