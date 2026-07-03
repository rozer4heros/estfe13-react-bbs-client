import axios from "axios";
import { Link, useNavigate } from "react-router";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Write({}) {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/write", {
        name: e.target.name.value,
        title: e.target.title.value,
        content: e.target.content.value,
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h2 className="mb-3">글쓰기</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>글쓴이</Form.Label>
          <Form.Control type="text" name="name" defaultValue="" placeholder="이름을 입력해주세요" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" name="title" defaultValue="" placeholder="제목을 입력해주세요" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" name="content" defaultValue="" rows={3} />
        </Form.Group>
        <div className="d-flex gap-1 justify-content-end">
          <Button type="submit" variant="primary">
            입력
          </Button>
          <Link to="/" className="btn btn-secondary">
            취소
          </Link>
        </div>
      </Form>
    </>
  );
}

export default Write;
