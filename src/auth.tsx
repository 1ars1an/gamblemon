import * as React from 'react';
import axios from 'axios';

export interface AuthContext {
  isAuthenticated: boolean;
  register: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  //user: string | null;
  //password: string | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] =
    React.useState<boolean>(false);

  axios.defaults.withCredentials = true;

  const register = async (username: string, password: string) => {
    try {
      const API_BASE_URL = 'http://127.0.0.1:8000';

      // Make the POST request using axios
      const response = await axios.post(
        `${API_BASE_URL}/users/create/`,
        {
          username,
          password,
        }
      );

      // with axios, successful data is in response.data
      const { id, username: user }: { id: number; username: string } =
        response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Handle unexpected errors
        console.error('Unexpected login error:', error);
      }
      setIsAuthenticated(false);
      throw new Error(error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      // Create a base URL configuration for cleaner code
      const API_BASE_URL = 'http://127.0.0.1:8000';

      // Make the POST request using axios
      const response = await axios.post(
        `${API_BASE_URL}/users/token/`,
        {
          username,
          password,
        },
        {
          // this is crucial - it tells the browser to send and receive cookies
          withCredentials: true,
        }
      );

      // With axios, successful data is in response.data
      const { success }: { success: boolean } = response.data;
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Handle unexpected errors
        console.error('Unexpected login error:', error);
      }
      setIsAuthenticated(false);
      throw new Error(error);
    }
  };

  const logout = async () => {
    try {
      // Create a base URL configuration for cleaner code
      const API_BASE_URL = 'http://127.0.0.1:8000';

      // Make the POST request using axios
      const response = await axios.get(
        `${API_BASE_URL}/users/logout/`,
        {
          // this is crucial - it tells the browser to send and receive cookies
          withCredentials: true,
        }
      );

      // with axios, successful data is in response.data
      const { success }: { success: boolean } = response.data;
      setIsAuthenticated(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Handle unexpected errors
        console.error('Unexpected login error:', error);
      }
      setIsAuthenticated(false);
      throw new Error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
