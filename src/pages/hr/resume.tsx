import DataTable from "@/components/client/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IResume } from "@/types/backend";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns, ProFormSelect } from '@ant-design/pro-components';
import { Button, Input, Select, Space, Tag, message, notification } from "antd";
import { useState, useRef } from 'react';
import dayjs from 'dayjs';
import { callUpdateResumeStatuses } from "@/config/api";
import queryString from 'query-string';
import { fetchResume } from "@/redux/slice/resumeSlide";
import ViewDetailResume from "@/components/admin/resume/view.resume";
import { ALL_PERMISSIONS } from "@/config/permissions";
import Access from "@/components/share/access";
import { fetchResumeForHr } from "@/redux/slice/resumeHrSlide";
import ViewDetailResumeForHr from "@/components/hr/resume/view.resume";

const ResumePageForHr = () => {
    const tableRef = useRef<ActionType>();

    const isFetching = useAppSelector(state => state.resume_hr.isFetching);
    const meta = useAppSelector(state => state.resume_hr.meta);
    const resumes = useAppSelector(state => state.resume_hr.result);
    const dispatch = useAppDispatch();

    const [dataInit, setDataInit] = useState<IResume | null>(null);
    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
    const [selectedResumes, setSelectedResumes] = useState<string[]>([]); // Track selected resumes
    const [minRelevance, setMinRelevance] = useState<number | null>(null);
    const [maxRelevance, setMaxRelevance] = useState<number | null>(null);
    const [selectAll, setSelectAll] = useState(false); // State to track if "select all" checkbox is checked
    const [status, setStatus] = useState<string | undefined>(undefined);

    const reloadTable = () => {
        tableRef?.current?.reload();
    }

    const handleCheckboxChange = async (checked: boolean, _id: string) => {
        await setSelectedResumes((prevSelected) =>
            checked ? [...prevSelected, _id] : prevSelected.filter(id => id !== _id)
        );
    };

    // useEffect(() => {
    // }, [selectedResumes])

    const handleChangeStatus = async () => {
        if (!status) {
            message.warning("Vui lòng chọn trạng thái");
            return;
        }
        console.log('selectedResumes :>> ', selectedResumes);

        const res = await callUpdateResumeStatuses(selectedResumes, status);
        if (res.data) {
            message.success("Cập nhật trạng thái thành công!");
            // Reload the table after successful status update
            reloadTable();
            handleResetSelection();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            });
        }
    };

    const handleSelectResumes = () => {
        // Select resumes within the relevance percentage range
        const selected = resumes.filter((resume) => {
            const relevance = Number(resume.relevancePercentage);
            return relevance >= (minRelevance || 0) && relevance <= (maxRelevance || 100);
        }).map((resume) => resume._id);
    
        // Ensure only non-undefined strings are set in the selectedResumes
        setSelectedResumes(selected.filter((id): id is string => id !== undefined));
    };
    const handleResetSelection = () => {
        // Reset selected resumes
        setSelectedResumes([]);
    };
    const handleSelectAllChange = (checked: boolean) => {
        setSelectAll(checked);
        if (checked) {
            // Select all resumes, ensuring the IDs are strings and not undefined
            const allResumeIds = resumes
                .map((resume) => resume._id)
                .filter((id): id is string => id !== undefined); // Ensure all IDs are strings
            setSelectedResumes(allResumeIds); // Now `allResumeIds` is of type `string[]`
        } else {
            // Deselect all resumes
            setSelectedResumes([]);
        }
    };

    const columns: ProColumns<IResume>[] = [
        {
            title: (
                <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAllChange(e.target.checked)}
                />
            ),
            width: 30,
            render: (text, record, index, action) => {
                // Ensure _id is a string before passing to handleCheckboxChange
                const resumeId = record._id;
                if (resumeId) {
                    return (
                        <input
                            type="checkbox"
                            checked={selectedResumes.includes(resumeId)}
                            onChange={(e) => handleCheckboxChange(e.target.checked, resumeId)}
                        />
                    );
                }
                return null; // Handle the case where _id is undefined
            },
            hideInSearch: true,
        },
        {
            title: 'Id',
            dataIndex: '_id',
            width: 220,
            render: (text, record, index, action) => {
                return (
                    <a href="#" onClick={() => {
                        setOpenViewDetail(true);
                        setDataInit(record);
                    }}>
                        {record._id}
                    </a>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            sorter: true,
            render: (status) => {
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
    
                return <Tag color={color}>{statusText}</Tag>;
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
            title: 'Việc làm',
            dataIndex: ["jobId", "name"],
            hideInSearch: true,
        },
        {
            title: 'Công ty',
            dataIndex: ["companyId", "name"],
            hideInSearch: true,
        },
        {
            title: 'Phù hợp',
            dataIndex: 'relevancePercentage',
            width: 100,
            sorter: true,
            render: (percentage) => {
                // Ensure percentage is a valid number
                const value = Number(percentage);
                
                // Check if the value is a valid number and within range
                if (isNaN(value)) {
                    return <Tag color="default">N/A</Tag>;
                }
        
                let color = '';
                let displayText = '';
        
                if (value === 0) {
                    color = 'red';
                    displayText = '0';
                } else if (value >= 1 && value <= 49) {
                    color = 'orange';
                    displayText = `${value}%`;
                } else if (value >= 50 && value <= 99) {
                    color = 'blue';
                    displayText = `${value}%`;
                } else if (value === 100) {
                    color = 'green';
                    displayText = '100%';
                } else {
                    color = 'default';
                    displayText = `${value}%`;
                }
        
                return <Tag color={color}>{displayText}</Tag>;
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
    ];

    const buildQuery = (params: any, sort: any, filter: any) => {
        const clone = { ...params };
        // if (clone.name) clone.name = `/${clone.name}/i`;
        // if (clone.salary) clone.salary = `/${clone.salary}/i`;
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
        if (sort && sort.relevancePercentage) {
            sortBy = sort.relevancePercentage === 'ascend' ? "sort=relevancePercentage" : "sort=-relevancePercentage";
        }

        //mặc định sort theo updatedAt
        if (Object.keys(sortBy).length === 0) {
            temp = `${temp}&sort=-updatedAt`;
        } else {
            temp = `${temp}&${sortBy}`;
        }

        temp += "&populate=companyId,jobId&fields=companyId._id, companyId.name, companyId.logo, jobId._id, jobId.name";
        return temp;
    }

    return (
        <div>
            <Access
                permission={ALL_PERMISSIONS.RESUMES.GET_PAGINATE}
            >
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <span>Phù hợp: </span>
                    <Input
                        style={{ width: 100, marginRight: 8 }}
                        placeholder="Min"
                        value={minRelevance ?? ''}
                        onChange={(e) => setMinRelevance(Number(e.target.value))}
                        type="number"
                    />
                    <span>-</span>
                    <Input
                        style={{ width: 100, marginRight: 8, marginLeft: 8 }}
                        placeholder="Max"
                        value={maxRelevance ?? ''}
                        onChange={(e) => setMaxRelevance(Number(e.target.value))}
                        type="number"
                    />
                    <Button 
                        style={{ marginRight: 8 }} 
                        onClick={handleSelectResumes} 
                        type="primary"
                    >
                        Chọn nhiều
                    </Button>
                    <Button onClick={handleResetSelection} type="default">
                        Reset
                    </Button>
                </div>
                
                {/* New status dropdown and button */}
                <Space>
                    <Select
                        value={status}
                        onChange={setStatus}
                        style={{ width: 150 }}
                        placeholder="Chọn trạng thái"
                    >
                        <Select.Option value="PENDING">PENDING</Select.Option>
                        <Select.Option value="REVIEWING">REVIEWING</Select.Option>
                        <Select.Option value="APPROVED">APPROVED</Select.Option>
                        <Select.Option value="REJECTED">REJECTED</Select.Option>
                    </Select>
                    <Button 
                        type="primary"
                        onClick={handleChangeStatus}
                    >
                        Thay đổi status
                    </Button>
                </Space>
            </div>
                

            

                <DataTable<IResume>
                    actionRef={tableRef}
                    headerTitle="Danh sách Resumes"
                    rowKey="_id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={resumes}
                    request={async (params, sort, filter): Promise<any> => {
                        const query = buildQuery(params, sort, filter);
                        dispatch(fetchResumeForHr({ query }));
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
            <ViewDetailResumeForHr
                open={openViewDetail}
                onClose={setOpenViewDetail}
                dataInit={dataInit}
                setDataInit={setDataInit}
                reloadTable={reloadTable}
            />
        </div>
    )
}

export default ResumePageForHr;