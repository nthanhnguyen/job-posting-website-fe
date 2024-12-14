import { callUpdateEmployerRegistrationStatus } from "@/config/api";
import { IEmployerRegistration } from "@/types/backend";
import { Button, Descriptions, Drawer, Form, Select, message, notification } from "antd";
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
const { Option } = Select;

interface IProps {
    onClose: (v: boolean) => void;
    open: boolean;
    dataInit: IEmployerRegistration | null | any;
    setDataInit: (v: any) => void;
    reloadTable: () => void;
}
const ViewDetailEmployerRegistration = (props: IProps) => {
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const { onClose, open, dataInit, setDataInit, reloadTable } = props;
    const [form] = Form.useForm();

    const handleChangeStatus = async () => {
        setIsSubmit(true);

        const status = form.getFieldValue('status');
        const res = await callUpdateEmployerRegistrationStatus(dataInit?._id, status)
        if (res.data) {
            message.success("Thay đổi status thành công!");
            setDataInit(null);
            onClose(false);
            reloadTable();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            });
        }

        setIsSubmit(false);
    }

    useEffect(() => {
        if (dataInit) {
            form.setFieldValue("status", dataInit.status)
        }
        return () => form.resetFields();
    }, [dataInit])

    return (
        <>
            <Drawer
                title="Thông tin đăng ký Nhà tuyển dụng"
                placement="right"
                onClose={() => { onClose(false); setDataInit(null) }}
                open={open}
                width={"40vw"}
                maskClosable={false}
                destroyOnClose
                extra={

                    <Button loading={isSubmit} type="primary" onClick={handleChangeStatus}>
                        Thay đổi status
                    </Button>

                }
            >
                <Descriptions title="" bordered column={2} layout="vertical">
                    <Descriptions.Item label="Email">{dataInit?.email}</Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        <Form
                            form={form}
                        >
                            <Form.Item name={"status"}>
                                <Select
                                    // placeholder="Select a option and change input text above"
                                    // onChange={onGenderChange}
                                    // allowClear
                                    style={{ width: "100%" }}
                                    defaultValue={dataInit?.status}
                                >
                                    <Option value="PENDING">PENDING</Option>
                                    <Option value="REVIEWING">REVIEWING</Option>
                                    <Option value="APPROVED">APPROVED</Option>
                                    <Option value="REJECTED">REJECTED</Option>
                                </Select>
                            </Form.Item>
                        </Form>

                    </Descriptions.Item>
                    <Descriptions.Item label="Họ tên">
                        {dataInit?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                        {dataInit?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Chức vụ">
                        {dataInit?.position}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">
                        {dataInit?.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Biết đến JubHub qua">
                        {dataInit?.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tên Công Ty">
                        {dataInit?.companyName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ Công Ty">
                        {dataInit?.companyAddress}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">{dataInit && dataInit.createdAt ? dayjs(dataInit.createdAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sửa">{dataInit && dataInit.updatedAt ? dayjs(dataInit.updatedAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    {/* <Descriptions.Item label="Chi tiết">
                    {dataInit && dataInit.url &&
                    <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/images/resume/${dataInit?.url}`}
                        target="_blank">Resume
                    </a>
                    }
                    </Descriptions.Item> */}
                </Descriptions>
            </Drawer>
        </>
    )
}

export default ViewDetailEmployerRegistration;