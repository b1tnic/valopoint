import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import YouTube from "react-youtube";
import style from "../css/Youtube.module.css";
import "../css/DetailPage.css";

const Detail = (props) => {
  return (
    <>
      <Row className="detailPageBackGround">
        <Col
          className="detailPageTitleBox"
          xl={{ span: 8, offset: 2 }}
          xs={{ span: 10, offset: 1 }}
        >
          <p className="detailPageTitle">このリコンはテストです。</p>
        </Col>
        <Col xl={{ span: 4, offset: 4 }} xs={{ span: 8, offset: 2 }}>
          <YouTube
            videoId="ejIY4wfZhgg"
            className={style.iframe}
            containerClassName={style.youtube}
          />
        </Col>
        <Col
          className="detailPageExplainBox"
          xl={{ span: 8, offset: 2 }}
          xs={{ span: 10, offset: 1 }}
        >
          <p className="detailPageExplain">
            このリコンはテストです。このリコンはテストです。このリコンはテストです。このリコンはテストです。このリコンはテストです。
          </p>
        </Col>
      </Row>
    </>
  );
};

export default Detail;
