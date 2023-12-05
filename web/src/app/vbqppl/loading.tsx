import { Spin } from 'antd';

export default function Loading() {
    return (
        <div className="w-full h-[800px] flex justify-center">
            <Spin size="large"></Spin>
        </div>
    );
}
