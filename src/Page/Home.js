import PointCard from "../components/PointCard";
import QueryCount from "../components/QueryCount";
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
  getCountFromServer,
} from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/HomePage.css";
import { Maps, Characters, IconOption } from "../static/options";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [lastArticle, setLastArticle] = useState([]);
  const [map, setMap] = useState("");
  const [ability, setAbility] = useState("");
  const [character, setCharacter] = useState("");
  const [category, setCategory] = useState("");
  const [side, setSide] = useState("");
  const [characterSelected, setCharacterSelected] = useState(false);
  const [selectedCharacterAbility, setSelectedCharacterAbility] = useState([]);
  const [ifClickedCharacterAbility, setIfClickedCharacterAbility] =
    useState(false);
  const [clickedCharacterAbilityNumber, setClickedCharacterAbilityNumber] =
    useState();
  const [ifBeginnerCategoryClicked, setIfBeginnerCategoryClicked] =
    useState(false);
  const [ifIntermediateCategoryClicked, setIfIntermediateCategoryClicked] =
    useState(false);
  const [ifSeniorCategoryClicked, setIfSeniorCategoryClicked] = useState(false);
  const [ifOtakuCategoryClicked, setIfOtakuCategoryClicked] = useState(false);
  const [articleCount, setArticleCount] = useState(0);

  const articlesCollectionRef = collection(db, "articles");

  // 検索関数searchingArticles
  const searchingArticles = async () => {
    let searchingArticlesQuery = query(articlesCollectionRef, limit(10));
    if (ability !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("ability", "==", ability)
      );
    }
    if (character !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("character", "==", character.value)
      );
    }
    if (side !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("side", "==", side)
      );
    }
    if (category !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("category", "==", category)
      );
    }
    if (map !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("map", "==", map)
      );
    }
    const articleData = await getDocs(searchingArticlesQuery);
    const articleCount = await getCountFromServer(searchingArticlesQuery);
    setArticleCount(articleCount.data().count);
    setArticles(articleData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
      const articleCount = await getCountFromServer(
        query(articlesCollectionRef)
      );
      const articleDocs = await getDocs(q);
      setLastArticle(articleDocs.docs[articleDocs.docs.length - 1]);
      setArticles(
        articleDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setArticleCount(articleCount.data().count);
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
                  onChange={(map) => {
                    setMap(map.value);
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
                  onChange={(character) => {
                    setCharacter(character);
                    setCharacterSelected(true);
                    setSelectedCharacterAbility(character.ability);
                    setClickedCharacterAbilityNumber();
                  }}
                />
              </Col>
              {characterSelected && (
                <>
                  <Col
                    lg={{ span: 10, offset: 1 }}
                    xs={{ span: 12, offset: 0 }}
                  >
                    <Row>
                      {selectedCharacterAbility.map((ability, index) => {
                        return (
                          <div className="mapPageAbilityBox" key={ability}>
                            <Col
                              lg={{ span: 3, offset: 0 }}
                              xs={{ span: 4, offset: 0 }}
                            >
                              <img
                                src={require("../static/images/abilities/" +
                                  character.value +
                                  "/" +
                                  ability +
                                  ".jpg")}
                                style={{ width: 128 }}
                                alt={"Ability"}
                                onClick={() => {
                                  clickedCharacterAbilityNumber === index
                                    ? setClickedCharacterAbilityNumber()
                                    : setClickedCharacterAbilityNumber(index);
                                  setAbility(ability);
                                  setIfClickedCharacterAbility(
                                    !ifClickedCharacterAbility
                                  );
                                }}
                                className={
                                  index === clickedCharacterAbilityNumber
                                    ? "mapPageAbilityIconClicked"
                                    : "mapPageAbilityIconNotClicked"
                                }
                              />
                            </Col>
                          </div>
                        );
                      })}
                    </Row>
                  </Col>
                </>
              )}
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
                        setIfIntermediateCategoryClicked(false);
                        setIfSeniorCategoryClicked(false);
                        setIfOtakuCategoryClicked(false);
                        setCategory("初心者");
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
                        setIfBeginnerCategoryClicked(false);
                        setIfIntermediateCategoryClicked(
                          !ifIntermediateCategoryClicked
                        );
                        setIfSeniorCategoryClicked(false);
                        setIfOtakuCategoryClicked(false);
                        setCategory("中級者");
                      }}
                    >
                      中級者
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
                        setIfBeginnerCategoryClicked(false);
                        setIfIntermediateCategoryClicked(false);
                        setIfSeniorCategoryClicked(!ifSeniorCategoryClicked);
                        setIfOtakuCategoryClicked(false);
                        setCategory("上級者");
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
                        setIfBeginnerCategoryClicked(false);
                        setIfIntermediateCategoryClicked(false);
                        setIfSeniorCategoryClicked(false);
                        setIfOtakuCategoryClicked(!ifOtakuCategoryClicked);
                        setCategory("オタク");
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
                <Button
                  className="homePageSearchButton"
                  onClick={searchingArticles}
                >
                  検索！
                </Button>
              </Col>
              <Col
                className="homePageSearchComponent"
                lg={{ span: 8, offset: 2 }}
                xs={{ span: 12, offset: 0 }}
              >
                <QueryCount count={articleCount}></QueryCount>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="homePagePointCardSectionBackground">
          <Col xl={{ span: 10, offset: 1 }} xs={{ span: 12, offset: 0 }}>
            <Row>
              <Col xl={{ span: 10, offset: 1 }} xs={{ span: 12, offset: 0 }}>
                <Row className="homePagePointCardSection">
                  <>
                    {articles.map((article) => (
                      <Col
                        className="homePagePointCard"
                        style={{ paddingLeft: 15, paddingRight: 15 }}
                        xl={{ span: 6, offset: 0 }}
                        xs={{ span: 6, offset: 0 }}
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
