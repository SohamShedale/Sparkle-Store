import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";

const Home = () => {
  const data = useContext(myContext);
  return <Layout>{}</Layout>;
};

export default Home;
