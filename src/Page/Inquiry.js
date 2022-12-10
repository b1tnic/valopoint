import React, { useState } from "react";
import Footer from "../components/Footer";
import { collection, addDoc } from "firebase/firestore";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { db } from "../firebase-config";
import Select from "react-select";
import { Questions } from "../static/options";
import Form from "react-bootstrap/Form";
import "../css/Inquiry.css";

const Inquiry = () => {
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "inquiries"), {
        category: category,
        description: description,
      });
      alert("投稿しました！ありがとうございます！３秒後に移動します・・・");
      function action() {
        window.location.href = "../";
      }
      setTimeout(action, 1000);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Row style={{ marginTop: 30 }}>
        <Col lg={{ span: 8, offset: 2 }} xs={{ span: 10, offset: 1 }}>
          {" "}
          <h1>お問い合わせ</h1>
          <Form onSubmit={handleSubmit}>
            <div className="inquiryPageFormComponent">
              <Form.Label>問い合わせ内容を選んでください…</Form.Label>
              <Select
                required
                options={Questions}
                onChange={(value) => {
                  setCategory(value.value);
                }}
              />
            </div>
            <div className="inquiryPageFormComponent">
              <Form.Label>内容(600字以内)</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows="10"
                name="Description"
                value={description}
                placeholder="説明を入力"
                maxLength="600"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button>投稿する</button>
          </Form>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default Inquiry;
