'use client';
import Link from 'next/link';
import './navbar.scss';
import { UserOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Avatar } from 'antd';

function formatPathname(pathname: string) {
    const parts = pathname.split('/');
    return parts[parts.length - 1];
}

export default function Navbar() {
    const pathname = formatPathname(usePathname());
    const user = useSelector((state: RootState) => state.user);
    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-header">
                    <button className="navbar-toggler" data-toggle="open-navbar1">
                        <span>
                            <Link href="/">Trang chủ</Link>
                        </span>
                        <span>
                            <Link href="/phapdien">Luật</Link>
                        </span>
                        <span></span>
                    </button>
                    <a href="#">
                        <h4>
                            VNLaw<span>Advisor</span>
                        </h4>
                    </a>
                </div>

                <div className="navbar-menu" id="open-navbar1">
                    <ul className="navbar-nav">
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
                                <Avatar size={64} icon={<UserOutlined />} />
                                <a className="active">{user.name}</a>
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
