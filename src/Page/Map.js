import PointCard from "../components/PointCard";
import Loading from "../components/Loading";
import QueryCount from "../components/QueryCount";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  limitToLast,
  getCountFromServer,
  endBefore,
  startAfter,
  orderBy,
} from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/MapPage.css";
import { Characters, IconOption } from "../static/options";

const Map = () => {
  const { mapParam } = useParams();
  const [articles, setArticles] = useState([]);
  const [ability, setAbility] = useState("");
  const [character, setCharacter] = useState("");
  const [category, setCategory] = useState("");
  const [ifAbilitySearched, setIfAbilitySearched] = useState(false);
  const [ifCharacterSearched, setIfCharacterSearched] = useState(false);
  const [ifCategorySearched, setIfCategorySearched] = useState(false);
  const [side, setSide] = useState("");
  const [characterSelected, setCharacterSelected] = useState(false);
  const [selectedCharacterAbility, setSelectedCharacterAbility] = useState([]);
  const [clickedCharacterAbilityNumber, setClickedCharacterAbilityNumber] =
    useState();
  const [ifClickedCharacterAbility, setIfClickedCharacterAbility] =
    useState(false);
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

  let backgroundImage;
  if (mapParam === "Ascent") {
    backgroundImage = require("../static/images/maps/Ascent.jpg");
  } else if (mapParam === "Bind") {
    backgroundImage = require("../static/images/maps/Bind.jpg");
  } else if (mapParam === "Haven") {
    backgroundImage = require("../static/images/maps/Haven.jpg");
  } else if (mapParam === "Split") {
    backgroundImage = require("../static/images/maps/Split.jpg");
  } else if (mapParam === "Icebox") {
    backgroundImage = require("../static/images/maps/Icebox.jpg");
  } else if (mapParam === "Breeze") {
    backgroundImage = require("../static/images/maps/Breeze.jpg");
  } else if (mapParam === "Fracture") {
    backgroundImage = require("../static/images/maps/Fracture.jpg");
  } else if (mapParam === "Pearl") {
    backgroundImage = require("../static/images/maps/Pearl.jpg");
  }

  const articlesCollectionRef = collection(db, "articles");

  // 検索関数searchingArticles
  const searchingArticles = async () => {
    setIfAbilitySearched("");
    setIfCharacterSearched("");
    setIfCategorySearched("");
    let searchingArticlesQuery = query(
      articlesCollectionRef,
      orderBy("videoID", "desc"),
      where("map", "==", mapParam)
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
    const articleCount = await getCountFromServer(
      query(searchingArticlesQuery)
    );
    setArticleCount(articleCount.data().count);
    searchingArticlesQuery = query(searchingArticlesQuery, limit(articleLimit));
    const articleData = await getDocs(searchingArticlesQuery);
    if (articleData.docs.length !== 0) {
      setArticles(
        articleData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } else {
      setArticles([]);
    }
  };

  // ページネーション関数loadNextArticles
  const loadNextArticles = async () => {
    setPage(page + 1);
    let nextArticlesQuery = query(
      articlesCollectionRef,
      where("map", "==", mapParam),
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
    nextArticlesQuery = query(nextArticlesQuery, startAfter(lastArticle));
    const nextArticles = await getDocs(nextArticlesQuery);
    setFirstArticle(nextArticles.docs[0].data().videoID);
    setLastArticle(
      nextArticles.docs[nextArticles.docs.length - 1].data().videoID
    );
    setArticles(
      nextArticles.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
    console.log(lastArticle);
  };

  // ページネーション関数loadPastArticles
  const loadPastArticles = async () => {
    setPage(page - 1);
    let pastArticlesQuery = query(
      articlesCollectionRef,
      where("map", "==", mapParam),
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
        where("map", "==", mapParam),
        limit(articleLimit)
      );
      const articleDocs = await getDocs(q);
      const articleCount = await getCountFromServer(
        query(articlesCollectionRef, where("map", "==", mapParam))
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
    };
    getArticle();
    setIfLoading(true);
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
                  className="mapPageSearchComponent"
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
                  className="mapPageSearchComponent"
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
                  className="mapPageSearchComponent"
                  lg={{ span: 6, offset: 3 }}
                  xs={{ span: 8, offset: 2 }}
                >
                  <Button
                    className="mapPageSearchButton"
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
          <Row
            className="mapPagePointCardSectionBackground"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <Col xl={{ span: 10, offset: 1 }} xs={{ span: 10, offset: 1 }}>
              <Row>
                <Col xl={{ span: 10, offset: 1 }} xs={{ span: 12, offset: 0 }}>
                  <Row className="mapPagePointCardSection">
                    <>
                      {articles.map((article) => (
                        <Col
                          className="mapPagePointCard"
                          style={{ paddingLeft: 24, paddingRight: 24 }}
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
    </>
  );
};

export default Map;
