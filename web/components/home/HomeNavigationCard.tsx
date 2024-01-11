'use client';
import { Button, Card, Skeleton } from 'antd';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
interface HomeNavigationCardProps {
    title: string;
    description: string;
    link: string;
    icon: any;
}
import { Bounce } from 'react-awesome-reveal';

export default function HomeNavigationCard(props: HomeNavigationCardProps) {
    const router = useRouter();
    const { title, description, link, icon } = props;
    const handleNavigation = () => {
        router.push(link);
    };
    return (
        <Bounce>
            <Card
                hoverable
                onClick={handleNavigation}
                title={
                    <h1 style={{ textAlign: 'center', fontSize: 20 }} className="text-lg">
                        {title}
                    </h1>
                }
            >
                <Lottie
                    style={{ width: 200, height: 150, margin: 'auto' }}
                    animationData={require(`@/assets/lottie/${icon}.json`)}
                />
                <p style={{ height: 50, textAlign: 'center' }}>{description}</p>
                <div style={{ justifyContent: 'center' }} className="flex">
                    <Button className="mt-2" type="primary">
                        Truy Cập
                    </Button>
                </div>
            </Card>
        </Bounce>
    );
}
