import Form from "react-bootstrap/Form";

function Board({ data }) {
  // { id, title, content, writer, date}
  return (
    <tr>
      <td>
        <Form.Check />
      </td>
      <td>{data.id}</td>
      <td>{data.title}</td>
      <td>{data.writer}</td>
      <td>{data.date}</td>
    </tr>
  );
}

export default Board;
