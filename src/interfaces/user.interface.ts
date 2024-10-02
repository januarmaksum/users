export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support: {
    url: string;
    text: string;
  };
}
export interface SingleUserResponse {
  data: User;
  support: {
    url: string;
    text: string;
  };
}

export interface UpdateUser {
  (updatedUser: User): Promise<void>;
}