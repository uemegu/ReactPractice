import { ImgHTMLAttributes, ReactElement } from "react";
import "./index.scss";
import back from "../../Assets/Image/Background.jpg";

export type BackgroundTypes = undefined | "Background";

interface OwnProps
  extends React.DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  name: BackgroundTypes;
}
const Background = (props: OwnProps): ReactElement => {
  let name = "";
  switch (props.name) {
    case "Background":
      // 適当にググって落としてきた：https://min-chi.material.jp/fm/bg_c/convenience_store/
      name = back;
      break;
  }
  return (
    <div className="Background">
      {name && (
        <img src={name} alt="background" className="Background__image" />
      )}
    </div>
  );
};
export default Background;
