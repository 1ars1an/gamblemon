import * as React from 'react';

export interface AuthContext {
  isAuthenticated: boolean;
  //login: (username: string, password: string) => Promise<void>;
  //logout: () => Promise<void>;
  user: string | null;
  password: string | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<string | null>('');
  const [password, setPassword] = React.useState<string | null>('');
  const [isAuthenticated, setIsAuthenticated] =
    React.useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, password }}>
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
