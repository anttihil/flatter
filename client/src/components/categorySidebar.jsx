import React, { useEffect, useState } from "react";
import CategoryApi from "../apis/CategoryApi.jsx";
import { NavLink, Switch, Route } from "react-router-dom";
import PostList from "./PostList";

const CategorySidebar = () => {
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("new");

  //fetch the data from the back-end and update the categories state hook.
  useEffect(() => {
    async function fetchData(categories) {
      try {
        const response = await CategoryApi.get(`/${categories}/`);
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSort = (string) => {
    if (string === "new") {
      setSort("new");
    } else if (string === "starred") {
      setSort("starred");
    } else return undefined;
  };

  // return a list of navigation links to different category pages of posts and set up routes for each category
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", background: "#000000" }}>
        <nav>
          <li>
            <NavLink exact to="/posts/all/" activeClassName="selected">
              All
            </NavLink>
          </li>
          {categories.map((object) => (
            <li key={object.category_id}>
              <NavLink to={`/posts/${object.name}/`} activeClassName="selected">
                {object.name}
              </NavLink>
            </li>
          ))}
        </nav>

        {categories.map((object) => (
          <Route path={`/posts/${object.name}/`} key={object.category_id} />
        ))}
      </div>

      <div style={{ width: "80%", background: "#111111" }}>
        <div>
          <button onClick={() => handleSort("new")}>Sort by newest</button>
          <button onClick={() => handleSort("starred")}>Sort by starred</button>
        </div>
        <div>
          <Switch>
            {categories.map((object) => (
              <Route path={`/${object.name}/`} key={object.category_id}>
                <PostList sort={sort} category_id={object.category_id} />
              </Route>
            ))}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
