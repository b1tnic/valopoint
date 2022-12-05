import "../css/QueryCount.css";

const PointCard = (props) => {
  return (
    <>
      <p className="queryCountText">{props.count}個の定点が見つかりました！</p>
    </>
  );
};

export default PointCard;
