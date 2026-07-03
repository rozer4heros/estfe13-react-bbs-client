import { Link } from "react-router";

import Form from "react-bootstrap/Form";

function Board({ data, onCheckBoxChange }) {
  // { id, title, content, writer, date}
  return (
    <tr>
      <td>
        <Form.Check onChange={(e) => onCheckBoxChange(e.target.checked, data.id)} />
      </td>
      <td>{data.id}</td>
      <td>
        <Link to={`/view/${data.id}`}>{data.title}</Link>
      </td>
      <td>{data.writer}</td>
      <td>{data.date}</td>
    </tr>
  );
}

export default Board;
