import { useContext } from "react";
import AlertContext from "./popup-provider/popupProvider";

const UsePopupContext = () => {
  return useContext(AlertContext);
};

export default UsePopupContext;
