import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";

import Button from "react-bootstrap/Button";

function View({ data }) {
  const [content, setContent] = useState({
    name: "",
    title: "",
    content: "",
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/list", {})
      .then((response) => {
        console.log(response.data);
        // setContent(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h2>{content.title}</h2>
      <div className="d-flex justify-content-between">
        <p>{content.name}</p>
        <data value=""></data>
      </div>
      <hr />
      <p>{content.content}</p>
      <hr />
      <div className="d-flex gap-1 justify-content-end">
        <Link className="btn btn-primary">홈</Link>
        <Button variant="secondary">수정</Button>
        <Button variant="danger">삭제</Button>
      </div>
    </>
  );
}

export default View;
