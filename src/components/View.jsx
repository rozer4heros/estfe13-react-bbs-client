import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";

import Button from "react-bootstrap/Button";

const API_URL = import.meta.env.VITE_API_URL;

function View({ handleModify }) {
  const [isError, setIsError] = useState(false);
  const [content, setContent] = useState({
    writer: "",
    title: "",
    content: "",
    date: "",
    image: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/view?id=${id}`)
      .then((response) => {
        if (!response.data || response.data.length === 0) {
          setIsError(true);
          console.warn("해당하는 데이터를 찾을 수 없습니다.");
          return;
        }
        const data = response.data[0];
        setContent({
          writer: data.writer,
          title: data.title,
          content: data.content,
          date: data.date,
          image: data.image_path,
        });
      })
      .catch((error) => {
        setIsError(true);
        console.error(error);
      });
  }, []);

  const _handleModify = () => {
    handleModify(id);
  };
  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios
        .post(`${API_URL}/delete`, {
          id: id,
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
      {isError ? (
        <>
          <p>잘못된 접근입니다.</p>
          <Link to="/" className="btn btn-primary">
            홈
          </Link>
        </>
      ) : (
        <>
          <h2>{content.title}</h2>
          <div className="d-flex justify-content-between">
            <p>글쓴이: {content.writer}</p>
            <time>{content.date}</time>
          </div>
          <hr />
          <p>{content.content}</p>
          {content.image && (
            <div>
              <img src={`${content.image}`} alt={content.title} style={{ maxWidth: "100%" }}></img>
            </div>
          )}
          <hr />
          <div className="d-flex gap-1 justify-content-end">
            <Link to="/" className="btn btn-primary">
              홈
            </Link>
            <Button variant="secondary" onClick={_handleModify}>
              수정
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default View;
