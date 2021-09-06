import { useContext, useRef } from "react";
import { default as Button } from "../../Controls/Button/index";
import "./index.scss";
import "../../Styles/Styles.scss";
import { ReactComponent as Logo } from "../../Assets/Image/Logo.svg";
import { StoryContext } from "../../Controls/StoryReader";

const Login: React.VFC = () => {
  const { start } = useRef(useContext(StoryContext)).current;

  return (
    <div className="Login flex items-center justify-center flex-col h-full">
      <div className="Login__logo">
        <Logo width="18rem"></Logo>
      </div>
      <div className="mt-8">
        <Button
          className="Login__button"
          label="Start"
          onClick={() => start()}
        ></Button>
      </div>
    </div>
  );
};

export default Login;
