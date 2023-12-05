import React, { createContext } from 'react';
import { Button, message, Space } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';

export const MessageContext = createContext<MessageInstance | null>(null);

function MessageProvider({ children }: { children: React.ReactNode }) {
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <MessageContext.Provider value={messageApi}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
}

export default MessageProvider;
