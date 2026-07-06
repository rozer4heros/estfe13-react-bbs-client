import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Write({ isModifyMode, boardId, handleCancel }) {
  const [content, setContent] = useState({
    writer: "",
    title: "",
    content: "",
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isModifyMode && boardId) {
      axios
        .get(`http://localhost:3000/view?id=${boardId}`)
        .then((response) => {
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

  const onUpdate = (e) => {
    e.preventDefault();

    const validatedData = validateForm(e);
    if (!validatedData) return;

    const formData = createFormData(validatedData);
    formData.append("id", boardId);

    axios
      .post("http://localhost:3000/update", formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then((response) => {
        handleCancel();
        navigate(`/view/${boardId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onWrite = (e) => {
    e.preventDefault();

    const validatedData = validateForm(e);
    if (!validatedData) return;

    const formData = createFormData(validatedData);

    axios
      .post("http://localhost:3000/write", formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onCancel = () => {
    handleCancel();
    isModifyMode ? navigate(`/view/${boardId}`) : navigate("/");
  };

  function validateForm(e) {
    const name = e.target.writer.value.trim();
    const title = e.target.title.value.trim();
    const content = e.target.content.value.trim();

    if (!name) {
      alert("글쓴이를 입력하세요");
      // 글쓴이에 포커스 걸기
      return null;
    } else if (!title) {
      alert("제목을 입력하세요");
      // 제목에 포커스 걸기
      return null;
    } else if (!content) {
      alert("내용을 입력하세요");
      // 내용에 포커스 걸기
      return null;
    }
    return { name, title, content };
  }
  function createFormData(validatedData) {
    const formData = new FormData();
    formData.append("writer", validatedData.name);
    formData.append("title", validatedData.title);
    formData.append("content", validatedData.content);
    if (content.image) formData.append("image", content.image);
    return formData;
  }

  const handleImageChange = (e) => {
    setContent((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  return (
    <>
      <h2 className="mb-3">{isModifyMode ? "게시물 수정" : "게시물 작성"}</h2>
      <Form onSubmit={isModifyMode ? onUpdate : onWrite}>
        <Form.Group className="mb-3" controlId="writer">
          <Form.Label>글쓴이</Form.Label>
          <Form.Control
            type="text"
            name="writer"
            defaultValue={content.writer}
            placeholder="이름을 입력해주세요"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="title"
            defaultValue={content.title}
            placeholder="제목을 입력해주세요"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" name="content" defaultValue={content.content} rows={3} required />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>이미지 첨부</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>
        <div className="d-flex gap-1 justify-content-end">
          <Button type="submit" variant="primary">
            {isModifyMode ? "수정" : "입력"}
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            취소
          </Button>
        </div>
      </Form>
    </>
  );
}

export default Write;
