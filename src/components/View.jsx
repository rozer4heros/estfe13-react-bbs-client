import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";

import Button from "react-bootstrap/Button";

function View({ handleModify }) {
  const [isError, setIsError] = useState(false);
  const [content, setContent] = useState({
    writer: "",
    title: "",
    content: "",
    date: "",
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/view?id=${id}`)
      .then((response) => {
        console.log(response.data);
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
        });
      })
      .catch((error) => {
        setIsError(true);
        console.error(error);
      });
  }, []);

  const handleClick = () => {
    handleModify(id);
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
          <hr />
          <div className="d-flex gap-1 justify-content-end">
            <Link to="/" className="btn btn-primary">
              홈
            </Link>
            <Button variant="secondary" onClick={handleClick}>
              수정
            </Button>
            <Button variant="danger">삭제</Button>
          </div>
        </>
      )}
    </>
  );
}

export default View;
