import { formatDate } from '@/utils/common';
import './messageBox.css';
export interface MessageBoxProps {
    content: string;
    time: Date;
    isUser: boolean;
}

export default function MessageBox({ content, time, isUser }: MessageBoxProps) {
    return (
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
            <div className="message-box">
                <div className={`message ${isUser ? 'user' : 'bot'}`}>
                    <p>{content}</p>
                </div>
                <div className="flex" style={{ justifyContent: 'end' }}>
                    <em className="time block">{formatDate(time)}</em>
                </div>
            </div>
        </div>
    );
}
