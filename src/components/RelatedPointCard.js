import "../css/relatedPointCard.css";
import { Clock } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

const RelatedPointCard = (props) => {
  let min = String(Math.floor(props.readTime / 60));
  let sec = String(props.readTime % 60);

  return (
    <>
      <div className="relatedPointCard">
        <a href={props.id}>
          <img
            src={require("../static/images/thumbnails/" +
              props.thumbnail +
              ".jpg")}
            className="relatedPointCardThumbnail"
            alt={"Thumbnail"}
          ></img>
          <img
            src={require("../static/images/characters/" +
              props.character +
              ".jpg")}
            className="relatedPointCardContentThumbnailCharacter"
            alt={"Character"}
          ></img>
          <div className="relatedPointCardSideArea">
            <img
              src={require("../static/images/sides/" + props.side + ".jpg")}
              className="relatedPointCardSide"
              alt={"Side"}
            ></img>
          </div>
          <div className="relatedPointCardTime">
            {min}:{sec}
          </div>
        </a>
        <p>{props.title}</p>
      </div>
    </>
  );
};

export default RelatedPointCard;
