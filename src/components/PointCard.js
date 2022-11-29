import "../css/PointCard.css";
import { Clock } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

const PointCard = (props) => {
  let min = String(Math.floor(props.readTime / 60)) + "分";
  let sec = String(props.readTime % 60) + "秒";

  return (
    <>
      <div className="pointCard">
        <div className="pointCardContent">
          <div className="pointCardContentMap">
            <img
              src={require("../static/images/thumbnails/" +
                props.thumbnail +
                ".jpg")}
              className="pointCardContentMapThumbnail"
              alt={"Character"}
            ></img>
            <img
              src={require("../static/images/sides/" + props.side + ".jpg")}
              className="pointCardContentMapSide"
              alt={"Side"}
            ></img>
            <img
              src={require("../static/images/abilities/" +
                props.character +
                "/" +
                props.ability +
                ".jpg")}
              className="pointCardContentMapAbility"
              alt={"Ability"}
            ></img>
            <img
              src={require("../static/images/characters/" +
                props.character +
                ".jpg")}
              className="pointCardContentMapCharacter"
              alt={"Character"}
            ></img>
            <p
              className={
                props.category === "初心者"
                  ? "pointCardContentMapCategory pointCardContentMapCategoryBeginner"
                  : props.category === "中級者"
                  ? "pointCardContentMapCategory pointCardContentMapCategoryIntermediate"
                  : props.category === "上級者"
                  ? "pointCardContentMapCategory pointCardContentMapCategorySenior"
                  : "pointCardContentMapCategory pointCardContentMapCategoryOtaku"
              }
            >
              {props.category}
            </p>
            <p className="pointCardContentMapText">{props.title}</p>
          </div>
        </div>
        <div className="pointCardFooter">
          <div className="pointCardFooterButton">
            <Button
              className="pointCardFooterDetail"
              href={"/Detail/" + props.id}
            >
              ('ω')
            </Button>
          </div>
          <div className="pointCardFooterClock">
            <Clock color="royalblue" size={28} />
          </div>
          <p className="pointCardFooterClockText">{min + sec}</p>
        </div>
      </div>
    </>
  );
};

export default PointCard;
