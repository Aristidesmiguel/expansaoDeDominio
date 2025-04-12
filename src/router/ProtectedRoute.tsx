import { Navigate } from 'react-router-dom';
import React from 'react';


import { Loading } from '@/myComponents';
import { routerApp } from '@/utils/constants';
import { useAuth } from '@/hooks';


interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        console.log("user", user)
        return <Navigate to={routerApp.cadastrar} />;
    }

    return <>{children}</>;
};