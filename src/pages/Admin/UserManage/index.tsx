import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {useRef} from 'react';
import {searchUsers} from "@/services/ant-design-pro/api";
import {Image} from 'antd';

export const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
};


const columns: ProColumns<API.CurrentUser>[] = [
    {
        dataIndex: 'id',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '用户名',
        dataIndex: 'username',
        copyable: true,
    },
    {
        title: '账户',
        dataIndex: 'userAccount',
        copyable: true,
    },
    {
        title: '头像',
        dataIndex: 'avatarUrl',
        render: (_, record) => (
            <div>
                <Image src={record.avatarUrl} width={50} height={50}/>
            </div>
        ),
    },
    {
        title: '会员编号',
        dataIndex: 'vipCode',
        copyable: true,
    },
    {
        title: '性别',
        dataIndex: 'gender',
    },
    {
        title: '电话',
        dataIndex: 'phone',
        copyable: true,
    },
    {
        title: '邮件',
        dataIndex: 'email',
        copyable: true,
    },
    {
        title: '状态',
        dataIndex: 'userStatus',
    },
    {
        title: '角色',
        dataIndex: 'userRole',
        valueType: 'select',
        valueEnum: {
            0: {text:'普通用户',status:'Default'},
            1: {text:'管理员',status:'Success'},
            //Default-灰色 Success-绿色 Error-红色
        }
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateTime',
    },
    /*{
        disable: true,
        title: '状态',
        dataIndex: 'state',
        filters: true,
        onFilter: true,
        ellipsis: true,
        valueType: 'select',
        valueEnum: {
            all: {text: '超长'.repeat(50)},
            open: {
                text: '未解决',
                status: 'Error',
            },
            closed: {
                text: '已解决',
                status: 'Success',
                disabled: true,
            },
            processing: {
                text: '解决中',
                status: 'Processing',
            },
        },
    },*/
    /*{
        disable: true,
        title: '标签',
        dataIndex: 'labels',
        search: false,
        renderFormItem: (_, {defaultRender}) => {
            return defaultRender(_);
        },
        render: (_, record) => (
            <Space>
                {record.labels.map(({name, color}) => (
                    <Tag color={color} key={name}>
                        {name}
                    </Tag>
                ))}
            </Space>
        ),
    },*/
    {
        title: '操作',
        valueType: 'option',
        key: 'option',
        render: (text, record, _, action) => [
            <a
                key="editable"
                onClick={() => {
                    action?.startEditable?.(record.id);
                }}
            >
                编辑
            </a>,
            <a href={record.avatarUrl} target="_blank" rel="noopener noreferrer" key="view">
                查看
            </a>,
            <TableDropdown
                key="actionGroup"
                onSelect={() => action?.reload()}
                menus={[
                    {key: 'copy', name: '复制'},
                    {key: 'delete', name: '删除'},
                ]}
            />,
        ],
    },
];

export default () => {
    const actionRef = useRef<ActionType>();
    return (
        <ProTable<API.CurrentUser>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params, sort, filter) => {
                console.log(sort, filter);
                await waitTime(2000);
                const userList = await searchUsers();
                return {
                    data: userList
                }
            }}
            editable={{
                type: 'multiple',
            }}
            columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                defaultValue: {
                    option: {fixed: 'right', disable: true},
                },
                onChange(value) {
                    console.log('value: ', value);
                },
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            options={{
                setting: {
                    listsHeight: 400,
                },
            }}
            form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                syncToUrl: (values, type) => {
                    if (type === 'get') {
                        return {
                            ...values,
                            created_at: [values.startTime, values.endTime],
                        };
                    }
                    return values;
                },
            }}
            pagination={{
                pageSize: 5,
                onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle="高级表格"
            toolBarRender={() => [
                /*<Button
                  key="button"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    actionRef.current?.reload();
                  }}
                  type="primary"
                >
                  新建
                </Button>,*/
            ]}
        />
    );
};
