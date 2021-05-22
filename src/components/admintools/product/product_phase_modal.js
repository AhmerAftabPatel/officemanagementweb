import React, { useState } from "react";
import { Header, Table, Image, Button, Search } from "semantic-ui-react";
import { constants } from "../../../constants";
import { Link } from "react-router-dom";
/**
 * @author
 * @function ProductPhase
 **/

const ProductPhase = props => {
  const [search, setSearch] = useState("");
  const updateSearch = event => {
    setSearch(event.target.value.substr(0, 20));
  };
  const arr = ["SNo", "Title", "Assigned to", "Options", "Status"];
  const tasks = props.tasks.filter(task => task.dummy === props.data);
  const filternedTasks = tasks.filter(task => {
    return (
      task.dummy.indexOf(search) !== -1 ||
      task.name.indexOf(search) !== -1 ||
      task.phase.indexOf(search) !== -1
    );
  });
  return (
    <div className="phase-modal-container">
      <Header align="center">
        <Search
          input={{
            icon: "search",
            value: search,
            onChange: updateSearch,
            placeholder: "search by phase"
          }}
        />
      </Header>
      <Table padded celled selectable>
        <Table.Header>
          <Table.Row>
            {arr.map((header, index) => {
              return <Table.HeaderCell key={index}>{header}</Table.HeaderCell>;
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filternedTasks.map((image, index) => {
            return (
              <Table.Row key={image.id}>
                <Table.Cell>{tasks.indexOf(image) + 1}</Table.Cell>

                <Table.Cell>{image.name}</Table.Cell>
                <Table.Cell>
                  <Image
                    size="mini"
                    src={`${constants}/api/photo/${image.userId}`}
                    circular
                  />
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/task/${image._id}`}>
                    <p>
                      <Button
                        content="View"
                        icon="book"
                        labelPosition="center"
                        color="green"
                      />
                    </p>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Header
                    as="h5"
                    style={{ color: image.completed ? "green" : "red" }}
                  >
                    {image.completed ? "Completed" : "Pending"}
                  </Header>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ProductPhase;
