import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const API_URL = import.meta.env.VITE_API_URL;

function Write({ isModifyMode, boardId, handleCancel }) {
  const [content, setContent] = useState({
    writer: "",
    title: "",
    content: "",
    image: null,
  });
  const navigate = useNavigate();
  // 기존 이미지 삭제 플래그
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    if (isModifyMode && boardId) {
      axios
        .get(`${API_URL}/view?id=${boardId}`)
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
            date: data.date,
            image_path: data.image_path || "", // 기존 이미지
            image: null, // 새 이미지
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

    const formData = createFormData(validatedData, boardId);

    for (const [key, value] of formData.entries()) {
      console.log(key, ": ", value);
    }

    axios
      .post(`${API_URL}/update`, formData, { headers: { "Content-Type": "multipart/form-data" } })
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
      .post(`${API_URL}/write`, formData, { headers: { "Content-Type": "multipart/form-data" } })
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
    const writer = e.target.writer.value.trim();
    const title = e.target.title.value.trim();
    const content = e.target.content.value.trim();

    if (!writer) {
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
    return { writer, title, content };
  }
  function createFormData(validatedData, id = null) {
    const formData = new FormData();
    formData.append("writer", validatedData.writer);
    formData.append("title", validatedData.title);
    formData.append("content", validatedData.content);

    if (id) formData.append("id", id);

    // 새 이미지
    if (content.image) formData.append("image", content.image);

    if (removeImage) formData.append("remove_image", "1");

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
        {content.image_path && (
          <div>
            <img
              src={`${content.image_path}`}
              alt={content.title}
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            ></img>
            <Form.Check
              type="checkbox"
              id="default-check"
              label="기존 이미지 제거"
              onChange={(e) => {
                setRemoveImage(e.target.checked);
              }}
            />
          </div>
        )}
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
