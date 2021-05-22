import React, { useEffect, useState } from "react";
import Base from "../../base/base";
import {
  Container,
  Header,
  Segment,
  Search,
  Table,
  Image,
  Button,
  Menu
} from "semantic-ui-react";
import { constants } from "../../../constants";

/**
 * @author
 * @function ManageTasks
 **/

const ManageTasks = props => {
  const [stateGalleryId, setGalleryIds] = useState([]);
  const [search, setSearch] = useState("");
  const updateSearch = event => {
    setSearch(event.target.value.substr(0, 20));
  };
  let arrayids = [];
  stateGalleryId.forEach(d => {
    if (d.select) {
      arrayids.push(d.id);
    }
  });
  const ViewTaskButtonClicked = id => {
    props.history.push(`/task/${id}`);
  };
  const tasks = props.tasks.filter(task => {
    return task.dummy.indexOf(search) !== -1;
  });
  const arr = ["SNo", "Title", "Image", "Category", "Options", "Status"];
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    props.fetchTasks(token);
    // eslint-disable-next-line
  }, []);
  return (
    <Base title="Manage Tasks" description="Tasks" className="container">
      <Segment>
        <Header as="h2" textAlign="center">
          Task Management
        </Header>

        <divider />

        <div style={{ display: "flex" }}>
          <Search
            input={{
              icon: "search",
              value: search,
              onChange: updateSearch,
              placeholder: "filter by engine"
            }}
          />
          {/* <input type="text" value={search} onChange={updateSearch} /> */}
          <Container textAlign="right">
            <Button
              content="Add"
              icon="add"
              labelPosition="right"
              color="green"
              //   onClick={onButtonClicked}
            />
          </Container>
        </div>
        <Table padded celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <input
                  type="checkbox"
                  onChange={e => {
                    let value = e.target.checked;
                    setGalleryIds(
                      stateGalleryId.map(d => {
                        d.select = value;
                        return d;
                      })
                    );
                  }}
                />
              </Table.HeaderCell>
              {arr.map((header, index) => {
                return (
                  <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tasks.map((image, index) => {
              return (
                <Table.Row key={image.id}>
                  <Table.Cell>
                    <input
                      type="checkbox"
                      checked={image.select}
                      onChange={e => {
                        let value = e.target.checked;
                        setGalleryIds(
                          stateGalleryId.map(sd => {
                            if (sd.id === image.id) {
                              sd.select = value;
                            }
                            return sd;
                          })
                        );
                      }}
                    />
                    {/* <Checkbox
                      value={values ? '' : image.id}
                      onChange={handleChange}
                    />  */}
                  </Table.Cell>
                  <Table.Cell>{tasks.indexOf(image) + 1}</Table.Cell>

                  <Table.Cell>{image.name}</Table.Cell>
                  <Table.Cell>
                    <Image
                      size="mini"
                      src={`${constants}/api/photo/${image.userId}`}
                      circular
                    />
                  </Table.Cell>
                  <Table.Cell>{image.dummy}</Table.Cell>
                  <Table.Cell>
                    <p>
                      {/* to={`/editimage/${image.id}`} */}
                      {/* <Link>
                        <Button
                          content="Edit"
                          icon="edit"
                          labelPosition="right"
                          color="blue"
                        />
                      </Link> */}
                      <Button
                        content="View"
                        icon="book"
                        labelPosition="center"
                        color="green"
                        onClick={() => ViewTaskButtonClicked(image._id)}
                      />
                    </p>
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
          <Table.Footer>
            <Table.Row>
              <Table.Cell>
                <Button
                  content="Delete"
                  icon="trash"
                  labelPosition="right"
                  color="red"
                  //   onClick={() => deleteCustomerByIds()}
                />
              </Table.Cell>
              <Table.HeaderCell colSpan="16">
                <Menu floated="right" pagination>
                  <Menu.Item as="a">Previous</Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a">Next</Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
    </Base>
  );
};

export default ManageTasks;
