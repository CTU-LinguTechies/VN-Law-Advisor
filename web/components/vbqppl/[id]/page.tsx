import { VBQPPLModel } from '@/models/VBQPPLModel';
import vbqpplService from '@/services/vbqppl.service';
import { Col, Divider, Row, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import MarkdownIt from 'markdown-it';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const columns: ColumnsType<VBQPPLModel> = [
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Loại',
        dataIndex: 'loai',
        key: 'loai',
        render: (text) => <Tag color="blue">{text}</Tag>,
    },
];

const md = new MarkdownIt({ html: true });
export default function Page({ params }: { params: { id: number } }) {
    const [relevantVB, setRelevantVB] = useState<VBQPPLModel[]>([]);
    const [vban, setVBan] = useState<VBQPPLModel>();
    useEffect(() => {
        const fetchData = async () => {
            if (!params.id) return;
            const res = await vbqpplService.getOne(params.id as any);
            setVBan(res);
        };
        fetchData();
    }, [params.id]);
    return (
        <main className="max-w-[1440px] w-[95%] mx-auto my-5">
            <Row>
                <Col span={16}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: md.render(''),
                        }}
                    ></div>
                </Col>
                <Divider type="vertical" />
                <Col span={8}>
                    <Table columns={columns} dataSource={relevantVB} />
                </Col>
            </Row>
        </main>
    );
}
