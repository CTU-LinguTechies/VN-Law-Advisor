import { DieuModel } from '@/models/DieuModel';
import { SelectedChuong } from '@/src/app/phapdien/page';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Card, Spin, Input, Typography } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import pddieuService from '@/services/pddieu.service';
export interface ChuongReaderProps {
    selectedChuong: SelectedChuong;
    setSelectedChuong: Dispatch<SetStateAction<SelectedChuong>>;
}

const { Search } = Input;
const { Text } = Typography;
let loaded = false;
const md = new MarkdownIt();
export default function ChuongReader({ selectedChuong, setSelectedChuong }: ChuongReaderProps) {
    const [autoAnimateParent] = useAutoAnimate();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    async function fetchMore() {
        if (!selectedChuong.mapc || loaded) return;
        const pddieu = await pddieuService.getAllByChuongId(selectedChuong.mapc.toString(), page);
        if (!pddieu.content.length) {
            loaded = true;
            return;
        }
        setSelectedChuong({
            ...selectedChuong,
            dieus: [...selectedChuong.dieus, ...pddieu.content],
        });
        setPage(page + 1);
    }

    useEffect(() => {
        loaded = false;
        window.scrollTo(0, 0);
        setPage(1);
    }, [selectedChuong.mapc]);

    useEffect(() => {
        let isFetching = false;
        async function handleScroll(e: any) {
            const windowHeight = window.innerHeight;
            const scrollableHeight = document.body.scrollHeight;

            if (window.scrollY + windowHeight >= scrollableHeight) {
                if (isFetching) return;
                isFetching = true;
                setLoading(true);
                await fetchMore();
                setLoading(false);
                isFetching = false;
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [selectedChuong]);

    return (
        <Card style={{ marginRight: 20 }}>
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    backgroundColor: 'white',
                    padding: 12,
                    borderBottom: '2px solid #f0f0f0',
                    borderRadius: 4,
                }}
            >
                <Search placeholder="Tìm kiếm một điều mục..." loading={loading} />
                <h1 style={{ textAlign: 'center' }}>{selectedChuong.ten}</h1>
            </div>
            <div style={{ scrollBehavior: 'smooth' }} ref={autoAnimateParent}>
                {selectedChuong?.dieus?.map((dieu: DieuModel) => {
                    return (
                        <Card
                            bordered={false}
                            style={{ boxShadow: 'unset' }}
                            key={dieu.mapc}
                            title={dieu.ten}
                        >
                            <div
                                dangerouslySetInnerHTML={{ __html: md.render(dieu.noidung) }}
                            ></div>
                        </Card>
                    );
                })}
            </div>
            {loading && (
                <div className="flex w-full justify-center">
                    <Spin size="large"></Spin>
                </div>
            )}
        </Card>
    );
}
