import fecthMock from "jest-fetch-mock";
import { renderHook, act } from "@testing-library/react-hooks";
import { startAsync } from "expo-auth-session";
import { AuthProvider, useAuth } from "../../hooks/auth";

jest.mock("expo-auth-session");

fecthMock.enableMocks();

const userTest = {
  id: "any_id",
  email: "gustavoprizon@gmail.com",
  name: "Gustavo Prizon",
  photo: "any_photo.jpg",
};

describe("Auth Hook", () => {
  it("should be able to sign in with Google Account", async () => {
    const googleMocked = jest.mocked(startAsync as any);

    googleMocked.mockResolvedValueOnce({
      type: "success",
      params: {
        accessToken: "any_token",
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
  });
});
