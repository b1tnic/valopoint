import PointCard from "../components/PointCard";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  getDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/HomePage.css";
import { Maps, Characters, IconOption } from "../static/options";

const Home = () => {
  const [article, setArticle] = useState([]);
  const [map, setMap] = useState("");
  const [character, setCharacter] = useState("");
  useEffect(() => {
    const getArticle = async () => {
      const articlesDocumentationRef = doc(
        db,
        "articles",
        "T0EjKXjnXXLwFtbxVPWe"
      );
      const articleDoc = await getDoc(articlesDocumentationRef);
      setArticle(articleDoc.data());
    };
    getArticle();
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} xs={{ span: 10, offset: 1 }}>
            <Row>
              <Col
                className="homePageSearchComponent"
                lg={{ span: 10, offset: 1 }}
                xs={{ span: 12, offset: 0 }}
              >
                <Select
                  options={Maps}
                  components={{ Option: IconOption }}
                  placeholder="マップを選択"
                  onChange={(value) => {
                    setMap(value);
                  }}
                />
              </Col>
              <Col
                className="homePageSearchComponent"
                lg={{ span: 10, offset: 1 }}
                xs={{ span: 12, offset: 0 }}
              >
                <Select
                  options={Characters}
                  components={{ Option: IconOption }}
                  placeholder="キャラを選択"
                  onChange={(value) => {
                    setCharacter(value);
                  }}
                />
              </Col>
              <Col
                className="homePageSearchComponent"
                lg={{ span: 6, offset: 3 }}
                xs={{ span: 8, offset: 2 }}
              >
                <Button className="homePageSearchButton">検索！</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="homePagePointCardSection">
          <Col
            className="homePagePointCard"
            xl={{ span: 4, offset: 1 }}
            xs={{ span: 8, offset: 2 }}
          >
            <PointCard></PointCard>
          </Col>
          <Col
            className="homePagePointCard"
            xl={{ span: 4, offset: 1 }}
            xs={{ span: 8, offset: 2 }}
          >
            <PointCard></PointCard>
          </Col>
          <Col
            className="homePagePointCard"
            xl={{ span: 4, offset: 1 }}
            xs={{ span: 8, offset: 2 }}
          >
            <PointCard></PointCard>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
