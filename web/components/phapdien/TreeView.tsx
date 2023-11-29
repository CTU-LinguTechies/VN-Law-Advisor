import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import pdchudeService from '@/services/pdchude.service';
import pdchuongService from '@/services/pdchuong.service';
import pddemucService from '@/services/pddemuc.service';
import pddieuService from '@/services/pddieu.service';

interface DataNode {
    title: string;
    key: string;
    isLeaf?: boolean;
    children?: DataNode[];
}

const initTreeData: DataNode[] = [
    { title: 'Expand to load', key: '0' },
    { title: 'Expand to load', key: '1' },
];

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

export default function TreeView() {
    const [treeData, setTreeData] = useState([] as DataNode[]);
    const [loading, isLoading] = useState(false);

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

    const onLoadData = async ({ key, children }: any) =>
        new Promise<void>((resolve) => {
            if (children) {
                resolve();
                return;
            }

            if (key.startsWith('chude')) {
                pddemucService.getAllByChuDeId(key.split('_')[1]).then((pddemuc: any) => {
                    const data: DataNode[] = pddemuc.map((item: any) => {
                        return {
                            title: `Đề mục: ${item.ten}`,
                            key: `demuc_${item.id.toString()}`,
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
                        } as DataNode;
                    });
                    setTreeData((origin) => updateTreeData(origin, key, data));
                    resolve();
                });
            } else if (key.startsWith('chuong')) {
                pddieuService.getAllByChuongId(key.split('_')[1]).then((pddieu: any) => {
                    const data = pddieu.map(
                        (item: any) =>
                            ({
                                title: `${item.ten}`,
                                key: `dieu_${item.id.toString()}`,
                                isLeaf: true,
                            }) as DataNode,
                    );
                    setTreeData((origin) => updateTreeData(origin, key, data));
                    resolve();
                });
            }
        });
    return (
        <div style={{ marginLeft: 20 }}>
            <h3 style={{ marginTop: 12, marginBottom: 12 }}>Cấu trúc</h3>
            <Tree loadData={onLoadData} treeData={treeData} />
        </div>
    );
}
