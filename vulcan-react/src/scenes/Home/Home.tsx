import React from "react";
import { Link } from "react-router-dom";

interface HomeProps {
  children?: any;
}

const Home = (props: HomeProps) => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/listings/create">Create Listings</Link>
      <Link to="/listings">Listings</Link>
    </div>
  );
};

export default Home;
