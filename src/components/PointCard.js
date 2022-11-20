import "../css/PointCard.css";
import { Pen, Clock, Map, Youtube } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

const PointCard = (props) => {
  return (
    <>
      <div className="pointCard">
        <div className="pointCardContent">
          <div className="pointCardContentRightSide">
            <div className="pointCardContentText">
              <Pen color="royalblue" size={32} />
              これは説明です。これは説明です。
            </div>
            <div className="pointCardContentMap">
              <Map color="royalblue" size={20} />
              pointCardContentMap
            </div>
          </div>
        </div>
        <div className="pointCardFooter">
          <div className="pointCardFooterButton">
            <Button className="pointCardFooterDetail" href={"/Detail/1"}>
              詳しく見る！
            </Button>
          </div>
          <div className="pointCardFooterYoutube">
            <a
              href={
                "https://www.youtube.com/watch?v=ejIY4wfZhgg&ab_channel=ValoPoint"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube color="red" size={56} />
            </a>
          </div>
          <div className="pointCardFooterClock">
            <Clock color="royalblue" size={28} />
            <p className="pointCardFooterClockText">25s.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PointCard;
