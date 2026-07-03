import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Write({ isModifyMode, boardId }) {
  const [content, setContent] = useState({
    writer: "",
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isModifyMode && boardId) {
      axios
        .get(`http://localhost:3000/view?id=${boardId}`)
        .then((response) => {
          console.log(response.data);
          if (!response.data || response.data.length === 0) {
            setIsError(true);
            return;
          }
          const data = response.data[0];
          setContent({
            writer: data.writer,
            title: data.title,
            content: data.content,
          });
        })
        .catch((error) => {
          setIsError(true);
          console.error(error);
        });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (isModifyMode) {
      // axios.post("http://localhost:3000/", {});
    } else {
      axios
        .post("http://localhost:3000/write", {
          name: e.target.writer.value,
          title: e.target.title.value,
          content: e.target.content.value,
        })
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <h2 className="mb-3">{isModifyMode ? "게시물 수정" : "게시물 작성"}</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="writer">
          <Form.Label>글쓴이</Form.Label>
          <Form.Control type="text" name="writer" defaultValue={content.writer} placeholder="이름을 입력해주세요" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" name="title" defaultValue={content.title} placeholder="제목을 입력해주세요" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" name="content" defaultValue={content.content} rows={3} />
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
