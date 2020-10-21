import { shallow } from "enzyme";
import React from "react";
export default ({ success }) => {
  return (
    <div data-test="component-congratulations">
      <h1 data-test="congratulations-message">
        {success && "Congratulations"}
      </h1>
    </div>
  );
};
