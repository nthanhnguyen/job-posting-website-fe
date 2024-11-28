import { Button, Divider, Form, Input, Select, message, notification, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { callRegister } from 'config/api';
import styles from 'styles/auth.module.scss';
import { IUser } from '@/types/backend';
const { Option } = Select;
import { State, IState } from 'country-state-city';
import { RegisterContext } from '@/config/context';
import { RegisterSteps } from './page';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const [provinces, setProvinces] = useState<IState[]>([]);
    const { setStep } = useContext(RegisterContext);

    useEffect(() => {
        const vietnamProvinces: IState[] = State.getStatesOfCountry('VN');
        setProvinces(vietnamProvinces);
    }, []);

    const onFinish = async (values: IUser) => {
        const { name, email, password, phoneNo, gender, address } = values;
        setIsSubmit(true);
        const res = await callRegister(name, email, password as string, phoneNo, gender, address);
        setIsSubmit(false);
        if (res?.data?._id) {
            message.success('Thông tin đăng ký hợp lệ!');
            setStep(RegisterSteps.SEND_MAIL);
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            });
        }
    };

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

    return (
        <div className={styles["register-page"]}
            style={{
                backgroundImage: `url(${"/src/img/bg.jpg"})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <main className={styles.main}>
                <div className={styles.container}>
                    <section className={styles.wrapper}>
                        <div className={styles.heading}>
                            <h2 className={`${styles.text} ${styles[""]}`}
                                style={{ textAlign: 'center' }}> Đăng Ký Tài Khoản </h2>
                            <Divider />
                        </div>
                        <Form<IUser>
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                style={{ marginBottom: '5px' }}
                                labelCol={{ span: 24 }}
                                label="Họ tên"
                                name="name"
                                rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: '5px' }}
                                labelCol={{ span: 24 }}
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email không được để trống!' }]}
                            >
                                <Input type='email' />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: '5px' }}
                                labelCol={{ span: 24 }}
                                label={
                                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        Mật khẩu&nbsp;
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
                                name="password"
                                rules={[
                                    { required: true, message: 'Mật khẩu không được để trống!' },
                                    { validator: validatePassword }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: '5px' }}
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
                                style={{ marginBottom: '5px' }}
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
                                    loading={isSubmit}
                                    style={{ width: '100%' }}
                                >
                                    Đăng ký
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text text-normal">Đã có tài khoản?
                                <span>
                                    <Link to='/login'> Đăng Nhập</Link>
                                </span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default RegisterForm;
