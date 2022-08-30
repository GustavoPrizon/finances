import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

describe("Profile Screen", () => {
  it("verify textinput with placeholder name", () => {
    const { getByPlaceholderText } = render(<Profile />);
    const inputName = getByPlaceholderText("Nome");

    expect(inputName).toBeTruthy();
  });

  it("verify if user data has benn loaded", () => {
    const { getByTestId } = render(<Profile />);
    const inputName = getByTestId("input-name");
    const inputSurName = getByTestId("input-surname");

    expect(inputName.props.value).toEqual("Gustavo");
    expect(inputSurName.props.value).toEqual("Prizon");
  });

  it("verify if title render correctly", () => {
    const { getByTestId } = render(<Profile />);
    const textTitle = getByTestId("text-title");

    expect(textTitle.props.children).toContain("Perfil");
  });
});
