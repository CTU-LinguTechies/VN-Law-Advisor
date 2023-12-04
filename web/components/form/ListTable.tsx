import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Row, Col, Card, Pagination } from 'antd';
import MarkdownIt from 'markdown-it';
import { useState } from 'react';
import Lottie from 'lottie-react';
const md = new MarkdownIt({ html: true });

export default function ListTable() {
    const [autoAnimateParent] = useAutoAnimate();
    const [tables, setTables] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    return (
        <div style={{ margin: '15px 0' }}>
            <h1>Xem các bảng</h1>
            <Row ref={autoAnimateParent} gutter={[16, 16]}>
                {tables.length === 0 ? (
                    <Col span={24}>
                        <div className="flex flex-col items-center">
                            <Lottie
                                animationData={require('@/assets/lottie/empty.json')}
                                style={{ width: 200 }}
                            />
                            <h3>Không có bảng nào</h3>
                        </div>
                    </Col>
                ) : (
                    <Col span={8}>
                        <Card>
                            <div dangerouslySetInnerHTML={{ __html: md.render('') }}></div>
                        </Card>
                    </Col>
                )}
            </Row>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Pagination total={total} current={page} onChange={setPage} />
            </div>
        </div>
    );
}
