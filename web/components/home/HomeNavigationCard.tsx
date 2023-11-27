'use client';
import { Button, Card, Skeleton } from 'antd';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
    const [animationData, setAnimationData] = useState<any>(null);
    useEffect(() => {
        import(`@/assets/lottie/${icon}.json`).then((data) => {
            setAnimationData(data.default);
        });
    }, []);
    if (!animationData) {
        return <Skeleton active />;
    }
    return (
        <Bounce>
            <Card
                hoverable
                onClick={handleNavigation}
                title={
                    <h1 style={{ textAlign: 'center' }} className="text-lg">
                        {title}
                    </h1>
                }
            >
                <Lottie style={{ width: 200, height: 150 }} animationData={animationData} />
                <p style={{ height: 50 }}>{description}</p>
                <div style={{ justifyContent: 'center' }} className="flex">
                    <Button className="mt-2" type="primary">
                        Truy Cập
                    </Button>
                </div>
            </Card>
        </Bounce>
    );
}
