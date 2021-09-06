import React, { useContext } from "react";
import "./index.scss";
import "../../Styles/Styles.scss";
import Charactor from "../../Controls/Charactor";
import { StoryContext } from "../../Controls/StoryReader";

const Top: React.VFC = () => {
  const { getCurrentTalk } = useContext(StoryContext);
  const talk = getCurrentTalk();

  return (
    <>
      <div className="Top">
        <Charactor
          name={talk.char1}
          position={talk.position1}
          height={talk.char1Size}
        ></Charactor>
        {talk.text && (
          <>
            <div className="Top__frame"></div>
            <div className="Top__text">{talk.text}</div>
          </>
        )}
      </div>
    </>
  );
};

export default Top;
