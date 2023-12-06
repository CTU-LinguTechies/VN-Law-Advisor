import { DieuModel } from '@/models/DieuModel';
import { SelectedChuong } from '@/src/app/phapdien/page';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Card, Spin, Input, Typography, Button } from 'antd';
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    useRef,
    useCallback,
    useContext,
} from 'react';
import { ReadOutlined } from '@ant-design/icons';
import MarkdownIt from 'markdown-it';
import pddieuService from '@/services/pddieu.service';
import NotificationProvider, { NotificationContext } from '@/context/notificationContext';
export interface ChuongReaderProps {
    selectedChuong: SelectedChuong;
    setSelectedChuong: Dispatch<SetStateAction<SelectedChuong>>;
}

const { Search } = Input;
const { Text } = Typography;
let loaded = false;
const md = new MarkdownIt({ html: true });
export default function ChuongReader({ selectedChuong, setSelectedChuong }: ChuongReaderProps) {
    const worker = useRef<Worker>();
    const [autoAnimateParent] = useAutoAnimate();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const api = useContext(NotificationContext);

    function sendMessage(message: string, status: string) {
        if (status === 'init') {
            api?.info({
                message: message,
                placement: 'topRight',
            });
            return;
        }
        if (status === 'complete') {
            api?.success({
                message: message,
                duration: 0,
                placement: 'topRight',
            });
            return;
        }
        api?.info({
            message: message,
            placement: 'topRight',
        });
    }
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
        if (!worker.current) {
            // Create the worker if it does not yet exist.
            worker.current = new Worker(new URL('../../utils/worker.js', import.meta.url), {
                type: 'module',
            });
        }

        // Create a callback function for messages from the worker thread.
        const onMessageReceived = (e: any) => {
            sendMessage(e.data.output, e.data.status);
        };

        worker.current.addEventListener('message', onMessageReceived);

        return () => worker?.current?.removeEventListener('message', onMessageReceived);
    });

    const classify = useCallback((text: string) => {
        if (worker.current) {
            worker.current.postMessage({ text });
        }
    }, []);

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
                            title={
                                <div className="flex items-center justify-between">
                                    {dieu.ten}
                                    <Button
                                        onClick={() => classify(dieu.noidung)}
                                        type="primary"
                                        icon={<ReadOutlined />}
                                    >
                                        Tóm tắt
                                    </Button>
                                </div>
                            }
                        >
                            <div
                                id={dieu.mapc}
                                dangerouslySetInnerHTML={{ __html: md.render(dieu.noidung) }}
                            ></div>
                            {dieu.bangs?.map((bang) => {
                                return (
                                    <div
                                        className="markdown-body"
                                        key={bang.id}
                                        dangerouslySetInnerHTML={{ __html: md.render(bang.html) }}
                                    ></div>
                                );
                            })}
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
