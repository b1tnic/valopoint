import React, { useState } from "react";
import Footer from "../components/Footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Explain.css";

const Explain = () => {
  return (
    <>
      <Row style={{ marginTop: 30 }}>
        <Col lg={{ span: 8, offset: 2 }} xs={{ span: 10, offset: 1 }}>
          <h1>定点を扱う国内最大級のサイト -ValoPoint-</h1>
        </Col>
      </Row>
      <div className="explainPageBackGround">
        <Row style={{ marginTop: 30 }}>
          <Col lg={{ span: 10, offset: 1 }} xs={{ span: 10, offset: 1 }}>
            <h1>サイト概要</h1>
            <div className="explainPageDetail">
              <p>
                当サイトはFPSゲーム「Valorant」における定点を「ピンポイントで欲しい定点だけを知りたい」という人向けにキャラ、アビリティー、マップ、難易度で検索できるようになっています。
              </p>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 30 }}>
          <Col lg={{ span: 10, offset: 1 }} xs={{ span: 10, offset: 1 }}>
            <h1>難易度について</h1>
            <div className="explainPageDetail">
              <p>管理人の主観で各定点に難易度を設定しております。</p>
              <p>初心者：一試合に複数回使う機会のある基本的な空爆。</p>
              <p>
                中級者：一試合に一度は使う機会がある覚えておいて損はない空爆。ここまで覚えると文句は言われないだろう。
              </p>
              <p>
                上級者：数試合に一度使う機会があるか分からない空爆。覚えてなくても問題はない。
              </p>
              <p>
                オタク：完全に使う機会のない空爆。覚えていたらオタクアピールが出来る。
              </p>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 30 }}>
          <Col lg={{ span: 10, offset: 1 }} xs={{ span: 10, offset: 1 }}>
            <h1>管理人メモについて</h1>
            <div className="explainPageDetail">
              <p>
                管理人の主観で各定点について思った事を管理人メモとして残しています。気に入らない点があればお問い合わせページでお送りください。
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Explain;
