import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import YouTube from "react-youtube";
import style from "../css/Youtube.module.css";
import "../css/DetailPage.css";
import { doc, DocumentSnapshot, getDoc } from "firebase/firestore";

const Detail = (props) => {
  const [article, setArticle] = useState({});
  const { id } = useParams();
  const articleDocumentationRef = doc(db, "articles", id);

  useEffect(() => {
    const getArticle = async () => {
      const docSnap = await getDoc(articleDocumentationRef);
      setArticle({ ...docSnap.data(), id: docSnap.id });
      console.log("No such document!");
    };
    getArticle();
    console.log(article);
  }, []);

  return (
    <>
      <Row className="detailPageBackGround">
        <Col
          className="detailPageTitleBox"
          xl={{ span: 8, offset: 2 }}
          xs={{ span: 10, offset: 1 }}
        >
          <p className="detailPageTitle">{article.title}</p>
        </Col>
        <Col xl={{ span: 4, offset: 4 }} xs={{ span: 8, offset: 2 }}>
          <YouTube
            videoId={article.videoID}
            className={style.iframe}
            containerClassName={style.youtube}
          />
        </Col>
        <Col
          className="detailPageExplainBox"
          xl={{ span: 8, offset: 2 }}
          xs={{ span: 10, offset: 1 }}
        >
          <p className="detailPageExplain">{article.description}</p>
        </Col>
      </Row>
    </>
  );
};

export default Detail;
