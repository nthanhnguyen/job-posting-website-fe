import { Button, Col, Form, Input, Modal, Row, Select, Skeleton, Table, Tabs, Tooltip, message, notification } from "antd";
import { isMobile } from "react-device-detect";
import type { TabsProps } from 'antd';
import { IResume, IUser } from "@/types/backend";
import { useState, useEffect } from 'react';
import { callChangePassword, callFetchResumeByUser, callFetchRole, callFetchUserById, callGetSubscriberSkills, callLogin, callUpdateSubscriber, callUpdateUser } from "@/config/api";
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { InfoCircleOutlined, MonitorOutlined } from "@ant-design/icons";
import { SKILLS_LIST } from "@/config/utils";
import { useAppSelector } from "@/redux/hooks";

import { IState, State } from "country-state-city";
import { ProFormSelect } from "@ant-design/pro-components";

interface IProps {
    open: boolean;
    onClose: (v: boolean) => void;
}

const UserResume = (props: any) => {
    const [listCV, setListCV] = useState<IResume[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        const init = async () => {
            setIsFetching(true);
            const res = await callFetchResumeByUser();
            if (res && res.data) {
                setListCV(res.data as IResume[])
            }
            setIsFetching(false);
        }
        init();
    }, [])

    const columns: ColumnsType<IResume> = [
        {
            title: 'STT',
            key: 'index',
            width: 50,
            align: "center",
            render: (text, record, index) => {
                return (
                    <>
                        {(index + 1)}
                    </>)
            }
        },
        {
            title: 'Công Ty',
            dataIndex: ["companyId", "name"],

        },
        {
            title: 'Vị trí',
            dataIndex: ["jobId", "name"],

        },
        {
            title: 'Trạng thái',
            dataIndex: "status",
        },
        {
            title: 'Việc làm đã ứng tuyển',
            dataIndex: "createdAt",
            render(value, record, index) {
                return (
                    <>{dayjs(record.createdAt).format('DD-MM-YYYY HH:mm:ss')}</>
                )
            },
        },
        {
            title: '',
            dataIndex: "",
            render(value, record, index) {
                return (
                    <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/images/resume/${record?.url}`}
                        target="_blank"
                    >Chi tiết</a>
                )
            },
        },
    ];

    return (
        <div>
            <Table<IResume>
                columns={columns}
                dataSource={listCV}
                loading={isFetching}
                pagination={false}
            />
        </div>
    )
}

const UserUpdateInfo = (props: any) => {
    const { reloadTable } = props;
    const [provinces, setProvinces] = useState<IState[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userDetail, setUserDetail] = useState<IUser | null>(null);

    const user = useAppSelector(state => state.account.user);

    // console.log('object :>> ', user);

    useEffect(() => {
        const init = async () => {
            if (user._id) {
                setIsLoading(true)
                const res = await callFetchUserById(user._id);
                if (res?.data) {
                    setUserDetail(res.data)
                }
                setIsLoading(false)
            }
        }
        init();
    }, []);

    const { Option } = Select;

    useEffect(() => {
        const vietnamProvinces: IState[] = State.getStatesOfCountry('VN');
        setProvinces(vietnamProvinces);
    }, []);

    const submitUser = async (valuesForm: any) => {
        const { name, email, password, address, phoneNo, gender } = valuesForm;
        if (user?._id) {
            //update
            const userUpdated = {
                _id: user._id,
                name,
                email,
                password,
                phoneNo,
                gender,
                address,
            }
            console.log('userUpdated :>> ', userUpdated);
            const res = await callUpdateUser(userUpdated);
            if (res.data) {
                console.log('res.data :>> ', res.data);
                message.success("Cập nhật user thành công");
                reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }


    return (
        <div>
            {isLoading ?
                <Skeleton />
                :
                <Form
                    // title={<>{dataInit?._id ? "Cập nhật User" : "Tạo mới User"}</>}
                    // open={openModal}
                    // modalProps={{
                    //     onCancel: () => { handleReset() },
                    //     afterClose: () => handleReset(),
                    //     destroyOnClose: true,
                    //     width: isMobile ? "100%" : 900,
                    //     keyboard: false,
                    //     maskClosable: false,
                    //     okText: <>{dataInit?._id ? "Cập nhật" : "Tạo mới"}</>,
                    //     cancelText: "Hủy"
                    // }}
                    // scrollToFirstError={true}
                    // preserve={false}
                    // form={form}
                    onFinish={submitUser}
                    initialValues={userDetail?._id ? userDetail : {}}

                >
                    <Form.Item
                        style={{ marginBottom: '5px', width: '100%', }}
                        labelCol={{ span: 24 }}
                        label="Tên hiển thị"
                        name="name"
                        rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: '5px', width: '100%' }}
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Email không được để trống!' }]}
                    >
                        <Input type='email' disabled />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: '5px', width: '100%' }}
                        labelCol={{ span: 24 }}
                        label="Số điện thoại"
                        name="phoneNo"
                        rules={[
                            { required: true, message: 'Số điện thoại không được để trống!' },
                            {
                                validator: (_, value) => {
                                    if (value.length < 10 || value.length > 11) {
                                        return Promise.reject('Vui lòng nhập đúng số điện thoại!');
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Input
                            maxLength={11}
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault(); // Chặn ký tự không phải số
                                }
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: '5px', width: '100%' }}
                        labelCol={{ span: 24 }}
                        name="gender"
                        label="Giới tính"
                        rules={[{ required: true, message: 'Giới tính không được để trống!' }]}
                    >
                        <Select allowClear>
                            <Option value="male">Nam</Option>
                            <Option value="female">Nữ</Option>
                            <Option value="other">Khác</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: '5px', width: '100%' }}
                        labelCol={{ span: 24 }}
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Địa chỉ không được để trống!' }]}
                    >
                        <Select placeholder="Chọn tỉnh thành">
                            {provinces.map((province) => (
                                <Option key={province.isoCode} value={province.name}>
                                    {province.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginTop: '20px', marginBottom: '5px', width: '100%' }}
                        >
                            Lưu
                        </Button>
                    </Form.Item>

                </Form>
            }
        </div >

    )
}

const JobByEmail = (props: any) => {
    const [form] = Form.useForm();
    const user = useAppSelector(state => state.account.user);

    useEffect(() => {
        const init = async () => {
            const res = await callGetSubscriberSkills();
            if (res && res.data) {
                form.setFieldValue("skills", res.data.skills);
                form.setFieldValue("level", res.data.level);
            }
        }
        init();
    }, [])

    const onFinish = async (values: any) => {
        const { skills, level } = values;
        const res = await callUpdateSubscriber({
            email: user.email,
            name: user.name,
            skills: skills ? skills : [],
            level: level,
        });
        if (res.data) {
            message.success("Cập nhật thông tin thành công");
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            });
        }

    }

    return (
        <>
            <Form
                onFinish={onFinish}
                form={form}
            >
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Form.Item
                            label={"Kỹ năng"}
                            name={"skills"}
                            rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 skill!' }]}

                        >
                            <Select
                                mode="multiple"
                                allowClear
                                showArrow={false}
                                style={{ width: '100%' }}
                                placeholder={
                                    <>
                                        <MonitorOutlined /> Tìm theo kỹ năng...
                                    </>
                                }
                                optionLabelProp="label"
                                options={SKILLS_LIST}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={6}>
                        <ProFormSelect
                            name="level"
                            label="Trình độ"
                            valueEnum={{
                                INTERN: 'INTERN',
                                FRESHER: 'FRESHER',
                                JUNIOR: 'JUNIOR',
                                MIDDLE: 'MIDDLE',
                                SENIOR: 'SENIOR',
                            }}
                            placeholder="Please select a level"
                            rules={[{ required: true, message: 'Vui lòng chọn level!' }]}
                        />
                    </Col>
                    <Col span={24}>
                        <Button onClick={() => form.submit()}>Cập nhật</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

const ChangePassword = () => {
    const [formConfirmPassword] = Form.useForm();
    const [formChangePassword] = Form.useForm();
    const user = useAppSelector(state => state.account.user);
    const [isCorrectPassword, setIsCorrectPassword] = useState<boolean>(false);

    useEffect(() => {
        const init = async () => {
            const res = await callGetSubscriberSkills();
            if (res && res.data) {
                formConfirmPassword.setFieldValue("skills", res.data.skills);
            }
        }
        init();
    }, [])

    const onFinishConfirmPassword = async (values: any) => {
        const { password } = values;
        const res = await callLogin(user.email, password);

        if (res?.data) {
            message.success("Mật khẩu chính xác!");
            formConfirmPassword.resetFields();
            setIsCorrectPassword(true);
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    // res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                    "Mật khẩu không chính xác!",
                duration: 5
            })
        }

    }

    const onFinishChangePassword = async (values: any) => {
        const { newPassword, confirmPassword } = values;

        if (newPassword !== confirmPassword) {
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Mật khẩu xác nhận không khớp với mật khẩu mới!",
                duration: 5,
            });
            return;
        }

        const res = await callChangePassword(newPassword);

        if (res?.data) {
            message.success("Thay đổi mật khẩu thành công!");
            formChangePassword.resetFields();
            setIsCorrectPassword(false);
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }
    }

    // Password validation function
    const validatePassword = (_: unknown, value: string | undefined) => {
        const passwordRequirements = [
            { regex: /.{8,}/, message: 'Ít nhất 8 ký tự' },
            { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'Ít nhất 1 ký tự đặc biệt (! @ # $ ...)' },
            { regex: /\d/, message: 'Ít nhất 1 số' },
            { regex: /[A-Z]/, message: 'Ít nhất 1 chữ viết HOA' },
            { regex: /[a-z]/, message: 'Ít nhất 1 chữ viết thường' }
        ];

        if (value === undefined || passwordRequirements.some(req => !req.regex.test(value))) {
            return Promise.reject('Mật khẩu của bạn chưa hợp lệ!');
        }
        return Promise.resolve();
    };

    // const validateConfirmPassword = (_: unknown, value: string | undefined) => {
    //     if (value && value !== formChangePassword.getFieldValue("newPassword")) {
    //         return Promise.reject('Mật khẩu xác nhận không khớp!');
    //     }
    //     return Promise.resolve();
    // };

    return (
        <>
            {!isCorrectPassword ?
                <Form
                    onFinish={onFinishConfirmPassword}
                    form={formConfirmPassword}
                >
                    <Form.Item
                        style={{ marginBottom: '5px', width: '50%' }}
                        labelCol={{ span: 24 }}
                        label="Mật khẩu hiện tại"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng điền mật khẩu!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Col span={24}>
                        <Button type="primary" style={{ marginTop: '10px' }} onClick={() => formConfirmPassword.submit()}>Xác nhận</Button>
                    </Col>
                </Form>
                :
                <Form
                    onFinish={onFinishChangePassword}
                    form={formChangePassword}
                >
                    <Form.Item
                        style={{ marginBottom: '5px', width: '50%' }}
                        labelCol={{ span: 24 }}
                        label={
                            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                Mật khẩu mới&nbsp;
                                <Tooltip title={
                                    <>
                                        Yêu cầu mật khẩu:
                                        <ul>
                                            <li>Ít nhất 12 ký tự</li>
                                            <li>Ít nhất 1 ký tự đặc biệt (! @ # $ ...)</li>
                                            <li>Ít nhất 1 số</li>
                                            <li>Ít nhất 1 chữ viết HOA</li>
                                            <li>Ít nhất 1 chữ viết thường</li>
                                        </ul>
                                    </>
                                }>
                                    <InfoCircleOutlined />
                                </Tooltip>
                            </span>
                        }
                        name="newPassword"
                        rules={[
                            { required: true, message: 'Mật khẩu không được để trống!' },
                            // { validator: validatePassword }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: '5px', width: '50%' }}
                        labelCol={{ span: 24 }}
                        label="Xác nhận mật khẩu"
                        name="confirmPassword"
                        rules={[
                            { required: true, message: 'Vui lòng điền mật khẩu!' },
                            // { validator: validateConfirmPassword }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Col span={24}>
                        <Button type="primary" style={{ marginTop: '10px' }} htmlType="submit">Lưu</Button>
                    </Col>
                </Form>
            }

        </>
    )
}

const ManageAccount = (props: IProps) => {
    const { open, onClose } = props;

    const onChange = (key: string) => {
        // console.log(key);
    };

    const user = useAppSelector(state => state.account.user);

    const items: TabsProps['items'] = [
        user?.role.name === 'USER' ? {
            key: 'user-resume',
            label: `Việc làm đã ứng tuyển`,
            children: <UserResume />,
        } : null,
        user?.role.name === 'USER' ? {
            key: 'email-by-skills',
            label: `Kỹ năng và trình độ`,
            children: <JobByEmail />,
        } : null,
        {
            key: 'user-update-info',
            label: `Cập nhật thông tin`,
            children: <UserUpdateInfo />,
        },
        {
            key: 'user-password',
            label: `Thay đổi mật khẩu`,
            children: <ChangePassword />,
        },
    ].filter(item => item !== null);;


    return (
        <>
            <Modal
                title="Quản lý tài khoản"
                open={open}
                onCancel={() => onClose(false)}
                maskClosable={false}
                footer={null}
                destroyOnClose={true}
                width={isMobile ? "100%" : "1000px"}
            >

                <div style={{ minHeight: 400 }}>
                    <Tabs
                        defaultActiveKey="user-resume"
                        items={items}
                        onChange={onChange}
                    />
                </div>

            </Modal>
        </>
    )
}

export default ManageAccount;