'use client';

import { Provider } from 'react-redux';
import store from '@/store';
import StyledComponentsRegistry from '../lib/AntdRegistry';

export interface ProvidersProps {
    children: React.ReactNode;
}
export default function Providers({ children }: ProvidersProps) {
    return (
        <Provider store={store}>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Provider>
    );
}
