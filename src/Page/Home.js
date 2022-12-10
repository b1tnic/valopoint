import PointCard from "../components/PointCard";
import Footer from "../components/Footer";
import QueryCount from "../components/QueryCount";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  limitToLast,
  endBefore,
  startAfter,
  orderBy,
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
  const [map, setMap] = useState("");
  const [ability, setAbility] = useState("");
  const [character, setCharacter] = useState("");
  const [category, setCategory] = useState("");
  const [ifMapSearched, setIfMapSearched] = useState(false);
  const [ifAbilitySearched, setIfAbilitySearched] = useState(false);
  const [ifCharacterSearched, setIfCharacterSearched] = useState(false);
  const [ifCategorySearched, setIfCategorySearched] = useState(false);
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
  const [firstArticle, setFirstArticle] = useState("");
  const [lastArticle, setLastArticle] = useState("");
  const articleLimit = 10;
  const [page, setPage] = useState(0);
  const [articlePageMaxLimit, setArticlePageMaxLimit] = useState(0);
  const [ifLoading, setIfLoading] = useState(false);

  const articlesCollectionRef = collection(db, "articles");

  // 検索関数searchingArticles
  const searchingArticles = async () => {
    setIfAbilitySearched("");
    setIfCharacterSearched("");
    setIfCategorySearched("");
    setIfMapSearched("");
    let searchingArticlesQuery = query(
      articlesCollectionRef,
      orderBy("videoID", "desc")
    );
    if (ability !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("ability", "==", ability)
      );
      setIfAbilitySearched(true);
    }
    if (character !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("character", "==", character.value)
      );
      setIfCharacterSearched(true);
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
      setIfCategorySearched(true);
    }
    if (map !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("map", "==", map)
      );
      setIfMapSearched(true);
    }
    const articleCount = await getCountFromServer(searchingArticlesQuery);
    setArticleCount(articleCount.data().count);
    searchingArticlesQuery = query(searchingArticlesQuery, limit(articleLimit));
    const articleData = await getDocs(searchingArticlesQuery);
    setLastArticle(
      articleData.docs[articleData.docs.length - 1].data().videoID
    );
    if (articleData.docs.length !== 0) {
      setArticles(
        articleData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } else {
      setArticles([]);
    }
    setPage(0);
    await setArticlePageMaxLimit(
      Math.floor(articleCount.data().count / articleLimit)
    );
  };

  // ページネーション関数loadNextArticles
  const loadNextArticles = async () => {
    setPage(page + 1);
    let nextArticlesQuery = query(
      articlesCollectionRef,
      orderBy("videoID", "desc"),
      limit(articleLimit)
    );
    if (ifAbilitySearched) {
      nextArticlesQuery = query(
        nextArticlesQuery,
        where("ability", "==", ability)
      );
    }
    if (ifCharacterSearched) {
      nextArticlesQuery = query(
        nextArticlesQuery,
        where("character", "==", character.value)
      );
    }
    if (ifCategorySearched) {
      nextArticlesQuery = query(
        nextArticlesQuery,
        where("category", "==", category)
      );
    }
    if (ifMapSearched) {
      nextArticlesQuery = query(nextArticlesQuery, where("map", "==", map));
    }
    nextArticlesQuery = query(nextArticlesQuery, startAfter(lastArticle));
    const nextArticles = await getDocs(nextArticlesQuery);
    setFirstArticle(nextArticles.docs[0].data().videoID);
    setLastArticle(
      nextArticles.docs[nextArticles.docs.length - 1].data().videoID
    );
    setArticles(
      nextArticles.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  // ページネーション関数loadPastArticles
  const loadPastArticles = async () => {
    setPage(page - 1);
    let pastArticlesQuery = query(
      articlesCollectionRef,
      orderBy("videoID", "desc"),
      limitToLast(articleLimit)
    );
    if (ifAbilitySearched) {
      pastArticlesQuery = query(
        pastArticlesQuery,
        where("ability", "==", ability)
      );
    }
    if (ifCharacterSearched) {
      pastArticlesQuery = query(
        pastArticlesQuery,
        where("character", "==", character.value)
      );
    }
    if (ifCategorySearched) {
      pastArticlesQuery = query(
        pastArticlesQuery,
        where("category", "==", category)
      );
    }
    if (ifMapSearched) {
      pastArticlesQuery = query(pastArticlesQuery, where("map", "==", map));
    }
    pastArticlesQuery = query(pastArticlesQuery, endBefore(firstArticle));
    const pastArticles = await getDocs(pastArticlesQuery);
    setFirstArticle(pastArticles.docs[0].data().videoID);
    setLastArticle(
      pastArticles.docs[pastArticles.docs.length - 1].data().videoID
    );
    setArticles(
      pastArticles.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    const getArticle = async () => {
      const q = query(
        articlesCollectionRef,
        orderBy("videoID", "desc"),
        limit(articleLimit)
      );
      const articleDocs = await getDocs(q);
      const articleCount = await getCountFromServer(
        query(articlesCollectionRef)
      );
      setArticleCount(articleCount.data().count);
      await setLastArticle(
        articleDocs.docs[articleDocs.docs.length - 1].data().videoID
      );
      setArticles(
        articleDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      await setArticlePageMaxLimit(
        Math.floor(articleCount.data().count / articleLimit)
      );
      await setIfLoading(true);
    };
    getArticle();
  }, []);
  return (
    <>
      {!ifLoading && <Loading />}
      {ifLoading && (
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
                      setAbility("");
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
                                    if (
                                      clickedCharacterAbilityNumber === index
                                    ) {
                                      setClickedCharacterAbilityNumber();
                                      setIfClickedCharacterAbility(
                                        !ifClickedCharacterAbility
                                      );
                                      setAbility("");
                                    } else {
                                      setClickedCharacterAbilityNumber(index);
                                      setIfClickedCharacterAbility(true);
                                      setAbility(ability);
                                    }
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
                    <Col
                      lg={{ span: 3, offset: 0 }}
                      xs={{ span: 3, offset: 0 }}
                    >
                      <Button
                        className={
                          ifBeginnerCategoryClicked
                            ? "beginnerClicked"
                            : "notBeginnerClicked"
                        }
                        onClick={() => {
                          if (ifBeginnerCategoryClicked) {
                            setCategory("");
                          } else {
                            setCategory("初心者");
                          }
                          setIfBeginnerCategoryClicked(
                            !ifBeginnerCategoryClicked
                          );
                          setIfIntermediateCategoryClicked(false);
                          setIfSeniorCategoryClicked(false);
                          setIfOtakuCategoryClicked(false);
                        }}
                      >
                        初心者
                      </Button>
                    </Col>
                    <Col
                      lg={{ span: 3, offset: 0 }}
                      xs={{ span: 3, offset: 0 }}
                    >
                      <Button
                        className={
                          ifIntermediateCategoryClicked
                            ? "intermediateClicked"
                            : "notIntermediateClicked"
                        }
                        onClick={() => {
                          setIfBeginnerCategoryClicked(false);
                          if (ifIntermediateCategoryClicked) {
                            setCategory("");
                          } else {
                            setCategory("中級者");
                          }
                          setIfIntermediateCategoryClicked(
                            !ifIntermediateCategoryClicked
                          );
                          setIfSeniorCategoryClicked(false);
                          setIfOtakuCategoryClicked(false);
                        }}
                      >
                        中級者
                      </Button>
                    </Col>
                    <Col
                      lg={{ span: 3, offset: 0 }}
                      xs={{ span: 3, offset: 0 }}
                    >
                      <Button
                        className={
                          ifSeniorCategoryClicked
                            ? "seniorClicked"
                            : "notSeniorClicked"
                        }
                        onClick={() => {
                          setIfBeginnerCategoryClicked(false);
                          setIfIntermediateCategoryClicked(false);
                          if (ifSeniorCategoryClicked) {
                            setCategory("");
                          } else {
                            setCategory("上級者");
                          }
                          setIfSeniorCategoryClicked(!ifSeniorCategoryClicked);
                          setIfOtakuCategoryClicked(false);
                        }}
                      >
                        上級者
                      </Button>
                    </Col>
                    <Col
                      lg={{ span: 3, offset: 0 }}
                      xs={{ span: 3, offset: 0 }}
                    >
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
                          if (ifOtakuCategoryClicked) {
                            setCategory("");
                          } else {
                            setCategory("オタク");
                          }
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
                  xs={{ span: 8, offset: 2 }}
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
          <Row>
            <Col lg={{ span: 6, offset: 3 }} xs={{ span: 12, offset: 0 }}>
              {page == 0 ? (
                <></>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      loadPastArticles();
                    }}
                  >
                    前へ
                  </Button>
                </>
              )}
              <>
                {page * articleLimit + 1} ~ {(page + 1) * articleLimit}
              </>
              {page == articlePageMaxLimit ? (
                <></>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      loadNextArticles();
                    }}
                  >
                    次へ
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default Home;
