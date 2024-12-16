import DataTable from "@/components/client/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IJob } from "@/types/backend";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns, ProFormDigit, ProFormSelect } from '@ant-design/pro-components';
import { Button, Col, Input, InputNumber, Popconfirm, Row, Select, Space, Tag, message, notification } from "antd";
import { useState, useRef } from 'react';
import dayjs from 'dayjs';
import { callDeleteJob, callDownloadReport } from "@/config/api";
import queryString from 'query-string';
import { useNavigate } from "react-router-dom";
import { fetchJob } from "@/redux/slice/jobSlide";
import Access from "@/components/share/access";
import { ALL_PERMISSIONS } from "@/config/permissions";

const JobPage = () => {
    const tableRef = useRef<ActionType>();

    const isFetching = useAppSelector(state => state.job.isFetching);
    const meta = useAppSelector(state => state.job.meta);
    const jobs = useAppSelector(state => state.job.result);

    const [selectedMonth, setSelectedMonth] = useState<string | undefined>(undefined);
    const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);
    // const [price, setPrice] = useState<number | undefined>(undefined);
    const [price, setPrice] = useState<number | null>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleDeleteJob = async (_id: string | undefined) => {
        if (_id) {
            const res = await callDeleteJob(_id);
            if (res && res.data) {
                message.success('Xóa Job thành công');
                reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }

    const reloadTable = () => {
        tableRef?.current?.reload();
    }

    const handleDownloadReport = async () => {
        if (!selectedMonth || !selectedYear || !price) {
            message.error("Vui lòng chọn đầy đủ thông tin.");
            return;
        }

        try {
             // Call the API to generate the report
            const response = await callDownloadReport(Number(price), Number(selectedMonth), Number(selectedYear));

            if (response && response instanceof Blob) {
                const outputFilename = `job-monthly-report-${selectedYear}-${selectedMonth}.xlsx`;

                // Tạo URL từ Blob và bắt đầu tải file
                const url = window.URL.createObjectURL(response);  // Response là Blob
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", outputFilename);
                document.body.appendChild(link);
                link.click();

                // Giải phóng tài nguyên URL sau khi tải
                window.URL.revokeObjectURL(url);
            } else {
                message.error("Không thể tải báo cáo.");
            }
        } catch (error) {
            console.error("Download error:", error);
            message.error("Có lỗi xảy ra khi tải báo cáo.");
        }

    };

    const columns: ProColumns<IJob>[] = [
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
            title: 'Công việc',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: 'Tên công ty',
            dataIndex: ["company", "name"],
            hideInSearch: true,
        },
        {
            title: 'Mức lương',
            dataIndex: 'salary',
            sorter: true,
            render(dom, entity, index, action, schema) {
                const str = "" + entity.salary;
                return <>{str?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ</>
            },
        },
        {
            title: 'Level',
            dataIndex: 'level',
            renderFormItem: (item, props, form) => (
                <ProFormSelect
                    showSearch
                    mode="multiple"
                    allowClear
                    valueEnum={{
                        INTERN: 'INTERN',
                        FRESHER: 'FRESHER',
                        JUNIOR: 'JUNIOR',
                        MIDDLE: 'MIDDLE',
                        SENIOR: 'SENIOR',
                    }}
                    placeholder="Chọn level"
                />
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            render(dom, entity, index, action, schema) {
                return <>
                    <Tag color={entity.isActive ? "lime" : "red"} >
                        {entity.isActive ? "ACTIVE" : "INACTIVE"}
                    </Tag>
                </>
            },
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
        {

            title: 'Actions',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    <Access
                        permission={ALL_PERMISSIONS.JOBS.UPDATE}
                        hideChildren
                    >
                        <EditOutlined
                            style={{
                                fontSize: 20,
                                color: '#ffa500',
                            }}
                            type=""
                            onClick={() => {
                                navigate(`/admin/job/upsert?id=${entity._id}`)
                            }}
                        />
                    </Access>
                    <Access
                        permission={ALL_PERMISSIONS.JOBS.DELETE}
                        hideChildren
                    >
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa job"}
                            description={"Bạn có chắc chắn muốn xóa job này ?"}
                            onConfirm={() => handleDeleteJob(entity._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 10px" }}>
                                <DeleteOutlined
                                    style={{
                                        fontSize: 20,
                                        color: '#ff4d4f',
                                    }}
                                />
                            </span>
                        </Popconfirm>
                    </Access>
                </Space>
            ),
        },
    ];

    const buildQuery = (params: any, sort: any, filter: any) => {
        const clone = { ...params };
        if (clone.name) clone.name = `/${clone.name}/i`;
        if (clone.salary) clone.salary = `/${clone.salary}/i`;
        if (clone?.level?.length) {
            clone.level = clone.level.join(",");
        }

        let temp = queryString.stringify(clone);

        let sortBy = "";
        if (sort && sort.name) {
            sortBy = sort.name === 'ascend' ? "sort=name" : "sort=-name";
        }
        if (sort && sort.salary) {
            sortBy = sort.salary === 'ascend' ? "sort=salary" : "sort=-salary";
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
        return temp;
    }

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear - i).map(year => ({
        value: year.toString(),
        label: year.toString()
    }));

    return (
        <div>
            <Access
                permission={ALL_PERMISSIONS.JOBS.GET_PAGINATE}
            >
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <h2 style={{
                        fontSize: '15px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>
                        Báo cáo giao dịch của các Nhà tuyển dụng:
                    </h2>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={8} lg={5}>
                            <div>Mức phí cho 1 job:</div>
                            <InputNumber
                                value={price}
                                onChange={(value) => setPrice(value)}
                                placeholder="Nhập mức phí"
                                style={{ width: '100%', marginBottom: 12, marginTop: 8 }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => (value ? Number(value.replace(/\$\s?|(,*)/g, '')) : 0)}
                                addonAfter="đ"
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={6} lg={3}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Chọn tháng"
                                value={selectedMonth}
                                onChange={setSelectedMonth}
                                options={[...Array(12).keys()].map(i => ({
                                    value: (i + 1).toString(),
                                    label: (i + 1).toString(),
                                }))}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6} lg={3}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Chọn năm"
                                value={selectedYear}
                                onChange={setSelectedYear}
                                options={years}
                            />
                        </Col>
                    </Row>
                    <Button
                        type="primary"
                        style={{ marginTop: 16 }}
                        onClick={handleDownloadReport}
                    >
                        Xuất file excel
                    </Button>
                </div>

                <DataTable<IJob>
                    actionRef={tableRef}
                    headerTitle="Danh sách Jobs"
                    rowKey="_id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={jobs}
                    request={async (params, sort, filter): Promise<any> => {
                        const query = buildQuery(params, sort, filter);
                        dispatch(fetchJob({ query }))
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
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => navigate('upsert')}
                            >
                                Thêm mới
                            </Button>
                        );
                    }}
                />
            </Access>
        </div>
    )
}

export default JobPage;