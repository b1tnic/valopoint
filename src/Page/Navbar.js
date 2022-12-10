import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import "../css/Navbar.css";

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
              <Nav.Link className="navbarLink" href="/Map/Ascent">
                アセント
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/Map/Bind">
                バインド
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/Map/Haven">
                ヘイブン
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/Map/Split">
                スプリット
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/Map/Icebox">
                アイスボックス
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/Map/Breeze">
                ブリーズ
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/Map/Fracture">
                フラクチャー
              </Nav.Link>
              <Nav.Link className="navbarLink" href="/Map/Pearl">
                パール
              </Nav.Link>
            </Nav>
            <Nav>
              <Dropdown className="ms-auto">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  サイトリンク
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/Explain">
                    当サイトについて
                  </Dropdown.Item>
                  <Dropdown.Item href="/Inquiry">お問い合わせ</Dropdown.Item>
                  <Dropdown.Item href="/">サイトSNS</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarDefault;
