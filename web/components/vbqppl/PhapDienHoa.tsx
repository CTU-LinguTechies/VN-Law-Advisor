'use client';
import useDelay from '@/hooks/useDelay';
import { DeMucModel } from '@/models/DeMucModel';
import pddemucService, { PDDemucGetAllFilter } from '@/services/pddemuc.service';
import vbqpplChuaPhapDienService from '@/services/vbqpplChuaPhapDien.service';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Card, Col, Input, Pagination, Row } from 'antd';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

export default function PhapDienHoa() {
    const [search, setSearch] = useState<string>('');
    const [demucOptions, setDemucOptions] = useState<DeMucModel[]>([]);
    const [selectedDemuc, setSelectedDemuc] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    const [total, setTotal] = useState(0);
    const demucKeyword = useDelay({
        keyword: search || '',
        delay: 500,
    });

    const [dieus, setDieus] = useState<DeMucModel[]>([]);

    useEffect(() => {
        const onSearch = async (value: string) => {
            const { content } = await pddemucService.getAll({ name: value } as PDDemucGetAllFilter);
            setDemucOptions(content);
        };
        onSearch(demucKeyword);
    }, [demucKeyword]);

    useEffect(() => {
        const fetchData = async () => {
            const { content, totalElements, size } =
                await vbqpplChuaPhapDienService.getAllVBQPPLChuaPhapDien({
                    pageNo: page,
                    pageSize,
                    deMucId: selectedDemuc,
                });
            setDieus(content);
            setTotal(Math.ceil(totalElements / size));
        };
        fetchData();
    }, [selectedDemuc, page, pageSize]);

    const [autoAnimateParentDeMuc] = useAutoAnimate();
    const [autoAnimateParentDieu] = useAutoAnimate();

    return (
        <Fade>
            <div style={{ marginTop: 64 }}>
                <div className="mt-5">
                    <h1>Pháp điển hóa các văn bản quy phạm pháp luật</h1>
                    <em style={{ fontStyle: 'italic' }}>
                        *Nhiều văn bản pháp luật hiện nay vẫn chưa được pháp điển hóa cụ thể. Dưới
                        đây là chỉ sự sắp xếp những văn bản đó do hệ thống tự tính toán, không phải
                        chính thức từ chính phủ.
                    </em>
                </div>
                <Row className="mt-5">
                    <Col span={8}>
                        <Input
                            className="w-full"
                            placeholder="Tìm kiếm theo đề mục..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Col>
                </Row>
                <div
                    style={{ flexWrap: 'wrap' }}
                    ref={autoAnimateParentDeMuc}
                    className="flex my-5 gap-5"
                >
                    {demucOptions.map((item) => (
                        <div key={item.id} onClick={() => setSelectedDemuc(item.id)}>
                            <Button
                                type={selectedDemuc === item.id ? 'primary' : 'text'}
                                className="w-full text-ellipsis overflow-hidden"
                            >
                                {item.ten}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <Row>
                {dieus.length > 0 ? (
                    <Row ref={autoAnimateParentDieu}>
                        {dieus.map((item: any) => {
                            return (
                                <Col span={8} key={item.id}>
                                    <Card title={item.vbpl.ten}>{item.noi_dung}</Card>
                                </Col>
                            );
                        })}
                    </Row>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <Lottie
                            style={{ width: 250 }}
                            animationData={require('@/assets/lottie/empty.json')}
                        />
                        <h2 style={{ fontWeight: 400, fontStyle: 'italic' }}>
                            Vui lòng chọn đề mục để xem
                        </h2>
                    </div>
                )}
            </Row>

            <Row justify="end">
                <Col className="flex justify-end mt-5" span={24}>
                    <Pagination
                        defaultCurrent={0}
                        current={page}
                        onChange={setPage}
                        pageSizeOptions={[6, 9]}
                        pageSize={pageSize}
                        onShowSizeChange={(current, size) => {
                            setPageSize(size);
                            setPage(0);
                        }}
                        total={total}
                    />
                </Col>
            </Row>
        </Fade>
    );
}
