import { useContext } from 'react';
import { AuthContextData } from '../types/types';
import { AuthContext } from '../contexts/AuthProvider';

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default useAuth;
