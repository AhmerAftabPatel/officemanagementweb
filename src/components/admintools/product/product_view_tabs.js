import React from "react";
import { Grid, Header, Item, Modal } from "semantic-ui-react";
import ProductPhase from "./product_phase_modal";

/**
 * @author
 * @function ProductTabs
 **/

const ProductViewTabs = props => {
  // const tasks = props.tasks.filter(task => task.phase)
  // console.log(props.tasks)
  const phases = [
    { name: "Research", icon: "fas fa-search fa-4x", value : 'research' },
    { name: "Design", icon: "fas fa-pencil-ruler fa-4x", value : 'design' },
    { name: "Code", icon: "fas fa-code fa-4x", value : 'code' },
    { name: "Agri", icon: "fas fa-layer-group fa-4x", value : 'agri' }
  ];
  return (
    <>
      <Header>Phases</Header>
      <div style={{ marginLeft: "300px" }}>
        <Grid columns={5} divided>
          <Grid.Row>
            {phases.map((phase, i) => {
              return (
                <Modal
                dimmer='blurring'
                  id="phase-modal"
                  trigger={
                    <Grid.Column align="center" style={{ cursor: "pointer" }}>
                      <Item style={{ borderRadius: "5px" }}>
                        <i className={phase.icon}></i>
                      </Item>

                      {phase.name}
                    </Grid.Column>
                  }
                >
                  <div className="phase-modal">
                    <ProductPhase tasks={props.tasks} data={phase.value} />
                  </div>
                </Modal>
              );
            })}
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
};

export default ProductViewTabs;
