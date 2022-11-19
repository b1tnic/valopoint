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
import "../css/HomePage.css";
import { Maps, Characters, IconOption } from "../static/options";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [lastArticle, setLastArticle] = useState([]);
  const [map, setMap] = useState("");
  const [character, setCharacter] = useState("");
  const [orderByPopular, setOrderByPopular] = useState(false);
  const [orderByStrength, setOrderByStrength] = useState(false);

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
    if (orderByPopular) {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        orderBy("popular", "desc")
      );
    }
    if (orderByStrength) {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        orderBy("strength", "desc")
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
                lg={{ span: 8, offset: 2 }}
                xs={{ span: 10, offset: 1 }}
              >
                <Row>
                  <Col lg={{ span: 2, offset: 0 }} xs={{ span: 2, offset: 0 }}>
                    <p className="homePageSwitchingText">並び替え</p>
                  </Col>
                  <Col lg={{ span: 4, offset: 0 }} xs={{ span: 4, offset: 0 }}>
                    <BootstrapSwitchButton
                      orderByStrength={false}
                      onlabel="最強度"
                      offlabel="最強度"
                      onChange={() => setOrderByStrength(!orderByStrength)}
                      width={175}
                    />
                  </Col>
                  <Col lg={{ span: 4, offset: 0 }} xs={{ span: 4, offset: 0 }}>
                    <BootstrapSwitchButton
                      orderByPopular={false}
                      onlabel="知名度"
                      offlabel="知名度"
                      onChange={() => setOrderByPopular(!orderByPopular)}
                      width={175}
                    />
                  </Col>
                </Row>
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
