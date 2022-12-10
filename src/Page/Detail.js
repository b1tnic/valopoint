import { db } from "../firebase-config";
import RelatedPointCard from "../components/RelatedPointCard";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import YouTube from "react-youtube";
import style from "../css/Youtube.module.css";
import "../css/DetailPage.css";
import {
  doc,
  collection,
  query,
  limit,
  getDoc,
  getDocs,
  orderBy,
  startAfter,
  limitToLast,
  endBefore,
} from "firebase/firestore";

const Detail = (props) => {
  const [article, setArticle] = useState({});
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [ifLoading, setIfLoading] = useState(false);
  const { id } = useParams();
  const articlesCollectionRef = collection(db, "articles");
  const articleDocumentationRef = doc(db, "articles", id);
  const realatedArticlesLimit = 2;

  useEffect(() => {
    const getArticle = async () => {
      const docSnap = await getDoc(articleDocumentationRef);
      setArticle({ ...docSnap.data(), id: docSnap.id });
      setThumbnail(docSnap.data().thumbnail);
    };
    getArticle();
  }, []);

  useEffect(() => {
    const getRelatedArticle = async () => {
      const q1 = query(
        articlesCollectionRef,
        orderBy("thumbnail", "desc"),
        limit(realatedArticlesLimit),
        startAfter(thumbnail)
      );
      const q2 = query(
        articlesCollectionRef,
        orderBy("thumbnail", "desc"),
        limitToLast(realatedArticlesLimit),
        endBefore(thumbnail)
      );
      const relatedDocSnaps1 = await getDocs(q1);
      const relatedDocSnaps2 = await getDocs(q2);
      const relatedDocSnaps = await relatedDocSnaps1.docs.concat(
        relatedDocSnaps2.docs
      );
      setRelatedArticles(
        relatedDocSnaps.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setIfLoading(true);
    };
    getRelatedArticle();
  }, [thumbnail]);

  return (
    <>
      {!ifLoading && <Loading />}
      {ifLoading && (
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
              <p className="detailPageExplain">
                管理人メモ：{article.description}
              </p>
            </Col>
          </Row>
          <Row>
            <Col
              className="detailPagePointCardBackGround"
              xl={{ span: 8, offset: 2 }}
              xs={{ span: 12, offset: 0 }}
            >
              <Row>
                {relatedArticles.map((article) => (
                  <Col
                    className="detailPagePointCard"
                    xl={{ span: 3, offset: 0 }}
                    xs={{ span: 3, offset: 0 }}
                    key={article.id}
                  >
                    <RelatedPointCard
                      thumbnail={article.thumbnail}
                      title={article.title}
                      id={article.id}
                      side={article.side}
                      character={article.character}
                      readTime={article.readTime}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Detail;
