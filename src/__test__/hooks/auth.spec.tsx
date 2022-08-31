import fecthMock from "jest-fetch-mock";
import { renderHook, act } from "@testing-library/react-hooks";
import { startAsync } from "expo-auth-session";
import { AuthProvider, useAuth } from "../../hooks/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("expo-auth-session");

fecthMock.enableMocks();

const userTest = {
  id: "any_id",
  email: "gustavoprizon@gmail.com",
  name: "Gustavo Prizon",
  photo: "any_photo.jpg",
};

describe("Auth Hook", () => {
  beforeEach(async () => {
    const userCollectionKey = "@gofinances:user";
    await AsyncStorage.removeItem(userCollectionKey);
  });

  it("should be able to sign in with Google Account", async () => {
    const googleMocked = jest.mocked(startAsync as any);

    googleMocked.mockReturnValue({
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

  it("user should not connect it cancel auth with Google", async () => {
    const googleMocked = jest.mocked(startAsync as any);

    googleMocked.mockReturnValue({
      type: "cancel",
    });

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("id");
  });

  it("verify error sign in with Google if not return type", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      await act(async () => result.current.signInWithGoogle());
    } catch {
      expect(result.current.user).toEqual({});
    }
  });
});
