import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import StyledComponentsRegistry from '../lib/AntdRegistry';
import './globals.css';
import 'animate.css';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'VN Law Advisor',
    description: 'Hỏi đáp tri thức pháp luật Việt Nam',
    icons: {
        icon: '/LinguTechies.svg',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StyledComponentsRegistry>
                    <Navbar />
                    {children}
                    <Footer></Footer>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
