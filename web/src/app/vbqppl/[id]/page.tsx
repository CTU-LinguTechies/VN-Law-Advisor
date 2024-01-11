'use client';

import { VBQPPLModel } from '@/models/VBQPPLModel';
import vbqpplService from '@/services/vbqppl.service';
import { Spin } from 'antd';
import MarkdownIt from 'markdown-it';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const md = new MarkdownIt({ html: true });

export default function Page({}) {
    const [vanban, setVanBan] = useState<VBQPPLModel>({} as VBQPPLModel);
    const params = useParams();

    useEffect(() => {
        if (!params.id) return;
        const fetchVB = async () => {
            const vb = await vbqpplService.getOne(params.id as string);
            setVanBan(vb);
        };
        fetchVB();
    }, [params.id]);
    if (!vanban.id) {
        return <Spin></Spin>;
    }
    return (
        <main className="max-w-[1440px] w-[95%] mx-auto">
            <div
                dangerouslySetInnerHTML={{
                    __html: md.render(vanban.noidung),
                }}
            ></div>
        </main>
    );
}
