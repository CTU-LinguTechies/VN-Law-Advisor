import { useAppDispatch } from '@/hooks/useAppDispatch';
import authService from '@/services/auth.service';
import { setUser } from '@/store/userSlice';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            try {
                const result = await authService.identify();
                dispatch(setUser(result.data));
            } catch (error) {}
        })();
    }, [dispatch]);

    return <>{children}</>;
}
