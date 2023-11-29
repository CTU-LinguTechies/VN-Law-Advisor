'use client';
import TreeView from '@/components/phapdien/TreeView';
import { Col, Menu, Row } from 'antd';

export default function PhapDien() {
    return (
        <div>
            <Row className="my-5">
                <Col span={6}>
                    <TreeView />
                </Col>
            </Row>
        </div>
    );
}
