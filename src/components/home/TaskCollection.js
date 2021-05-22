import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TaskCollectionDeadline from "./task_collection_deadline";
import CompletedTaskCollection from "./task_collection_completed";
import AllTaskCollection from "./task_collection_all";
import { Header, Search } from "semantic-ui-react";
const CompletedTasks = props => {
  const [search, setSearch] = useState("");

  const updateSearch = event => {
    setSearch(event.target.value.substr(0, 20));
  };

  const tasks = props.tasks.filter(task => {
    return task.dummy.indexOf(search) !== -1;
  });

  return (
    <>
      {!tasks ? (
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="tabscontainertask">
          <Tabs forceRenderTabPanel defaultIndex={1}>
            <Header textAlign="center">
              <Search
                input={{
                  icon: "search",
                  value: search,
                  onChange: updateSearch,
                  placeholder: "filter by engine"
                }}
              />
            </Header>

            <TabList className="tabscontainertask-tabs">
              <Tab style={tabItem}>Deadline tasks(2 days)</Tab>
              <Tab style={tabItem}>Completed tasks</Tab>
            </TabList>
            <TabPanel>
              <Tabs forceRenderTabPanel>
                <TabList>
                  <Tab>Deadline</Tab>
                </TabList>
                <TabPanel>
                  <div>
                    <TaskCollectionDeadline tasks={tasks} />
                  </div>
                </TabPanel>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <Tabs forceRenderTabPanel>
                <TabList>
                  <Tab>All Completed Tasks</Tab>
                  <Tab>All Tasks</Tab>
                </TabList>
                <TabPanel>
                  <CompletedTaskCollection tasks={tasks} />
                </TabPanel>
                <TabPanel>
                  <AllTaskCollection tasks={tasks} />
                </TabPanel>
              </Tabs>
            </TabPanel>
          </Tabs>
        </div>
      )}
    </>
  );
};
const tabItem = {
  borderRadius: "5px",
  backgroundColor: "grey",
  textAlign: "center",
  paddingTop: "13px",
  fontSize: "20px",
  height: "45px"
};
export default CompletedTasks;
