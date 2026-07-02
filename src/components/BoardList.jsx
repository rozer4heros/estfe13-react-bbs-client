import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function BoardList({}) {
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
          <tr>
            <td>
              <Form.Check />
            </td>
            <td>1</td>
            <td>Come here, Ib</td>
            <td>Mary Guertena</td>
            <td>1972.11.21</td>
          </tr>
          {/*
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
          */}
        </tbody>
      </Table>
      <div className="d-flex gap-1 justify-content-end">
        <Button variant="primary">입력</Button>
        <Button variant="secondary">수정</Button>
        <Button variant="danger">삭제</Button>
      </div>
    </>
  );
}

export default BoardList;
