import { formatDate } from '@/utils/common';
import './messageBox.css';
import MarkdownIt from 'markdown-it';
export interface MessageBoxProps {
    content: string;
    time: Date;
    isUser: boolean;
}
const md = new MarkdownIt();

export default function MessageBox({ content, time, isUser }: MessageBoxProps) {
    return (
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
            <div className="message-box">
                <div className={`message ${isUser ? 'user' : 'bot'}`}>
                    <p
                        className="markdown-body"
                        dangerouslySetInnerHTML={{
                            __html: md.render(content),
                        }}
                    ></p>
                </div>
                <div className="flex" style={{ justifyContent: 'end' }}>
                    <em className="time block">{formatDate(time)}</em>
                </div>
            </div>
        </div>
    );
}
