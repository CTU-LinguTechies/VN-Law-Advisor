'use client';
import Link from 'next/link';
import './navbar.scss';
import { UserOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Avatar, Button, Dropdown, MenuProps } from 'antd';
import tokenService from '@/utils/tokenService';
import { deleteUser, setUser } from '@/store/userSlice';

function formatPathname(pathname: string) {
    const parts = pathname.split('/');
    return parts[parts.length - 1];
}

export default function Navbar() {
    const pathname = formatPathname(usePathname());
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const logOut = () => {
        tokenService.clear();
        dispatch(deleteUser());
    };
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <a onClick={logOut}>Đăng xuất</a>,
        },
    ];
    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-header">
                    <button className="navbar-toggler" data-toggle="open-navbar1">
                        <div>
                            <Link href="/">Trang chủ</Link>
                        </div>
                        <div>
                            <Link href="/phapdien">Luật</Link>
                        </div>
                    </button>
                    <a href="#">
                        <h4>
                            VNLaw<span>Advisor</span>
                        </h4>
                    </a>
                </div>

                <div className="navbar-menu" id="open-navbar1">
                    <ul className="navbar-nav" style={{ alignItems: 'center' }}>
                        <li className={pathname == 'home' || pathname == '' ? 'active' : ''}>
                            <Link href="/">Trang chủ</Link>
                        </li>
                        {user && (
                            <li className={pathname == 'chat' ? 'active' : ''}>
                                <Link href="/chat">Chat</Link>
                            </li>
                        )}
                        <li className={pathname == 'law' ? 'active' : ''}>
                            <Link href="/phapdien">Pháp điển</Link>
                        </li>
                        <li className={pathname == 'vbqppl' ? 'active' : ''}>
                            <Link href="/vbqppl">VBQPPL</Link>
                        </li>
                        {user ? (
                            <li>
                                <Dropdown menu={{ items }}>
                                    <Button>{user.name}</Button>
                                </Dropdown>
                            </li>
                        ) : (
                            <li
                                className={
                                    pathname == 'login' || pathname == 'register' ? 'active' : ''
                                }
                            >
                                <Link href="/auth">Đăng nhập</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
