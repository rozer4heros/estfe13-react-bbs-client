import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Board from "./Board";

function BoardList({}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/list", {})
      .then((response) => {
        console.log(response.data);
        setList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>선택</th>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <Board key={item.id} data={item} />
          ))}
        </tbody>
      </Table>
      <div className="d-flex gap-1 justify-content-end">
        <Link to="/write" className="btn btn-primary">
          입력
        </Link>
        <Button variant="secondary">수정</Button>
        <Button variant="danger">삭제</Button>
      </div>
    </>
  );
}

export default BoardList;
