'use client';

import { Provider } from 'react-redux';
import store from '@/store';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import { ConfigProvider } from 'antd';

export interface ProvidersProps {
    children: React.ReactNode;
}
export default function Providers({ children }: ProvidersProps) {
    return (
        <Provider store={store}>
            <StyledComponentsRegistry>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#776B5D',
                            colorLink: '#776B5D',
                        },
                    }}
                >
                    {children}
                </ConfigProvider>
            </StyledComponentsRegistry>
        </Provider>
    );
}
