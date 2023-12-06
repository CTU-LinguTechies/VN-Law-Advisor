'use client';

import { Provider } from 'react-redux';
import store from '@/store';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import { ConfigProvider } from 'antd';
import NotificationProvider from '@/context/notificationContext';
import AuthProvider from '@/context/authContext';
import MessageProvider from '@/context/messageContext';

export interface ProvidersProps {
    children: React.ReactNode;
}
export default function Providers({ children }: ProvidersProps) {
    return (
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#776B5D',
                        colorLink: '#776B5D',
                    },
                }}
            >
                <MessageProvider>
                    <NotificationProvider>
                        <AuthProvider>
                            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
                        </AuthProvider>
                    </NotificationProvider>
                </MessageProvider>
            </ConfigProvider>
        </Provider>
    );
}
