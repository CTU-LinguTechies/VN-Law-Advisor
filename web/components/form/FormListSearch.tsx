'use client';
import { DeMucModel } from '@/models/DeMucModel';
import pddemucService, { PDDemucGetAllFilter } from '@/services/pddemuc.service';
import { Col, Row, Select, Input, Pagination, Card, Button, Carousel, MenuProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import useDelay from '@/hooks/useDelay';
import pddieuService from '@/services/pddieu.service';
import { LoginOutlined, MailOutlined } from '@ant-design/icons';

import { PDBangModel, PDFileModel, PureDieuModel } from '@/models/DieuModel';
import Link from 'next/link';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import MarkdownIt from 'markdown-it';
import './main.css';
const md = new MarkdownIt({ html: true });
const items: MenuProps['items'] = [
    {
        label: 'Đăng Nhập',
        key: 'login',
        icon: <LoginOutlined />,
    },
    {
        label: 'Đăng Ký',
        key: 'register',
        icon: <MailOutlined />,
    },
];

interface ListTableFormState {
    mapc: string;
    ten: string;
    bangs: PDBangModel[];
    files: PDFileModel[];
}
export default function FormListSearch() {
    const [demucOptions, setDemucOptions] = useState<DeMucModel[]>([]);
    const [selectedDemuc, setSelectedDemuc] = useState<string | undefined>(undefined);
    const [name, setName] = useState('');
    const [dieuOptions, setDieuOptions] = useState<PureDieuModel[]>([]);
    const [listTableForm, setListTableForm] = useState<ListTableFormState>();
    const [autoAnimateParent] = useAutoAnimate();
    const [autoAnimateReader] = useAutoAnimate();
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(4);

    const keyword = useDelay({ keyword: name, delay: 500 });

    useEffect(() => {
        async function fetchDieuData() {
            const { content, totalElements, size } = await pddieuService.getFilter({
                deMucId: selectedDemuc,
                name: keyword,
                pageNo: page,
                pageSize,
            });

            setDieuOptions(content);
            setTotal(Math.ceil(totalElements / size));
        }
        fetchDieuData();
    }, [selectedDemuc, keyword, page, pageSize]);

    useEffect(() => {
        async function fetchData() {
            const { content } = await pddemucService.getAll();
            setDemucOptions(content);
        }
        fetchData();
    }, []);

    const chooseChiMuc = async (mapc: string, ten: string) => {
        const result = await pddieuService.getListTableAndForms(mapc);
        setListTableForm({ ...result, ten, mapc });
    };

    const onSearch = async (value: string) => {
        const { content } = await pddemucService.getAll({ name: value } as PDDemucGetAllFilter);
        setDemucOptions(content);
    };

    return (
        <div>
            <h1>Xem các bảng và biểu mẫu theo chỉ mục</h1>

            <Row gutter={[16, 16]}>
                <Col xs={24} md={12} lg={12} xl={12} span={12}>
                    <Row className="mt-5" align="middle" gutter={[16, 16]}>
                        <Col span={12}>
                            <Select
                                filterOption={false}
                                className="w-full"
                                showSearch
                                placeholder="Tìm kiếm theo đề mục..."
                                optionFilterProp="children"
                                onChange={(value: any) => setSelectedDemuc(value)}
                                onSearch={onSearch}
                                options={demucOptions.map((item: DeMucModel) => ({
                                    label: item.ten,
                                    value: item.id,
                                }))}
                                notFoundContent={
                                    <Lottie animationData={require('@/assets/lottie/empty.json')} />
                                }
                            />
                        </Col>
                        <Col span={12}>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full"
                                placeholder="Tìm kiếm theo tên..."
                            />
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={24}>
                            {dieuOptions.length === 0 ? (
                                <div className="flex items-center flex-col">
                                    <Lottie
                                        style={{ width: 350 }}
                                        animationData={require('@/assets/lottie/empty.json')}
                                    />
                                    <h4 style={{ fontWeight: 400 }} className="text-2xl italic">
                                        Hãy tìm một chỉ mục để xem
                                    </h4>
                                </div>
                            ) : (
                                <Row
                                    className="mt-5"
                                    justify="center"
                                    gutter={[16, 16]}
                                    ref={autoAnimateParent}
                                >
                                    {dieuOptions.map((item: PureDieuModel) => (
                                        <Col key={item.mapc} span={10}>
                                            <Card
                                                onClick={() => chooseChiMuc(item.mapc, item.ten)}
                                                hoverable
                                                title={item.ten}
                                            >
                                                <p
                                                    style={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    {item.noidung}
                                                </p>
                                                <Button type="link">
                                                    <Link href={`/phapdien?id=${item.mapc}`}>
                                                        Đọc thêm
                                                    </Link>
                                                </Button>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Col>
                        <Col className="flex justify-center mt-5" span={24}>
                            <Pagination
                                defaultCurrent={0}
                                current={page}
                                onChange={setPage}
                                pageSizeOptions={[4, 8]}
                                pageSize={pageSize}
                                onShowSizeChange={(current, size) => {
                                    setPageSize(size);
                                    setPage(0);
                                }}
                                total={total}
                            />
                        </Col>
                    </Row>
                </Col>

                <Col className="mt-5" xs={24} md={12} lg={12} xl={12} span={12}>
                    <div>
                        {listTableForm && (
                            <Card
                                title={
                                    <h2 style={{ textAlign: 'center' }} className="text-2xl">
                                        {listTableForm.ten}
                                    </h2>
                                }
                            >
                                <div className="mt-3">
                                    <div
                                        style={{ flexWrap: 'wrap', gap: 5 }}
                                        className="flex justify-center"
                                    >
                                        {listTableForm.files.length > 0 ? (
                                            listTableForm.files.map((file, index) => (
                                                <Tag color="blue">
                                                    <a target="_blank" href={file.link}>
                                                        Biểu mẫu {index + 1}
                                                    </a>
                                                </Tag>
                                            ))
                                        ) : (
                                            <p>Điều mục này không đính kèm biểu mẫu</p>
                                        )}
                                    </div>
                                    <Carousel>
                                        {listTableForm.bangs.map((bang) => (
                                            <div key={bang.id} className="markdown-body">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: md.render(bang.html),
                                                    }}
                                                ></div>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </Card>
                        )}
                        {!listTableForm && (
                            <div className="flex items-center flex-col">
                                <Lottie
                                    style={{ width: 350 }}
                                    animationData={require('@/assets/lottie/empty.json')}
                                />
                                <h4 style={{ fontWeight: 400 }} className="text-2xl italic">
                                    Hãy chọn một chỉ mục để xem
                                </h4>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
}
