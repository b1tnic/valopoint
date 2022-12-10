import "../css/Footer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <>
      {" "}
      <div className="footer">
        <Row>
          <Col xl={{ span: 6, offset: 3 }}>
            {" "}
            <div className="footerTitleDescription">
              「定点」をまとめている国内最大級のサイト -ValoPoint-
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={{ span: 6, offset: 3 }}>
            {" "}
            <div className="footerLinks">
              <ul>
                <a href="/">
                  <li>ValoPoint</li>
                </a>
                <li>Twitter</li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={{ span: 4, offset: 5 }} xs={{ span: 10, offset: 1 }}>
            <div className="footerTitle">2022 ValoPoint.com</div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Footer;
