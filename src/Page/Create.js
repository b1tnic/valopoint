import React, { useState } from "react";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  Timestamp,
} from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { db } from "../firebase-config";
import Select from "react-select";
import { Categories, Characters, Maps, IconOption } from "../static/options";
import Form from "react-bootstrap/Form";
import "../css/Create.css";

const Create = () => {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleCategory, setArticleCategory] = useState("");
  const [articleCharacter, setArticleCharacter] = useState("");
  const [articleMap, setArticleMap] = useState("");
  const [articleAbility, setArticleAbility] = useState("");
  const [articleSide, setArticleSide] = useState("");
  const [articleThumbnail, setArticleThumbnail] = useState("");
  const [articleVideoID, setArticleVideoID] = useState("");
  const [articleReadtime, setArticleReadTime] = useState();

  const [characterSelected, setCharacterSelected] = useState(false);
  const [selectedCharacterAbility, setSelectedCharacterAbility] = useState([]);
  const [clickedCharacterAbilityNumber, setClickedCharacterAbilityNumber] =
    useState();
  const [ifClickedCharacterAbility, setIfClickedCharacterAbility] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "articles"), {
        title: articleTitle,
        description: articleDescription,
        category: articleCategory,
        character: articleCharacter,
        map: articleMap,
        ability: articleAbility,
        side: articleSide,
        thumbnail: articleThumbnail,
        videoID: articleVideoID,
        readTime: articleReadtime,
      });
      alert("投稿しました！");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Row style={{ marginTop: 30 }}>
        <Col lg={{ span: 8, offset: 2 }} xs={{ span: 10, offset: 1 }}>
          {" "}
          <h1>投稿画面</h1>
          <Form onSubmit={handleSubmit}>
            <div className="createPageFormComponent">
              <Form.Label>タイトル</Form.Label>
              <Form.Control
                required
                as="textarea"
                name="Title"
                rows={1}
                value={articleTitle}
                placeholder="IDを入力"
                maxLength="24"
                onChange={(e) => setArticleTitle(e.target.value)}
              />
            </div>
            <div className="createPageFormComponent">
              <Form.Label>説明文</Form.Label>
              <Form.Control
                required
                as="textarea"
                name="Description"
                value={articleDescription}
                placeholder="説明を入力"
                maxLength="200"
                onChange={(e) => setArticleDescription(e.target.value)}
              />
            </div>
            <div className="createPageFormComponent">
              <Form.Label>サムネイル</Form.Label>
              <Form.Control
                required
                as="textarea"
                name="Description"
                rows={1}
                value={articleThumbnail}
                placeholder="サムネイル画像名を入力"
                maxLength="24"
                onChange={(e) => setArticleThumbnail(e.target.value)}
              />
            </div>
            <div className="createPageFormComponent">
              <Form.Label>動画ID</Form.Label>
              <Form.Control
                required
                as="textarea"
                name="Description"
                rows={1}
                value={articleVideoID}
                placeholder="動画IDを入力"
                maxLength="24"
                onChange={(e) => setArticleVideoID(e.target.value)}
              />
            </div>
            <div className="createPageFormComponent">
              <Form.Label>カテゴリ</Form.Label>
              <Select
                required
                options={Categories}
                onChange={(value) => {
                  setArticleCategory(value.value);
                }}
              />
            </div>
            <Select
              options={Characters}
              components={{ Option: IconOption }}
              placeholder="キャラを選択"
              onChange={(character) => {
                setArticleCharacter(character.value);
                setCharacterSelected(true);
                setSelectedCharacterAbility(character.ability);
                setClickedCharacterAbilityNumber();
              }}
              className="createPageFormComponent"
            />
            {characterSelected && (
              <>
                {selectedCharacterAbility.map((ability, index) => {
                  return (
                    <img
                      key={ability}
                      src={require("../static/images/abilities/" +
                        articleCharacter +
                        "/" +
                        ability +
                        ".jpg")}
                      style={{ width: 128 }}
                      alt={"Ability"}
                      onClick={() => {
                        clickedCharacterAbilityNumber === index
                          ? setClickedCharacterAbilityNumber()
                          : setClickedCharacterAbilityNumber(index);
                        setArticleAbility(ability);
                        setIfClickedCharacterAbility(
                          !ifClickedCharacterAbility
                        );
                      }}
                      className={
                        index === clickedCharacterAbilityNumber
                          ? "mapPageAbilityIconClicked createPageFormComponent"
                          : "mapPageAbilityIconNotClicked createPageFormComponent"
                      }
                    />
                  );
                })}
                {articleAbility}
              </>
            )}
            <div className="createPageFormComponent">
              <Form.Label>攻め　守り</Form.Label>
              <Button onClick={() => setArticleSide("Attacker")}>攻め</Button>
              <Button onClick={() => setArticleSide("Defender")}>守り</Button>
              {articleSide}
            </div>
            <div className="createPageFormComponent">
              <Form.Label>マップ</Form.Label>
              <Select
                required
                options={Maps}
                components={{ Option: IconOption }}
                onChange={(value) => {
                  setArticleMap(value.value);
                }}
              />
            </div>
            <div className="createPageFormComponent">
              <Form.Label>時間</Form.Label>
              <Button onClick={() => setArticleReadTime(15)}>15</Button>
              <Button onClick={() => setArticleReadTime(20)}>20</Button>
              <Button onClick={() => setArticleReadTime(30)}>30</Button>
              <Button onClick={() => setArticleReadTime(60)}>60</Button>
              {articleReadtime}
            </div>
            <button>投稿する</button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Create;
