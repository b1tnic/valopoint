import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "../css/Navbar.css";
import { Postcard, Person } from "react-bootstrap-icons";

const NavbarDefault = () => {
  return (
    <>
      <Navbar className="navbarDefault" expand="lg">
        <Navbar.Brand href="/" className="navbarBrand">
          ValoPoint
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link className="navbarLink" href="/posts">
            <Postcard
              className="navbarIcon"
              color="royalblue"
              size={24}
            ></Postcard>
            記事一覧
          </Nav.Link>
          <Nav.Link className="navbarLink" href="/suspects">
            <Person className="navbarIcon" color="royalblue" size={24}></Person>
            このサイトについて
          </Nav.Link>
        </Nav>
        <Button
          className="navbarPostButton"
          variant="outline-success"
          href="/create"
        >
          投稿！
        </Button>
      </Navbar>
    </>
  );
};

export default NavbarDefault;
