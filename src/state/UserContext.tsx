import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserState } from '../types/user';
import { saveUserData, fetchUserData } from './api/userService';

const defaultUserState: UserState = {
  height: '',
  weight: '',
  age: '',
  gender: '',
  activityLevel: '',
  healthConditions: [],
  goal: '',
  fitnessLevel: '',
};

interface UserContextProps {
  userData: UserState;
  setUserData: React.Dispatch<React.SetStateAction<UserState>>;
  saveData: () => Promise<void>;
  loadData: (userId: string) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserState>(defaultUserState);

  const saveData = async () => {
    await saveUserData(userData);
  };

  const loadData = async (userId: string) => {
    const data = await fetchUserData(userId);
    setUserData(data);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, saveData, loadData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

