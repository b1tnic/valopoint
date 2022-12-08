import "../css/PointCard.css";
import { Clock } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

const PointCard = (props) => {
  let min = String(Math.floor(props.readTime / 60));
  let sec = String(props.readTime % 60);

  return (
    <>
      <div className="pointCard">
        <a href={"/Detail/" + props.id}>
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
            </div>
          </div>
        </a>
        <p className="pointCardContentMapClockText">
          {min}:{sec}
        </p>
        <p className="pointCardContentTitle"> {props.title}</p>
      </div>
    </>
  );
};

export default PointCard;
