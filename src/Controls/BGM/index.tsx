import { createContext, ReactElement } from "react";
import defaultBGM from "../../Assets/Sound/default.mp3";
import sad from "../../Assets/Sound/sad.mp3";
import honor from "../../Assets/Sound/honor.mp3";
import { BGMType } from "../../Data/Models";

interface BGMContextProps {
  play: (bgm: BGMType | null) => void;
}
export const BGMContext = createContext({} as BGMContextProps);

type Props = {
  children?: React.ReactNode;
};
let audio: HTMLAudioElement | null = null;
const BGM = (props: Props): ReactElement => {
  const context = {
    play: (bgm: BGMType | null) => {
      if (audio) {
        audio.pause();
        audio = null;
      }
      let sound = null;
      switch (bgm) {
        case "default":
          sound = defaultBGM;
          break;
        case "honor":
          sound = honor;
          break;
        case "sad":
          sound = sad;
          break;
      }
      if (!sound) {
        return;
      }
      audio = new Audio(sound);
      audio.loop = true;
      audio.play();
      context.bgm = audio;
    },
    bgm: null as HTMLAudioElement | null,
  };
  return (
    <>
      <BGMContext.Provider value={context}>
        {props.children}
      </BGMContext.Provider>
    </>
  );
};
export default BGM;
