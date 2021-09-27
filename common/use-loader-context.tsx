import { useContext } from "react";
import LoaderContext from "./loader-provider/loaderProvider";

const UseLoaderContext = () => {
  return useContext(LoaderContext);
};

export default UseLoaderContext;
