import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const AdminRoute = ({ children }) => {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push('/sign-in');
            } else if (user?.role !== 'admin') {
                router.push('/dashboard');
            }
        }
    }, [loading, isAuthenticated, user, router]);

    if (loading || !isAuthenticated || user?.role !== 'admin') {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading Admin...</span>
                </div>
            </div>
        );
    }

    return children;
};

export default AdminRoute;
