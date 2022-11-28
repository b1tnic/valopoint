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
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/HomePage.css";
import { Maps, Characters, IconOption } from "../static/options";
import { Rainbow } from "react-bootstrap-icons";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [lastArticle, setLastArticle] = useState([]);
  const [map, setMap] = useState("");
  const [character, setCharacter] = useState("");
  const [ifBeginnerCategoryClicked, setIfBeginnerCategoryClicked] =
    useState(false);
  const [ifIntermediateCategoryClicked, setIfIntermediateCategoryClicked] =
    useState(false);
  const [ifSeniorCategoryClicked, setIfSeniorCategoryClicked] = useState(false);
  const [ifOtakuCategoryClicked, setIfOtakuCategoryClicked] = useState(false);

  const articlesCollectionRef = collection(db, "articles");

  // 検索関数searchingArticles
  const seatchingArticles = async () => {
    const searchingArticlesQuery = query(articlesCollectionRef);
    // if (ability !== "") {
    //   searchingArticlesQuery = query(
    //     searchingArticlesQuery,
    //     where("ability", "==", map)
    //   );
    // }
    if (character !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("character", "==", map)
      );
    }
    // if (side !== "") {
    //   searchingArticlesQuery = query(
    //     searchingArticlesQuery,
    //     where("side", "==", map)
    //   );
    // }
    if (map !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("map", "==", map)
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
      const q = query(articlesCollectionRef, limit(10));
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
                  <Col lg={{ span: 3, offset: 0 }} xs={{ span: 3, offset: 0 }}>
                    <Button
                      className={
                        ifBeginnerCategoryClicked
                          ? "beginnerClicked"
                          : "notBeginnerClicked"
                      }
                      onClick={() => {
                        setIfBeginnerCategoryClicked(
                          !ifBeginnerCategoryClicked
                        );
                      }}
                    >
                      初心者
                    </Button>
                  </Col>
                  <Col lg={{ span: 3, offset: 0 }} xs={{ span: 3, offset: 0 }}>
                    <Button
                      className={
                        ifIntermediateCategoryClicked
                          ? "intermediateClicked"
                          : "notIntermediateClicked"
                      }
                      onClick={() => {
                        setIfIntermediateCategoryClicked(
                          !ifIntermediateCategoryClicked
                        );
                      }}
                    >
                      中級物
                    </Button>
                  </Col>
                  <Col lg={{ span: 3, offset: 0 }} xs={{ span: 3, offset: 0 }}>
                    <Button
                      className={
                        ifSeniorCategoryClicked
                          ? "seniorClicked"
                          : "notSeniorClicked"
                      }
                      onClick={() => {
                        setIfSeniorCategoryClicked(!ifSeniorCategoryClicked);
                      }}
                    >
                      上級者
                    </Button>
                  </Col>
                  <Col lg={{ span: 3, offset: 0 }} xs={{ span: 3, offset: 0 }}>
                    <Button
                      className={
                        ifOtakuCategoryClicked
                          ? "otakuClicked"
                          : "notOtakuClicked"
                      }
                      onClick={() => {
                        setIfOtakuCategoryClicked(!ifOtakuCategoryClicked);
                      }}
                    >
                      オタク
                    </Button>
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
        <Row className="homePagePointCardSectionBackground">
          <Col xl={{ span: 10, offset: 1 }} xs={{ span: 10, offset: 1 }}>
            <Row>
              <Col xl={{ span: 10, offset: 1 }} xs={{ span: 12, offset: 0 }}>
                <Row className="homePagePointCardSection">
                  <>
                    {articles.map((article) => (
                      <Col
                        className="homePagePointCard"
                        style={{ paddingLeft: 15, paddingRight: 15 }}
                        xl={{ span: 6, offset: 0 }}
                        xs={{ span: 12, offset: 0 }}
                        key={article.id}
                      >
                        <PointCard
                          category={article.category}
                          character={article.character}
                          ability={article.ability}
                          side={article.side}
                          title={article.title}
                          thumbnail={article.thumbnail}
                          videoID={article.videoID}
                          readTime={article.readTime}
                          id={article.id}
                        ></PointCard>
                      </Col>
                    ))}
                  </>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
