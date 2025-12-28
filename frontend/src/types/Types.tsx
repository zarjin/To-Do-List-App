export interface AuthContextType {
  isAuthenticated: boolean;
  Register: (userData: {
    name: string;
    email: string;
    password: string;
    profile: string;
  }) => Promise<void>;
  Login: (userData: { email: string; password: string }) => Promise<void>;
  Logout: () => Promise<void>;
}

export interface TodoContextType {
  addTodo: (todoData: { text: string }) => Promise<void>;
  getTodo: () => Promise<void>;
  deleteTodo: (todoId: string | number) => Promise<void>;
  toggleTodoCompletion: (todoId: string | number) => Promise<void>;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  profile: File | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface TodoInputType {
  text: string;
}

export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
