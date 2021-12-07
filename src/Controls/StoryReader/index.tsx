import React, {
  createContext,
  ReactElement,
  useContext,
  useRef,
  useState,
} from "react";
import "./index.scss";
import { PATH } from "../../Const/Pages";
import { Scene, Scenes, Talk } from "../../Data/Models";
import { BGMContext } from "../BGM";
import { ScreenSwitchContext } from "../ScreenSwitch";
import Button from "../Button";
import { useEffect } from "react";

const story: Scenes = require("../../Assets/Story/Chapter1.json");

interface StoryContextProps {
  start: () => void;
  reStart: () => void;
  getCurrentTalk: () => Talk;
  nextStory: () => boolean;
}
export const StoryContext = createContext({} as StoryContextProps);

interface ProgramCounter {
  scene: number;
  talk: number;
  isFinish: boolean;
}

type Props = {
  children?: React.ReactNode;
};
const progress = {
  scene: 0,
  talk: 0,
} as ProgramCounter;
const flags: number[] = [];
const Story = (props: Props): ReactElement => {
  const [talk, setTalk] = useState({} as Talk);
  const [isStarted, setIsStarted] = useState(false);
  const { setBackground, goto } = useRef(
    useContext(ScreenSwitchContext)
  ).current;
  const { play } = useRef(useContext(BGMContext)).current;

  const getTalk = (): Talk => {
    return story.scenes[progress.scene].talk[progress.talk];
  };
  const getScene = (): Scene => {
    return story.scenes[progress.scene];
  };

  const context = {
    start: (): void => {
      setTalk(getTalk());
      goto(PATH.TOP, "Background");
      play("default");
      setIsStarted(true);
    },
    reStart: (): void => {
      progress.scene = 0;
      progress.talk = 0;
      flags.splice(0);
      setTalk(getTalk());
      goto(PATH.TOP, "Background");
      play("default");
    },
    getCurrentTalk: (): Talk => {
      if (!isStarted) {
        // FIXME: エラーでるけどここでスタート画面に戻す
        goto(PATH.LOGIN);
        play(null);
      }
      return talk;
    },
    nextStory: (): boolean => {
      const scene = story.scenes[progress.scene];
      if (progress.talk < scene.talk.length - 1) {
        progress.talk = progress.talk + 1;

        // フラグが必要でかつ満たしていない場合はスキップ
        const next = getTalk();
        if (
          next.condition &&
          !next.condition.every((i) => flags.indexOf(i) !== -1)
        ) {
          return context.nextStory();
        }

        setTalk(getTalk());
        if (getTalk().bgm) {
          play(getTalk().bgm);
        }
        return true;
      } else if (progress.scene < story.scenes.length - 1) {
        progress.scene = progress.scene + 1;
        progress.talk = 0;
        setBackground(getScene().back);
        return true;
      } else {
        return false; // 終了
      }
    },
  };

  let canClick = true;
  const current = getTalk();

  const onClick = (e: React.MouseEvent) => {
    if (isStarted && canClick) {
      if (current.goto) {
        goto(current.goto.page, undefined, current.goto.param);
      } else {
        context.nextStory();
      }
    }
  };

  if (current.items) {
    canClick = false;
  }

  const selectItem = (flagNumber: number) => {
    setTimeout(() => {
      flags.push(flagNumber);
      context.nextStory();
    }, 500);
  };

  const getItems = (): ReactElement => {
    return (
      <>
        {current.items.map((o, i) => (
          <Button
            key={`item${i}`}
            className="StoryReader__items mt-8"
            label={o.text}
            onClick={() => selectItem(o.flg)}
          ></Button>
        ))}
      </>
    );
  };

  return (
    <StoryContext.Provider value={context}>
      <div className="StoryReader w-full h-full">
        {current.items && (
          <>
            <div className="StoryReader__overlay w-full h-full"></div>
            <div className="StoryReader__items_container w-full h-full flex items-center justify-center flex-col">
              {getItems()}
            </div>
          </>
        )}
        <div
          className="h-full"
          onClick={(e) => {
            onClick(e);
          }}
        >
          {props.children}
        </div>
      </div>
    </StoryContext.Provider>
  );
};

export default Story;
