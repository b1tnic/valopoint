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
  startAfter,
  getDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/MapPage.css";
import { Maps, Characters, IconOption } from "../static/options";
import backgroundImage from "../static/images/icons/ascent.jpg";

const Map = () => {
  const [articles, setArticles] = useState([]);
  const [lastArticle, setLastArticle] = useState([]);
  const [map, setMap] = useState("");
  const [character, setCharacter] = useState("");

  const articlesCollectionRef = collection(db, "articles");

  // 検索関数searchingArticles
  const seatchingArticles = async () => {
    const searchingArticlesQuery = query(articlesCollectionRef);
    if (map !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("map", "==", map)
      );
    }
    if (character !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("character", "==", character)
      );
    }
  };

  // ページネーション関数loadNextPosts
  const loadNextArticles = async () => {
    const nextArticlesQuery = query(
      articlesCollectionRef,
      orderBy("popular", "desc"),
      startAfter(lastArticle),
      limit(10)
    );
    const nextArticles = await getDocs(nextArticlesQuery);
    setLastArticle(nextArticles.docs[nextArticles.docs.length - 1]);
    setArticles(
      nextArticles.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    const getArticle = async () => {
      const q = query(
        articlesCollectionRef,
        orderBy("popular", "desc"),
        limit(10)
      );
      const articleDocs = await getDocs(q);
      setLastArticle(articleDocs.docs[articleDocs.docs.length - 1]);
      setArticles(
        articleDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
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
                className="mapPageSearchComponent"
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
                className="mapPageSearchComponent"
                lg={{ span: 8, offset: 2 }}
                xs={{ span: 10, offset: 1 }}
              ></Col>
              <Col
                className="mapPageSearchComponent"
                lg={{ span: 6, offset: 3 }}
                xs={{ span: 8, offset: 2 }}
              >
                <Button className="mapPageSearchButton">検索！</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          className="mapPagePointCardSectionBackground"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <Col xl={{ span: 10, offset: 1 }} xs={{ span: 10, offset: 1 }}>
            <Row>
              <Col xl={{ span: 10, offset: 1 }} xs={{ span: 12, offset: 0 }}>
                <Row className="mapPagePointCardSection">
                  <Col
                    className="mapPagePointCard"
                    style={{ paddingLeft: 3, paddingRight: 3 }}
                    xl={{ span: 6, offset: 0 }}
                    xs={{ span: 12, offset: 0 }}
                  >
                    <PointCard></PointCard>
                  </Col>
                  <Col
                    className="mapPagePointCard"
                    style={{ paddingLeft: 3, paddingRight: 3 }}
                    xl={{ span: 6, offset: 0 }}
                    xs={{ span: 12, offset: 0 }}
                  >
                    <PointCard></PointCard>
                  </Col>
                  <Col
                    className="mapPagePointCard"
                    style={{ paddingLeft: 3, paddingRight: 3 }}
                    xl={{ span: 6, offset: 0 }}
                    xs={{ span: 12, offset: 0 }}
                  >
                    <PointCard></PointCard>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Map;
