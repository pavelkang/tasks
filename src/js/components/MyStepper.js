import React from "react";
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

export default class MyStepper extends React.Component {
  state = {
    finished: false,
    stepIndex: 0,
  };

  render() {

    const {finished, stepIndex} = this.state;

    return (
      <div>
      <Stepper activeStep={stepIndex}>
        <Step>
          <StepLabel>Fill in event details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Finished!</StepLabel>
        </Step>
      </Stepper>
      </div>
    );
  }
}
