import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

export type User = {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
};

type AuthType = {
  user: User | null;
  loading: boolean;
  register: (email: string, username: string, password: string) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthType>({} as AuthType);
export const useAuth = () => useContext(AuthContext);

// turns the password into a hash so it is not saved as plain text
const makeHash = (password: string, email: string) =>
  Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password + email);

// gets all saved users from AsyncStorage
async function getUsers(): Promise<User[]> {
  const saved = await AsyncStorage.getItem('users');
  return saved ? JSON.parse(saved) : [];
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // when the app opens, check if someone is already logged in
  useEffect(() => {
    async function checkLogin() {
      const id = await AsyncStorage.getItem('loggedInUser');
      if (id) {
        const users = await getUsers();
        setUser(users.find((u) => u.id === id) || null);
      }
      setLoading(false);
    }
    checkLogin();
  }, []);

  // each function below returns an error message, or null if it worked
  async function register(email: string, username: string, password: string) {
    email = email.trim().toLowerCase();
    username = username.trim();

    if (!email || !username || !password) return 'Please fill in all fields.';
    if (!email.includes('@')) return 'Enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';

    const users = await getUsers();
    if (users.some((u) => u.email === email)) return 'That email is already registered.';

    const newUser: User = {
      id: Date.now().toString(),
      email,
      username,
      passwordHash: await makeHash(password, email),
    };

    await AsyncStorage.setItem('users', JSON.stringify([...users, newUser]));
    await AsyncStorage.setItem('loggedInUser', newUser.id);
    setUser(newUser);
    return null;
  }

  async function login(email: string, password: string) {
    email = email.trim().toLowerCase();
    const users = await getUsers();
    const hash = await makeHash(password, email);
    const found = users.find((u) => u.email === email && u.passwordHash === hash);

    if (!found) return 'Wrong email or password.';

    await AsyncStorage.setItem('loggedInUser', found.id);
    setUser(found);
    return null;
  }

  async function logout() {
    await AsyncStorage.removeItem('loggedInUser');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}