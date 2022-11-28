import PointCard from "../components/PointCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import "../css/MapPage.css";
import { Characters, IconOption } from "../static/options";

const Map = () => {
  const { mapParam } = useParams();
  const [articles, setArticles] = useState([]);
  const [lastArticle, setLastArticle] = useState([]);
  const [ability, setAbility] = useState("");
  const [character, setCharacter] = useState("");
  const [side, setSide] = useState("");
  const [map, setMap] = useState("");
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
  const seatchingArticles = async () => {
    let searchingArticlesQuery = query(articlesCollectionRef, limit(10));
    if (ability !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("ability", "==", map)
      );
    }
    if (character !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("character", "==", map)
      );
    }
    if (side !== "") {
      searchingArticlesQuery = query(
        searchingArticlesQuery,
        where("side", "==", map)
      );
    }
    searchingArticlesQuery = query(
      searchingArticlesQuery,
      where("map", "==", mapParam)
    );
    const articleData = await getDocs(searchingArticlesQuery);
    setArticles(articleData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // ページネーション関数loadNextPosts
  const loadNextArticles = async () => {
    const nextArticlesQuery = query(
      articlesCollectionRef,
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
        where("map", "==", mapParam),
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
                </>
              )}
              <Col
                className="mapPageSearchComponent"
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
                  <>
                    {articles.map((article) => (
                      <Col
                        className="mapPagePointCard"
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

export default Map;
