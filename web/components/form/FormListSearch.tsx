'use client';
import { Col, Row, Select, Input } from 'antd';

export default function FormListSearch() {
    const onSelectChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const onSearch = () => {};
    return (
        <div>
            <Row align="middle" gutter={[16, 16]}>
                <Col span={4}>
                    <Select
                        className="w-full"
                        showSearch
                        placeholder="Tìm kiếm theo đề mục..."
                        optionFilterProp="children"
                        onChange={onSelectChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'tom',
                                label: 'Tom',
                            },
                        ]}
                    />
                </Col>
                <Col span={4}>
                    <Input className="w-full" placeholder="Tìm kiếm theo tên..." />
                </Col>
            </Row>
            <Row>
                <Col span={12}></Col>
            </Row>
        </div>
    );
}
