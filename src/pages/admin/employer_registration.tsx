import DataTable from "@/components/client/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IEmployerRegistration, IResume } from "@/types/backend";
import { ActionType, ProColumns, ProFormSelect } from '@ant-design/pro-components';
import { Button, Select, Space, Tag, message, notification } from "antd";
import { useState, useRef } from 'react';
import dayjs from 'dayjs';
import queryString from 'query-string';
import ViewDetailResume from "@/components/admin/resume/view.resume";
import { ALL_PERMISSIONS } from "@/config/permissions";
import Access from "@/components/share/access";
import { fetchEmployerRegistration } from "@/redux/slice/employerRegistrationSlide";
import { EditOutlined } from "@ant-design/icons";
import ViewDetailEmployerRegistration from "@/components/admin/employer-registration/view.employer-registration";

const EmployerRegistrationPage = () => {
    const tableRef = useRef<ActionType>();

    const isFetching = useAppSelector(state => state.employer_registration.isFetching);
    const meta = useAppSelector(state => state.employer_registration.meta);
    const employerRegistration = useAppSelector(state => state.employer_registration.result);
    const dispatch = useAppDispatch();

    const [dataInit, setDataInit] = useState<IEmployerRegistration | any | null>(null);
    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
    const [status, setStatus] = useState<string | undefined>(undefined);


    const reloadTable = () => {
        tableRef?.current?.reload();
    }

    const columns: ProColumns<any>[] = [
        {
            title: 'STT',
            key: 'index',
            width: 50,
            align: "center",
            render: (text, record, index) => {
                return (
                    <>
                        {(index + 1) + (meta.current - 1) * (meta.pageSize)}
                    </>)
            },
            hideInSearch: true,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            width: 120,
            sorter: true,
            render: (status, record) => {
                let color = '';
                let statusText = '';
    
                switch (status) {
                    case 'PENDING':
                        color = 'orange';
                        statusText = 'PENDING';
                        break;
                    case 'REVIEWING':
                        color = 'blue';
                        statusText = 'REVIEWING';
                        break;
                    case 'APPROVED':
                        color = 'green';
                        statusText = 'APPROVED';
                        break;
                    case 'REJECTED':
                        color = 'red';
                        statusText = 'REJECTED';
                        break;
                    default:
                        color = 'default';
                        statusText = 'UNKNOWN';
                }
    
                // return <Tag color={color}>{statusText}</Tag>;
                return (
                    <Space>
                        <Tag color={color}>{statusText}</Tag>
                        <Button
                            type="link"
                            icon={<EditOutlined />} // Sử dụng icon Edit từ Ant Design
                            onClick={() => {
                                setOpenViewDetail(true);
                                setDataInit(record);
                            }}
                        />
                    </Space>
                );
            },
            renderFormItem: (item, props, form) => (
                <ProFormSelect
                    showSearch
                    mode="multiple"
                    allowClear
                    valueEnum={{
                        PENDING: 'PENDING',
                        REVIEWING: 'REVIEWING',
                        APPROVED: 'APPROVED',
                        REJECTED: 'REJECTED',
                    }}
                    placeholder="Chọn status"
                />
            ),
        },

        {
            title: 'Email',
            dataIndex: "email",
            hideInSearch: true,
        },
        {
            title: 'Số điện thoại',
            width: 150,
            dataIndex: "phone",
            hideInSearch: true,
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
            width: 100,
            sorter: true,
            hideInSearch: true,
        },
        {
            title: 'Công ty',
            dataIndex: 'companyName',
            width: 280,
            sorter: true,
            hideInSearch: true,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            width: 150,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>{dayjs(record.createdAt).format('DD-MM-YYYY HH:mm:ss')}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Ngày sửa',
            dataIndex: 'updatedAt',
            width: 150,
            sorter: true,
            render: (text, record, index, action) => {
                return (
                    <>{dayjs(record.updatedAt).format('DD-MM-YYYY HH:mm:ss')}</>
                )
            },
            hideInSearch: true,
        },
    ];

    const buildQuery = (params: any, sort: any, filter: any) => {
        const clone = { ...params };

        if (clone?.status?.length) {
            clone.status = clone.status.join(",");
        }

        let temp = queryString.stringify(clone);

        let sortBy = "";
        if (sort && sort.status) {
            sortBy = sort.status === 'ascend' ? "sort=status" : "sort=-status";
        }

        if (sort && sort.createdAt) {
            sortBy = sort.createdAt === 'ascend' ? "sort=createdAt" : "sort=-createdAt";
        }
        if (sort && sort.updatedAt) {
            sortBy = sort.updatedAt === 'ascend' ? "sort=updatedAt" : "sort=-updatedAt";
        }

        //mặc định sort theo updatedAt
        if (Object.keys(sortBy).length === 0) {
            temp = `${temp}&sort=-updatedAt`;
        } else {
            temp = `${temp}&${sortBy}`;
        }

        // temp += "&populate=companyId,jobId&fields=companyId._id, companyId.name, companyId.logo, jobId._id, jobId.name";
        return temp;
    }

    return (
        <div>
            <Access
                permission={ALL_PERMISSIONS.EMPLOYER_REGISTRATION.GET_PAGINATE}
            >
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
            </div>
                
                <DataTable<any>
                    actionRef={tableRef}
                    headerTitle="Danh sách đăng ký Nhà tuyển dụng"
                    rowKey="_id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={employerRegistration}
                    request={async (params, sort, filter): Promise<any> => {
                        const query = buildQuery(params, sort, filter);
                        dispatch(fetchEmployerRegistration({ query }))
                    }}
                    scroll={{ x: true }}
                    pagination={
                        {
                            current: meta.current,
                            pageSize: meta.pageSize,
                            showSizeChanger: true,
                            total: meta.total,
                            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                        }
                    }
                    rowSelection={false}
                    toolBarRender={(_action, _rows): any => {
                        return (
                            <></>
                        );
                    }}
                />
            </Access>
            <ViewDetailEmployerRegistration
                open={openViewDetail}
                onClose={setOpenViewDetail}
                dataInit={dataInit}
                setDataInit={setDataInit}
                reloadTable={reloadTable}
            />
        </div>
    )
}

export default EmployerRegistrationPage;