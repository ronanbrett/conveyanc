import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@components";
import { Storage } from "@services/aws.service";
import { useAuth } from "@core/auth";

interface HomeProps {
  children?: any;
}

const Home = (props: HomeProps) => {
  const { user, isAuthenticated } = useAuth();

  const uploadItem = async () => {
    if (!isAuthenticated) {
      return;
    }
    const { IdentityId } = user?.aws;
    const csv = new Blob(["test"]);
    const key = await Storage.put("test", csv, {
      // level: "protected",
      identityId: IdentityId,
    });
    console.log(key);
  };

  return (
    <div className="page">
      <Button onClick={uploadItem}>Upload</Button>
      <h1>Home</h1>
      <Link to="/listings/create">Create Listings</Link>
      <Link to="/listings">Listings</Link>
    </div>
  );
};

export default Home;
