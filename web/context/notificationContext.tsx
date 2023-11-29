import React, { useMemo } from 'react';
import { Button, Divider, Space, notification } from 'antd';
import type { NotificationInstance, NotificationPlacement } from 'antd/es/notification/interface';

export const NotificationContext = React.createContext<NotificationInstance | null>(null);

function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [api, contextHolder] = notification.useNotification();
    return (
        <NotificationContext.Provider value={api}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
}

export default NotificationProvider;
