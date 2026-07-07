import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Board from "./Board";

const API_URL = import.meta.env.VITE_API_URL;

function BoardList({}) {
  const [list, setList] = useState([]);
  const [checkList, setCheckList] = useState([]);

  const getList = useCallback(() => {
    axios
      .get(`${API_URL}/list`)
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  const onCheckBoxChange = (checked, id) => {
    setCheckList((prev) => (checked ? [...prev, id] : prev.filter((_id) => _id !== id)));
  };

  const handleDelete = () => {
    if (checkList.length === 0) {
      alert("삭제할 게시물을 선택해주세요.");
      return;
    }

    if (window.confirm(`정말로 ${checkList.length}개의 게시물을 전부 삭제하시겠습니까?`)) {
      const boardIdList = checkList.join();

      axios
        .post(`${API_URL}/deleteselect`, {
          boardIdList,
        })
        .then((response) => {
          getList();
          setCheckList([]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

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
          {list.length === 0 ? (
            <tr>
              <td colSpan={5}>글이 없습니다.</td>
            </tr>
          ) : (
            list.map((item) => <Board key={item.id} data={item} onCheckBoxChange={onCheckBoxChange} />)
          )}
        </tbody>
      </Table>
      <div className="d-flex gap-1 justify-content-end">
        <Link to="/write" className="btn btn-primary">
          입력
        </Link>
        <Button variant="danger" onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </>
  );
}

export default BoardList;
