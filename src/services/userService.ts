import { SingleUserResponse, UserResponse } from "@/interfaces/user.interface";
import { API_URL } from "@/constants";

export const fetchUsers = async (): Promise<UserResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data: UserResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchUser = async (id: string): Promise<SingleUserResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    const data: SingleUserResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
