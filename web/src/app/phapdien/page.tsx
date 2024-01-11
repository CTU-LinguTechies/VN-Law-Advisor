'use client';
import ChuongReader from '@/components/phapdien/ChuongReader';
import TreeView from '@/components/phapdien/TreeView';
import { DieuModel } from '@/models/DieuModel';
import { Col, Menu, Row } from 'antd';
import { useState } from 'react';

export interface SelectedChuong {
    mapc: string;
    ten: string;
    stt: number;
    dieus: DieuModel[];
}

export default function PhapDien() {
    const [chuongSelected, setChuongSelected] = useState({} as SelectedChuong);
    return (
        <div>
            <Row gutter={[16, 16]} className="my-5">
                <Col sm={24} md={24} lg={8} span={6}>
                    <TreeView setChuongSelected={setChuongSelected} />
                </Col>
                <Col sm={24} md={24} lg={16} span={18}>
                    <ChuongReader
                        selectedChuong={chuongSelected}
                        setSelectedChuong={setChuongSelected}
                    />
                </Col>
            </Row>
        </div>
    );
}
