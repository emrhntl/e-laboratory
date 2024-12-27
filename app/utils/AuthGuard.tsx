import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { View, Text, Alert } from 'react-native';
import { RoleEnum } from '@/enums/role.enum';

type AuthGuardProps = {
  children: React.ReactNode;
  allowedRoles: RoleEnum[];
};

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || !allowedRoles.includes(user.role!)) {
    Alert.alert(
      'Erişim Engellendi',
      'Bu sayfaya erişim yetkiniz bulunmamaktadır!',
      [
        {
          text: 'Geri Dön',
          onPress: () => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/login');
            }
          },
        },
      ]
    );
    return null;
  }

  return <>{children}</>;
}
