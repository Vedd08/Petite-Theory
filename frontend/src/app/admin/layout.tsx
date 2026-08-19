import type { Metadata } from 'next';
import { AuthProvider } from './AuthContext';
import './admin.css';

export const metadata: Metadata = {
  title: 'Admin | Petite थियोरी',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
