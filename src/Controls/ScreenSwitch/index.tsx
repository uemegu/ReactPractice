import React, { createContext, ReactElement, useState } from "react";
import "./index.scss";
import { ReactComponent as Logo } from "../../Assets/Image/Logo.svg";
import Woman1 from "../../Assets/Image/Woman1.png";
import { useHistory } from "react-router-dom";
import { PATH } from "../../Const/Pages";
import Background, { BackgroundTypes } from "../Background";

interface ScreenSwitchContextProps {
  goto: (path: PATH, background?: BackgroundTypes, param?: string) => void;
  setBackground: (type: BackgroundTypes) => void;
}
export const ScreenSwitchContext = createContext(
  {} as ScreenSwitchContextProps
);

type Props = {
  children?: React.ReactNode;
};
const ScreenSwitch = (props: Props): ReactElement => {
  const [isShowState, setIsShow] = useState(false);
  const [background, setBackground] = useState(undefined as BackgroundTypes);
  const history = useHistory();
  const context = {
    goto: (path: PATH, background?: BackgroundTypes, param?: string) => {
      setIsShow(true);
      setTimeout(() => {
        setBackground(background);
        history.push(param ? `${path}/${param}` : path);
      }, 1000);
    },
    setBackground: (type: BackgroundTypes) => {
      setBackground(type);
    },
  };
  return (
    <ScreenSwitchContext.Provider value={context}>
      {isShowState && (
        <div className="ScreenSwitch" onAnimationEnd={() => setIsShow(false)}>
          <div className="ScreenSwitch__container">
            <Logo width="20rem" />
          </div>
        </div>
      )}
      <Background name={background} />
      {props.children}
    </ScreenSwitchContext.Provider>
  );
};
export default ScreenSwitch;
