import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "../css/Navbar.css";
import { Postcard, Person } from "react-bootstrap-icons";

const NavbarDefault = () => {
  return (
    <>
      <Navbar bg="light" className="navbarDefault" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="navbarBrand">
            ValoPoint
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="navbarLink" href="/posts">
                アセント
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/posts">
                バインド
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/posts">
                ヘイブン
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/posts">
                スプリット
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/posts">
                アイスボックス
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/posts">
                ブリーズ
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/posts">
                フラクチャー
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/posts">
                パール
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarDefault;
