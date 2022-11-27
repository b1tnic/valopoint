import "../css/PointCard.css";
import { Pen, Clock, Map, Youtube } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

const PointCard = (props) => {
  return (
    <>
      <div className="pointCard">
        <div className="pointCardContent">
          <div className="pointCardContentLeftSide">
            <div className="pointCardContentLeftSideTitle">
              <p className="pointCardContentLeftSideTitleText">
                {props.category}
              </p>
            </div>
            <div className="pointCardContentLeftSideImage0">
              <img
                src={require("../static/images/characters/" +
                  props.character +
                  ".jpg")}
                style={{ width: 80 }}
                alt={"Character"}
              ></img>
            </div>
            <div className="pointCardContentLeftSideImage1">
              <img
                src={require("../static/images/abilities/" +
                  props.character +
                  "/" +
                  props.ability +
                  ".jpg")}
                style={{ width: 80 }}
                alt={"Character"}
              ></img>
            </div>
            <div className="pointCardContentLeftSideImage2">
              <img
                src={require("../static/images/sides/" + props.side + ".jpg")}
                style={{ width: 80 }}
                alt={props.side}
              ></img>
            </div>
          </div>
          <div className="pointCardContentRightSide">
            <div className="pointCardContentText">
              <Pen color="royalblue" size={32} />
              {props.title}
            </div>
            <div className="pointCardContentMap">
              <img
                src={require("../static/images/thumbnails/" +
                  props.thumbnail +
                  ".jpg")}
                className="pointCardContentMapThumbnail"
                alt={"Character"}
              ></img>
            </div>
          </div>
        </div>
        <div className="pointCardFooter">
          <div className="pointCardFooterButton">
            <Button
              className="pointCardFooterDetail"
              href={"/Detail/" + props.id}
            >
              詳しく見る！
            </Button>
          </div>
          <div className="pointCardFooterYoutube">
            <a
              href={
                "https://www.youtube.com/watch?v=" +
                props.videoID +
                "&ab_channel=ValoPoint"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube color="red" size={56} />
            </a>
          </div>
          <div className="pointCardFooterClock">
            <Clock color="royalblue" size={28} />
            <p className="pointCardFooterClockText">{String(props.readTime)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PointCard;
