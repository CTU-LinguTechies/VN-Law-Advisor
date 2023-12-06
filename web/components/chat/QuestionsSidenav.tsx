'use client';
import { EditOutlined, MessageOutlined } from '@ant-design/icons';
import './sidenav.css';
import { formatDate } from '@/utils/common';

export default function QuestionSideNav() {
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
            <div className="question-container mt-5">
                <div className="group-container mt-2">
                    <p className="time">{formatDate(new Date())}</p>
                    <div className="sidenav-item active">
                        <MessageOutlined />
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Quy định hành vi của người dùng về việc hôn nhân
                        </h3>
                    </div>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Nên làm gì khi giấy tờ tùy thân bị mất
                        </h3>
                    </div>
                </div>
                <div className="group-container">
                    <p className="time">{formatDate(new Date())}</p>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Quy định hành vi của người dùng về việc hôn nhân
                        </h3>
                    </div>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Nên làm gì khi giấy tờ tùy thân bị mất
                        </h3>
                    </div>
                </div>
                <div className="group-container">
                    <p className="time">{formatDate(new Date())}</p>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Quy định hành vi của người dùng về việc hôn nhân
                        </h3>
                    </div>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Nên làm gì khi giấy tờ tùy thân bị mất
                        </h3>
                    </div>
                </div>
                <div className="group-container">
                    <p className="time">{formatDate(new Date())}</p>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Quy định hành vi của người dùng về việc hôn nhân
                        </h3>
                    </div>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Nên làm gì khi giấy tờ tùy thân bị mất
                        </h3>
                    </div>
                </div>
                <div className="group-container">
                    <p className="time">{formatDate(new Date())}</p>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Quy định hành vi của người dùng về việc hôn nhân
                        </h3>
                    </div>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Nên làm gì khi giấy tờ tùy thân bị mất
                        </h3>
                    </div>
                </div>
                <div className="group-container">
                    <p className="time">{formatDate(new Date())}</p>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Quy định hành vi của người dùng về việc hôn nhân
                        </h3>
                    </div>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Nên làm gì khi giấy tờ tùy thân bị mất
                        </h3>
                    </div>
                </div>
                <div className="group-container">
                    <p className="time">{formatDate(new Date())}</p>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Quy định hành vi của người dùng về việc hôn nhân
                        </h3>
                    </div>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Nên làm gì khi giấy tờ tùy thân bị mất
                        </h3>
                    </div>
                </div>
                <div className="group-container">
                    <p className="time">{formatDate(new Date())}</p>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Quy định hành vi của người dùng về việc hôn nhân
                        </h3>
                    </div>
                    <div className="sidenav-item">
                        <h3 style={{ fontSize: 20, fontWeight: 200 }}>
                            Nên làm gì khi giấy tờ tùy thân bị mất
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
