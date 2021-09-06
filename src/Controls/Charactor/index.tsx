import { ImgHTMLAttributes, ReactElement } from "react";
import "./index.scss";
import Woman20 from "../../Assets/Image/Woman2-0.png";
import Woman21 from "../../Assets/Image/Woman2-1.png";
import Woman22 from "../../Assets/Image/Woman2-2.png";
import Woman23 from "../../Assets/Image/Woman2-3.png";
import Woman24 from "../../Assets/Image/Woman2-4.png";
import classNames from "classnames";
import { CharactorType, PositionType } from "../../Data/Models";

interface OwnProps
  extends React.DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  name: CharactorType;
  position: PositionType;
}
const Charactor = (props: OwnProps): ReactElement => {
  let name = "";
  switch (props.name) {
    case "Woman2-0":
      name = Woman20;
      break;
    case "Woman2-1":
      name = Woman21;
      break;
    case "Woman2-2":
      name = Woman22;
      break;
    case "Woman2-3":
      name = Woman23;
      break;
    case "Woman2-4":
      name = Woman24;
      break;
  }
  const classnames = classNames("Charactor");
  return (
    <div className={classnames}>
      <img
        src={name}
        width={props.width}
        height={props.height}
        className={props.position}
        alt="Charactor"
      />
    </div>
  );
};
export default Charactor;
