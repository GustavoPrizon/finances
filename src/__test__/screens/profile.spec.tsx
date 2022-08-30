import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

test("verify textinput with placeholder name", () => {
  const { debug } = render(<Profile />);

  debug();
});
