'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page({}) {
    const params = useParams();

    useEffect(() => {
        const fetchVB = async () => {};
    }, [params.id]);

    return (
        <main>
            <div></div>
        </main>
    );
}
