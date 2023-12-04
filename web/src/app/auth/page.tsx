'use client';
import React, { useState } from 'react';
import { LoginOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Col, Menu, Row } from 'antd';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import LoginCard from '@/components/auth/LoginCard';
import RegisterCard from '@/components/auth/RegisterCard';

const items: MenuProps['items'] = [
    {
        label: 'Đăng Nhập',
        key: 'login',
        icon: <LoginOutlined />,
    },
    {
        label: 'Đăng Ký',
        key: 'register',
        icon: <MailOutlined />,
    },
];

const AuthPage: React.FC = () => {
    const [modalType, setModalType] = useState('login');
    const [autoAnimateParent] = useAutoAnimate({});

    const onClick: MenuProps['onClick'] = (e) => {
        setModalType(e.key);
    };

    return (
        <div className="h-full">
            <div className="flex justify-center w-full"></div>
            <Row className="flex justify-center overflow-hidden h-full" gutter={[16, 16]}>
                <Col span={16}>
                    <div className="max-w-[100%]">
                        <Menu
                            style={{ justifyContent: 'center' }}
                            onClick={onClick}
                            selectedKeys={[modalType]}
                            mode="horizontal"
                            items={items}
                        />
                    </div>
                    <div className="flex justify-center align-middle mt-5" ref={autoAnimateParent}>
                        {modalType == 'login' ? (
                            <LoginCard setKey={setModalType} />
                        ) : (
                            <RegisterCard setKey={setModalType} />
                        )}
                    </div>
                </Col>
                <Col span={8}>
                    <div className="side-wavy h-full"></div>
                </Col>
            </Row>
        </div>
    );
};

export default AuthPage;
