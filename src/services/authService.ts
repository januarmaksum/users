import { LoginPayload, LoginResponse } from "@/interfaces/auth.interface";

const API_URL = "https://reqres.in/api";

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
