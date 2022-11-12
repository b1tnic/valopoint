import "../css/PointCard.css";
import { Pen, Clock, Map } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import YouTube from "react-youtube";

const PointCard = (props) => {
  const opts = {
    width: 300,
    height: 169,
  };
  return (
    <>
      <div className="pointCard">
        <div className="pointCardTitle">
          <div className="pointCardTitleImage">
            <img
              src={require("../static/images/icons/" + "sova.jpg")}
              style={{ width: 32 }}
              alt={"sova"}
            />
          </div>
          <div className="pointCardTitleText">アセントA攻めリコン</div>
          <div className="pointCardTitleTime">
            <Clock
              className="pointCardTitleTimeIcon"
              color="royalblue"
              size={32}
            />
            15s.
          </div>
        </div>
        <div className="pointCardContent">
          <div className="pointCardContentVideo">
            <YouTube videoId="fGBuFVBKVZk" opts={opts} />
          </div>
          <div className="pointCardContentRightSide">
            <div className="pointCardContentMap">
              <Map color="royalblue" size={20} />
              pointCardContentMap
            </div>
            <div className="pointCardContentText">
              <Pen color="royalblue" size={20} />
              これは説明です。これは説明です。これは説明です。これは説明です。
            </div>
          </div>
        </div>
        <div className="pointCardFooter">
          <div className="pointCardFooterLevel">
            <p>知名度:</p>
          </div>
          <div className="pointCardFooterLevel">
            <p>最強度:</p>
          </div>
          <div className="pointCardFooterButton">
            <Button className="pointCardFooterDetail" href={"/"}>
              詳細
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PointCard;
