import Loading from "components/common/Loading";
import Home from "components/homePage/Home";
import { useState } from "react";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return <>{isLoading ? <Loading /> : <Home />}</>;
};

export default HomePage;
