import React, { useEffect, useState } from 'react';
import { Tree, Card } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import pdchudeService from '@/services/pdchude.service';
import pdchuongService from '@/services/pdchuong.service';
import pddemucService from '@/services/pddemuc.service';
import pddieuService from '@/services/pddieu.service';

import { useSearchParams } from 'next/navigation';

interface TreeViewProps {
    setChuongSelected: React.Dispatch<React.SetStateAction<any>>;
}

interface DataNode {
    title: string;
    key: string;
    ten: string;
    isLeaf?: boolean;
    children?: DataNode[];
}

const updateTreeData = (list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] =>
    list.map((node) => {
        if (node.key === key) {
            return {
                ...node,
                children,
            };
        }
        if (node.children) {
            return {
                ...node,
                children: updateTreeData(node.children, key, children),
            };
        }
        return node;
    });

export default function TreeView({ setChuongSelected }: TreeViewProps) {
    const [treeData, setTreeData] = useState([] as DataNode[]);
    const [loading, isLoading] = useState(false);

    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

    const params = useSearchParams();
    const dieu = params.get('id');

    useEffect(() => {
        async function fetchAllChuDes() {
            const pdchude = await pdchudeService.getAll();
            const data = pdchude.map((item: any) => {
                return {
                    title: `Chủ đề ${item.stt}: ${item.ten}`,
                    key: `chude_${item.id.toString()}`,
                    children: undefined,
                } as DataNode;
            });
            setTreeData(data);
        }
        fetchAllChuDes();
    }, []);

    useEffect(() => {
        async function getDieu() {
            if (dieu && !loading) {
                isLoading(true);
                const pdchude = await pdchudeService.getAll();
                const data = pdchude.map((item: any) => {
                    return {
                        title: `Chủ đề ${item.stt}: ${item.ten}`,
                        key: `chude_${item.id.toString()}`,
                        children: undefined,
                    } as DataNode;
                });
                setTreeData(data);
                // Update tree data
                const { chuDe, deMuc, chuong, dieus } =
                    await pddieuService.getDieuTreeViewByMapc(dieu);
                setChuongSelected({ mapc: chuong.mapc, ten: chuong.ten, dieus: dieus });
                const keyChuong = `chuong_${chuong.mapc}`;
                const keyDeMuc = `demuc_${deMuc.id}`;
                const keyChuDe = `chude_${chuDe.id}`;
                setExpandedKeys([keyChuDe, keyDeMuc, keyChuong]);
                setSelectedKeys([keyChuong]);
                await onLoadData({
                    key: `chude_${chuDe.id}`,
                    ten: chuDe.ten,
                    children: undefined,
                });

                await onLoadData({
                    key: `demuc_${deMuc.id}`,
                    ten: deMuc.ten,
                    children: undefined,
                });
            }
        }
        getDieu();
    }, [dieu]);

    const onSelect = async (selectedKeys: React.Key[], info: any) => {
        if (selectedKeys.length === 0) return;
        setSelectedKeys(selectedKeys);
        const key = selectedKeys[0].toString().split('_')[1] as string;
        pddieuService.getAllByChuongId(key).then((pddieu: any) => {
            setChuongSelected({ mapc: key, ten: info.node.title, dieus: pddieu.content });
        });
    };

    const onLoadData = async ({ key, ten, children }: any) =>
        new Promise<void>((resolve) => {
            if (children) {
                resolve();
                return;
            }
            setExpandedKeys((origin) => [...origin, key]);
            setSelectedKeys([key]);

            if (key.startsWith('chude')) {
                pddemucService.getAllByChuDeId(key.split('_')[1]).then((pddemuc: any) => {
                    const data: DataNode[] = pddemuc.map((item: any) => {
                        return {
                            title: `Đề mục: ${item.ten}`,
                            key: `demuc_${item.id.toString()}`,
                            ten: item.ten,
                            children: undefined,
                        } as DataNode;
                    });
                    setTreeData((origin) => updateTreeData(origin, key, data));
                    resolve();
                });
            } else if (key.startsWith('demuc')) {
                pdchuongService.getAllByDemucId(key.split('_')[1]).then((pdchuong: any) => {
                    const data: DataNode[] = pdchuong.map((item: any) => {
                        return {
                            title: `${item.ten}`,
                            key: `chuong_${item.mapc.toString()}`,
                            children: undefined,
                            isLeaf: true,
                            ten: item.ten,
                        } as DataNode;
                    });
                    setTreeData((origin) => updateTreeData(origin, key, data));
                    resolve();
                });
            }
        });
    return (
        <div style={{ marginLeft: 20, position: 'sticky', top: 20 }}>
            <Card>
                <div className="flex justify-between">
                    <h3 style={{ marginTop: 12, marginBottom: 12 }}>Mục lục Pháp Điển</h3>
                    <UnorderedListOutlined />
                </div>
                <Tree
                    selectedKeys={selectedKeys}
                    expandedKeys={expandedKeys}
                    onSelect={onSelect}
                    loadData={onLoadData}
                    treeData={treeData}
                    height={560}
                    showLine
                />
            </Card>
        </div>
    );
}
