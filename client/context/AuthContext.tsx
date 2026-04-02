import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  saveToken,
  clearToken,
  getDecodedToken,
} from "../services/token.service";

type Team = {
  teamNumber: number;
  players: string[];
  scores: (number | null)[];
  total: number;
  parTracker: number;
};

type Teams = Team[];

type Hole = {
  hole: number;
  par: number;
  distance: number;
};

type Course = {
  name: string;
  holes: Hole[];
};

type Tournament = {
  year: number;
  teams: Teams;
  course: Course;
};

type UserInfo = {
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    userName: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  BACKEND_URL: string;
  tournyData: Tournament | null;
  userData: UserInfo | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BACKEND_URL = "https://0f7d-208-38-228-61.ngrok-free.app";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tournyData, setTournyData] = useState<Tournament | null>(null);
  const [userData, setUserData] = useState<UserInfo | null>(null);

  // 🔁 Restore auth on app load
  useEffect(() => {
    const restoreSession = async () => {
      const data = await fetch(`${BACKEND_URL}/auth/getTournamentData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: 2026,
        }),
      });

      const resData = await data.json();
      setTournyData(resData.tournyData);

      const token = await getDecodedToken();
      if (token) {
        setUserData(token);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Login failed", data.message || "Unknown error");
        return;
      }

      // ✅ SAVE TOKEN
      await saveToken(data.token);

      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
      Alert.alert("Login failed", "Could not connect to backend");
    }
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userName: string,
  ) => {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          userName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Signup failed", data.message || "Unknown error");
        return;
      }

      await saveToken(data.token);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
      Alert.alert("Signup failed", "Could not connect to backend");
    }
  };

  const logout = async () => {
    await clearToken();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return null; // or splash screen
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        signup,
        logout,
        BACKEND_URL,
        tournyData,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
