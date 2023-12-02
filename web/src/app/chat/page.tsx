import MessageBox from '@/components/chat/MessageBox';
import QuestionSideNav from '@/components/chat/QuestionsSidenav';
import { Col, Input, Row } from 'antd';
export default function Page() {
    return (
        <main>
            <Row>
                <Col xs={24} sm={16} md={10} lg={6} xl={5}>
                    <QuestionSideNav />
                </Col>
                <Col
                    style={{
                        backgroundColor: '#fafafa',
                    }}
                    xs={24}
                    sm={8}
                    md={14}
                    lg={18}
                    xl={19}
                >
                    <div style={{ margin: 12 }}>
                        <MessageBox
                            isUser={true}
                            content="Quy định xử phạt hành chính với người điều khiển phương tiện giao thông đường bộ có nồng độ cồn vượt quá 80 miligam/100 mililit máu hoặc 0,4 miligam/1 lít khí thở"
                            time={new Date()}
                        />
                        <MessageBox
                            isUser={false}
                            content="Theo quy định từ bộ luật giao thông, người uống rượu bia khi lái xe sẽ bị phạt từ 500k-1tr"
                            time={new Date()}
                        />
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 12,
                            left: 0,
                            right: 0,
                            padding: 12,
                        }}
                    >
                        <Input
                            className="w-full rounded h-[60px] border"
                            placeholder="Hỏi gì đó...."
                        />
                    </div>
                </Col>
            </Row>
        </main>
    );
}
