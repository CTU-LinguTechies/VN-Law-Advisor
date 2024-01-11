'use client';
import { EditOutlined, MessageOutlined } from '@ant-design/icons';
import './sidenav.css';
import { formatDate, formatDateByString, groupBy } from '@/utils/common';
import qnaService, { CitationModel } from '@/services/qna.service';
import { MessageBoxProps } from './MessageBox';
import { SelectedQuestion } from '@/src/app/chat/page';
import { SetStateAction, useEffect, useState } from 'react';
import { QuestionModel } from '@/models/ChatAnswerModel';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export interface QuestionSideNavProps {
    setCitations: React.Dispatch<SetStateAction<CitationModel[]>>;
    setMessageBoxes: React.Dispatch<React.SetStateAction<MessageBoxProps[]>>;
    selectedQuestion: SelectedQuestion;
    setSelectedQuestion: React.Dispatch<React.SetStateAction<SelectedQuestion>>;
    messageBoxes: MessageBoxProps[];
}

export interface GroupedQuestion {
    date: String;
    questions: QuestionModel[];
}

export default function QuestionSideNav({
    setCitations,
    setMessageBoxes,
    setSelectedQuestion,
    messageBoxes,
}: QuestionSideNavProps) {
    const [allQuestions, setAllQuestions] = useState<GroupedQuestion[]>();
    const [autoAnimateParent] = useAutoAnimate();
    useEffect(() => {
        async function fetchAllQuestions() {
            const response = await qnaService.getQuestions();
            const groupedQuestions = groupBy(response, (item: any) => item.updatedAt) as Map<
                String,
                QuestionModel[]
            >;
            const groupedQuestionsArray: GroupedQuestion[] = [];
            groupedQuestions.forEach((value, key) => {
                groupedQuestionsArray.push({
                    date: key,
                    questions: value,
                });
            });
            setAllQuestions(groupedQuestionsArray);
        }
        fetchAllQuestions();
    }, [messageBoxes]);

    function selectQuestion(item: QuestionModel) {
        setSelectedQuestion({
            isNew: false,
            question: item.question,
            answer: item.response,
        });
        setMessageBoxes([
            {
                isUser: true,
                content: item.question,
                time: item.updatedAt,
            },
            {
                isUser: false,
                content: item.response,
                time: item.updatedAt,
            },
        ]);
        setCitations(item.answer);
    }
    function setNewChat() {
        setSelectedQuestion({
            isNew: true,
        });
        setMessageBoxes([]);
        setCitations([]);
    }

    return (
        <div
            style={{
                padding: 20,
                color: 'black',
                borderRight: '1px solid #ccc',
                overflowY: 'auto',
                width: '100%',
                height: 'calc(100vh - 107px)',
                paddingTop: 0,
            }}
        >
            <div
                className="flex justify-center sidenav-item"
                style={{
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #ccc',
                    borderRadius: 0,
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    zIndex: 1,
                }}
                onClick={setNewChat}
            >
                <img
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                    }}
                    src="/LinguTechies.svg"
                    alt="logo"
                />
                <h1 style={{ fontSize: 28, fontWeight: 500, paddingTop: 12 }}>Câu Hỏi Mới</h1>
                <EditOutlined style={{ color: '#5073f3' }} />
            </div>
            <div ref={autoAnimateParent} className="question-container mt-5">
                {allQuestions?.map((groupedQuestion) => (
                    <div key={groupedQuestion.date.toString()} className="group-container mt-2">
                        <p className="time">{formatDateByString(groupedQuestion.date)}</p>
                        {groupedQuestion.questions.map((question) => (
                            <div onClick={() => selectQuestion(question)} className="sidenav-item">
                                <MessageOutlined />
                                <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                                    {question.question}
                                </h3>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
