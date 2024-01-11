'use client';
import MessageBox from '@/components/chat/MessageBox';
import QuestionSideNav from '@/components/chat/QuestionsSidenav';
import { Button, Card, Col, Input, Row } from 'antd';
import './page.css';
import { SendOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import MarkdownIt from 'markdown-it';
import qnaService, { CitationModel } from '@/services/qna.service';
import { useRouter } from 'next/navigation';
export interface SelectedQuestion {
    isNew: boolean;
    question?: string;
    answer?: string;
}
interface MessageBox {
    isUser: boolean;
    content: string;
    time: Date;
}

const mockedData = {
    citation: [
        'Điều 16.1.LQ.125. Tội giết người trong trạng thái tinh thần bị kích động mạnh [(Điều 125 Bộ luật số 100/2015/QH13, có hiệu lực thi hành kể từ ngày 01/01/2018)] 1\\. Người nào giết người trong trạng thái tinh thần bị kích động mạnh do hành vi trái pháp luật nghiêm trọng của nạn nhân đối với người đó hoặc đối với người thân thích của người đó, thì bị phạt tù từ 06 tháng đến 03 năm. 2\\. Phạm tội đối với 02 người trở lên, thì bị phạt tù từ 03 năm đến 07 năm.',
        'Điều 16.1.LQ.123. Tội giết người [(Điều 123 Bộ luật số 100/2015/QH13, có hiệu lực thi hành kể từ ngày 01/01/2018)] 1\\. Người nào giết người thuộc một trong các trường hợp sau đây, thì bị phạt tù từ 12 năm đến 20 năm, tù chung thân hoặc tử hình: a) Giết 02 người trở lên; b) Giết người dưới 16 tuổi; c) Giết phụ nữ mà biết là có thai; d) Giết người đang thi hành công vụ hoặc vì lý do công vụ của nạn nhân; đ) Giết ông, bà, cha, mẹ, người nuôi dưỡng, thầy giáo, cô giáo của mình; e) Giết người mà liền trước đó hoặc ngay sau đó lại thực hiện một tội phạm rất nghiêm trọng hoặc tội phạm đặc biệt nghiêm trọng; g) Để thực hiện hoặc che giấu tội phạm khác; h) Để lấy bộ phận cơ thể của nạn nhân; i) Thực hiện tội phạm một cách man rợ; k) Bằng cách lợi dụng nghề nghiệp; l) Bằng phương pháp có khả năng làm chết nhiều người; m) Thuê giết người hoặc giết người thuê n) Có tính chất côn đồ; o) Có tổ chức; p) Tái phạm nguy hiểm; q) Vì động cơ đê hèn. 2\\. Phạm tội không thuộc các trường hợp quy định tại khoản 1 Điều này, thì bị phạt tù từ 07 năm đến 15 năm. 3\\. Người chuẩn bị phạm tội này, thì bị phạt tù từ 01 năm đến 05 năm. 4\\. Người phạm tội còn có thể bị cấm hành nghề hoặc làm công việc nhất định từ 01 năm đến 05 năm, phạt quản chế hoặc cấm cư trú từ 01 năm đến 05 năm. (Điều này có nội dung liên quan đến [Điều 16.1.LQ.12. Tuổi chịu trách nhiệm hình sự](http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=); Điều 16.1.LQ.14. Chuẩn bị phạm tội; [Điều 16.1.LQ.91. Nguyên tắc xử lý đối với người dưới 18 tuổi phạm tội](http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=); [Điều 16.1.LQ.389. Tội che giấu tội phạm của Bộ luật 100/2015/QH13 Hình sự ban hành ngày 27/11/2015](http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=); Điều 37.7.TT.2.4. Những vụ án hình sự thuộc thẩm quyền của Tòa gia đình và người chưa thành niên xét xử tại Phòng xử án hình sự)',
    ],
    question: 'Quy định xử phạt cho việc vô ý giết người?',
    response: ' 27/11/2015](http://vbpl.vn/TW/Pages/vbpq-toanvan.aspx?ItemID=);',
    status: 'success',
    topic_ids: ['bcc2a59a-ccbe-4739-afd4-f45811a15122'],
};

const md = new MarkdownIt({ html: true });

export default function Page() {
    const [selectedQuestion, setSelectedQuestion] = useState<SelectedQuestion>({
        isNew: true,
    });
    const [messageBoxes, setMessageBoxes] = useState<MessageBox[]>([]);
    const [citations, setCitations] = useState<CitationModel[]>([]);
    const [search, setSearch] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [autoAnimateParent] = useAutoAnimate();
    const router = useRouter();
    const send = async () => {
        setCitations([]);
        if (!search) return;
        const newMessageBox = {
            isUser: true,
            content: search,
            time: new Date(),
        };
        setMessageBoxes([newMessageBox]);
        setSearch('');

        // const response = (await new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve(mockedData);
        //     }, 1000);
        // })) as any;

        const response = await qnaService.answer({
            question: search,
        });

        setCitations(response.citation);
        const newMessageBox2 = {
            isUser: false,
            content: response.response,
            time: new Date(),
        };
        setMessageBoxes([newMessageBox, newMessageBox2]);
    };
    const goToCitation = (mapc: string) => {
        router.push(`/phapdien?id=${mapc}`);
    };
    return (
        <main>
            <Row>
                <Col xs={24} sm={16} md={10} lg={6} xl={5}>
                    <QuestionSideNav
                        messageBoxes={messageBoxes}
                        selectedQuestion={selectedQuestion}
                        setMessageBoxes={setMessageBoxes}
                        setCitations={setCitations}
                        setSelectedQuestion={setSelectedQuestion}
                    />
                </Col>
                <Col
                    style={{
                        background:
                            'radial-gradient(circle, rgba(240,242,244,1) 0%, rgba(232,241,252,1) 100%)',
                    }}
                    xs={24}
                    sm={8}
                    md={14}
                    lg={18}
                    xl={19}
                >
                    {messageBoxes.length > 0 && (
                        <div ref={autoAnimateParent} style={{ margin: 12 }}>
                            {messageBoxes.map((messageBox, index) => (
                                <MessageBox
                                    key={index}
                                    isUser={messageBox.isUser}
                                    content={messageBox.content}
                                    time={messageBox.time}
                                />
                            ))}
                            {citations?.length > 0 && (
                                <h4 key="ref-text" style={{ color: '#ccc' }} className="text-2xl">
                                    Trích dẫn
                                </h4>
                            )}
                            <Row ref={autoAnimateParent} gutter={[16, 16]}>
                                {citations?.map((item: CitationModel) => (
                                    <Col key={item.mapc} xs={24} sm={12} md={12} lg={8} xl={5}>
                                        <Card
                                            style={{ padding: '12px 0' }}
                                            onClick={() => goToCitation(item.mapc)}
                                            className="max-h-[300px] overflow-hidden text-ellipsis py-5"
                                            hoverable
                                            title={item.ten}
                                        >
                                            <p
                                                style={{
                                                    whiteSpace: 'pre-line',
                                                }}
                                                className="h-full"
                                            >
                                                {item.noidung}
                                            </p>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}
                    {selectedQuestion.isNew && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '6px 12px',
                                height: 60,
                            }}
                        >
                            <Input
                                value={search}
                                className="w-full rounded h-full border"
                                placeholder="Hỏi gì đó...."
                                onChange={(event) => setSearch(event.target.value as string)}
                                onKeyUp={(event) => {
                                    if (event.key === 'Enter') {
                                        send();
                                    }
                                }}
                            />
                            <Button onClick={send} type="primary" className="h-full" size="large">
                                <SendOutlined />
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </main>
    );
}
