import { Button, Container, FormControl, InputLabel, MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Form, Input, Select, Radio, Spin } from "antd";
import { ClockCircleOutlined, PhoneOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";


const EmployerPage = () => {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1100);
    const [isMobileViewThump, setIsMobileViewThump] = useState(window.innerWidth <= 845);

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 1100);
    };

    const handleAnotherResize = () => {
        setIsMobileViewThump(window.innerWidth <= 845);
    };


    const [form] = Form.useForm()


    useEffect(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('resize', handleAnotherResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('resize', handleAnotherResize);
        };
    }, []);

    const [formData, setFormData] = useState<{
        name: string;
        position: string;
        email: string;
        phone: string;
        address?: string; // Optional, to support placeholder
        companyName: string;
        companyUrl: string;
        companyAddress?: string; // Optional, to support placeholder
    }>({
        name: "",
        position: "",
        email: "",
        phone: "",
        address: undefined,
        companyName: "",
        companyUrl: "",
        companyAddress: undefined,
    });

    //To do
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name || ""]: value }));
    };

    const handleSelectChangeLocation = (value: string) => {
        setFormData((prev) => ({ ...prev, companyAddress: value }));
    };


    const handleSelectChangeAddress = (value: string, option: any) => {
        setFormData((prev) => ({ ...prev, address: value }));
    };

    const [errors, setErrors] = useState({
        name: false,
        position: false,
        email: false,
        phone: false,
        address: false,
        companyName: false,
        companyUrl: false,
        companyAddress: false,
    });

    const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newErrors = {
            name: !formData.name,
            position: !formData.position,
            email: !formData.email,
            phone: !formData.phone,
            address: !formData.address,
            companyName: !formData.companyName,
            companyUrl: !formData.companyUrl,
            companyAddress: !formData.companyAddress,
        };

        setErrors(newErrors);

        // Nếu không có lỗi thì có thể submit form
        if (!Object.values(newErrors).includes(true)) {
            form.setFieldsValue({
                address: undefined, // Reset giá trị address về undefined
                companyAddress: undefined,
            });
            console.log('Form Data:', formData); // Log the form data here
            // Reset form data after submission (optional)
            setFormData({
                name: "",
                position: "",
                email: "",
                phone: "",
                address: undefined, // Reset to undefined
                companyName: "",
                companyUrl: "",
                companyAddress: undefined, // Reset to undefined
            });

            //TODO

        }
    };

    return (
        <Box sx={{ background: '#eee' }}>
            <div style={{
                backgroundImage: `url("/src/img/thump.png")`,
                height: '667px',
                width: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                position: 'absolute',
                top: '70px',
                right: '0px',
            }}></div>
            <Container>
                <Box sx={{ flexGrow: 1, paddingTop: '190px', zIndex: 9, position: 'relative' }}>
                    <Grid sx={{
                        flexDirection: isMobileViewThump ? 'column-reverse' : 'unset',
                        position: isMobileViewThump ? 'relative' : 'unset',
                        bottom: '50px'
                    }}
                        container spacing={2} columns={16}>
                        <Grid size={{ xs: 16, sm: 12, md: 8 }} sx={{
                            h2: {
                                fontSize: isMobileViewThump ? '20px' : '40px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: '#fff',
                                textAlign: isMobileViewThump ? 'center' : 'unset'
                            },
                            P: {
                                fontSize: isMobileViewThump ? '16px' : '18px',
                                color: '#fff',
                                textAlign: isMobileViewThump ? 'center' : 'unset'
                            },
                        }}  >
                            <h2>Thuê những chuyên gia CNTT giỏi nhất với JobHub</h2>
                            <p style={{ marginBottom: '10px', textAlign: 'justify' }}>Với hiểu biết sâu sắc về lĩnh vực CNTT và các kỹ năng chuyên môn, chúng tôi có thể giúp bạn tiếp cận và tuyển dụng được những ứng viên CNTT giỏi nhất.</p>
                            <div style={{ display: 'flex', justifyContent: isMobileViewThump ? 'center' : 'flex-start' }}>
                                <Button size="large" sx={{ background: '#C82222', marginBottom: '10px' }} variant="contained">Liên hệ ngay</Button>
                            </div>
                            <p>Bạn đã có tài khoản? <a style={{ fontWeight: '500' }} href="/login">Đăng nhập</a></p>
                        </Grid>
                        <Grid size={{ xs: 20, sm: 12, md: 8 }}>
                            <div style={{ display: 'flex', width: isMobileViewThump ? 150 : 400, alignItems: 'center', justifyContent: 'center', position: 'relative', left: 150 }}>
                                <img src="/src/img/logo.png" />
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Box sx={{
                backgroundImage: `url("/src/img/bgcompany.svg")`,
                height: 'fit-content',
                width: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                marginTop: '205px',
                marginBottom: '25px'
            }}>
                <Container>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 100, textAlign: 'center' }}>
                        <div style={{ marginTop: '30px' }}>
                            <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>What makes JobHub different?</h2>
                            <p style={{ fontSize: '20px' }}>JobHub is the top recruiting site and database for IT Professionals in Vietnam.</p>
                        </div>
                        <div>

                        </div>
                    </div>
                    <Box>
                        <Grid container spacing={2} columns={40}>
                            <Grid size={{ xs: 40, sm: 20, md: 13 }} sx={{ background: '#fff', height: '170px', padding: '12px 12px', border: '1px solid #eee', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position: 'relative', top: '-50px' }}>
                                    <div>
                                        <img src="https://itviec.com/assets/employer_landing/first-hand-8f9978db44dfb1095793ff239fa072e94bfd1d74d7b62a875d7f69eba997b911.svg" />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{ fontSize: '40px', fontWeight: '500', color: 'blue', fontFamily: 'fantasy' }}>10,000+</h2>
                                        <p>IT Companies & Enterprises</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid size={{ xs: 40, sm: 20, md: 13 }} sx={{ background: '#fff', height: '170px', padding: '12px 12px', border: '1px solid #eee', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position: 'relative', top: '-50px' }}>
                                    <div>
                                        <img src="https://itviec.com/assets/employer_landing/second-hand-ef88cbd609f610ad98826b198a83feb349b8896a396f114c31721640592f6698.svg" />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{ fontSize: '40px', fontWeight: '500', color: 'blue', fontFamily: 'fantasy' }}>1,500,000+</h2>
                                        <p>CVs sent</p>
                                    </div>
                                </div>                            </Grid>
                            <Grid size={{ xs: 40, sm: 20, md: 13 }} sx={{ background: '#fff', height: '170px', padding: '12px 12px', border: '1px solid #eee', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position: 'relative', top: '-50px' }}>
                                    <div>
                                        <img src="https://itviec.com/assets/employer_landing/third-hand-4285467762b4dd431d96729f58e05928f8b304f711ce0d683660648ebd294f36.svg" />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{ fontSize: '40px', fontWeight: '500', color: 'blue', fontFamily: 'fantasy' }}>300,000+</h2>
                                        <p>Highly-experienced IT Profiles matched</p>
                                    </div>
                                </div>                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <Box sx={{
                backgroundImage: `url("/src/img/thump.png")`,
                height: '130vh',
                width: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                display: isMobileView ? 'none' : 'block'
            }}>
                <Container sx={{ position: 'relative', top: '25px', display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <h2 style={{ color: 'white', fontSize: '30px', marginBottom: '20px', fontWeight: 'bold' }}>
                            High-value services for IT Employers
                        </h2>
                    </div>
                    <div
                        style={{
                            background: '#fff',
                            minHeight: 350,
                            padding: 24,
                            borderRadius: '15px',
                            marginBottom: '30px',
                        }}
                    >
                        <Grid container spacing={9} columns={16}>
                            <Grid size={8} sx={{ width: 400 }}>
                                <img src="https://itviec.com/assets/employer_landing/ai-match-15-22d68e502f2d153eec13bae292cf4207d3e90e22ff153b0a28cfcfd26592f75f.png" />
                            </Grid>
                            <Grid size={8}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Box>
                                        <h2 style={{ fontWeight: 'bold', fontSize: '30px' }}>
                                            AI Match</h2>
                                        <p style={{ marginTop: '12px', fontSize: '18px' }}>Connect with a diverse pool of active IT Professionals. Effortlessly approach top candidates with one click. Unlock perfect matches.</p>
                                    </Box>
                                    <Box sx={{ fontSize: '18px', fontWeight: '500', display: 'flex', flexDirection: 'column' }}>
                                        <Grid sx={{ fontWeight: '400', height: 'fit-content', padding: '7px 7px', background: 'linear-gradient(180deg, #FFF6F6 0%, rgba(255, 223, 223, 0) 100%)' }}>
                                            Best-fit candidates are matched based on their skills, experience, job preferences and more
                                        </Grid>
                                        <Grid sx={{ fontWeight: '400', height: 'fit-content', padding: '7px 7px', background: 'linear-gradient(180deg, #FFF6F6 0%, rgba(255, 223, 223, 0) 100%)' }}>
                                            Only connect with IT talents who are active in making a career jump
                                        </Grid>
                                    </Box>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div
                        style={{
                            background: '#fff',
                            minHeight: 350,
                            padding: 24,
                            borderRadius: '15px',
                            marginBottom: '30px',
                        }}
                    >
                        <Grid container spacing={9} columns={16}>
                            <Grid size={8}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Box>
                                        <h2 style={{ fontWeight: 'bold', fontSize: '30px' }}>Job Posting</h2>
                                        <p style={{ marginTop: '12px', fontSize: '18px' }}>Boost IT recruiting with our Tech and IT job platform. Manage top candidate CVs from JobHub with ease. Intuitive interface, prompt support, powerful tools.</p>
                                    </Box>
                                    <Box sx={{ fontSize: '18px', fontWeight: '500' }}>
                                        <Grid container spacing={2} columns={16}>
                                            <Grid size={8} sx={{ height: '100px', padding: '7px 7px', background: 'linear-gradient(180deg, #FFF6F6 0%, rgba(255, 223, 223, 0) 100%)' }}>
                                                Better opportunities to approach top IT candidates from JobHub
                                            </Grid>
                                            <Grid size={8} sx={{ height: '100px', padding: '7px 7px', background: 'linear-gradient(180deg, #FFF6F6 0%, rgba(255, 223, 223, 0) 100%)' }}>
                                                Attract the right candidates by the right skills
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </div>
                            </Grid>
                            <Grid size={8} sx={{ width: 400 }}>
                                <img src="/src/img/ep1.webp" />
                            </Grid>
                        </Grid>

                    </div>

                </Container>
            </Box>
            <Container sx={{ marginTop: '60px' }}>
                <Grid container spacing={2} component="form" onSubmit={handleSubmitForm}>

                    <Grid sx={{ border: '1px solid #eee', height: 'fit-content', padding: '20px 20px', borderRadius: '15px', background: '#fff', marginBottom: '50px' }} size={{ xs: 12, sm: 8, md: 8 }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Thông tin Quý khách</h2>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid size={{ xs: 12, sm: 8, md: 6 }}>
                                <TextField
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    label="Họ tên"
                                    size="small"
                                    variant="outlined"
                                    style={{ marginBottom: '15px' }}
                                    helperText={errors.name ? 'Vui lòng điền họ tên' : ''}
                                    FormHelperTextProps={{
                                        style: { color: 'red' }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    name="position"
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    fullWidth
                                    label="Chức vụ"
                                    size="small"
                                    variant="outlined"
                                    style={{ marginBottom: '15px' }}
                                    helperText={errors.position ? 'Vui lòng điền chức vụ' : ''}
                                    FormHelperTextProps={{
                                        style: { color: 'red' }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                    label="Email"
                                    size="small"
                                    variant="outlined"
                                    style={{ marginBottom: '15px' }}
                                    helperText={errors.email ? 'Vui lòng điền Email' : ''}
                                    FormHelperTextProps={{
                                        style: { color: 'red' }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    fullWidth
                                    label="Số điện thoại"
                                    size="small"
                                    variant="outlined"
                                    style={{ marginBottom: '15px' }}
                                    helperText={errors.phone ? 'Vui lòng điền số điện thoại' : ''}
                                    FormHelperTextProps={{
                                        style: { color: 'red' }
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmitForm} // Xử lý submit
                            initialValues={formData} // Truyền formData vào initialValues
                        >
                            <Form.Item
                                name="address"
                                style={{ width: '100%', marginBottom: '20px' }}
                                validateStatus={errors.address ? 'error' : ''}
                                help={errors.address ? <span style={{ color: 'red' }}>Vui lòng chọn</span> : ''}
                            >
                                <Select
                                    allowClear
                                    onChange={handleSelectChangeAddress} // Xử lý khi chọn giá trị
                                    placeholder="Bạn biết Job Hub từ đâu"
                                    size="large"
                                >
                                    <Option value="Google">Google</Option>
                                    <Option value="Facebook">Facebook</Option>
                                    <Option value="LinkedIn">LinkedIn</Option>
                                    <Option value="Email">Email</Option>
                                    <Option value="Other">Khác</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Thông tin công ty</h2>
                        <TextField
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            fullWidth
                            label="Tên công ty"
                            size="small"
                            variant="outlined"
                            style={{ marginBottom: '15px' }}
                            helperText={errors.companyName ? 'Vui lòng điền tên công ty' : ''}
                            FormHelperTextProps={{
                                style: { color: 'red' }
                            }}
                        />
                        <Form
                            form={form} // Kết nối form instance
                            layout="vertical"
                            onFinish={handleSubmitForm} // Xử lý submit
                            initialValues={formData} // Truyền formData vào initialValues
                        >
                            <Form.Item
                                style={{ width: '100%', marginBottom: '20px' }}
                                name="companyAddress"
                                validateStatus={errors.companyAddress ? 'error' : ''}
                                help={errors.companyAddress ? <span style={{ color: 'red' }}>Vui lòng chọn</span> : ''}
                            >
                                <Select

                                    allowClear
                                    onChange={handleSelectChangeLocation}
                                    placeholder='Địa chỉ công ty'
                                    size="large"
                                >
                                    <Option value="Ha Noi">Hà Nội</Option>
                                    <Option value="Ho Chi Minh">Hồ Chí Minh</Option>
                                    <Option value="Da Nang">Đà Nẵng</Option>
                                    <Option value="other">Khác</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                        <TextField
                            name="companyUrl"
                            value={formData.companyUrl}
                            onChange={handleInputChange}
                            fullWidth
                            label="Website URL"
                            size="small"
                            variant="outlined"
                            style={{ marginBottom: '15px' }}
                            helperText={errors.companyUrl ? 'Vui lòng điền Website công ty' : ''}
                            FormHelperTextProps={{
                                style: { color: 'red' }
                            }}
                        />
                        <Button
                            type="submit"
                            size="large"
                            sx={{
                                width: '100%',
                                marginTop: '20px',
                                background: '#C82222',
                                marginBottom: '10px'
                            }}
                            variant="contained"
                        >
                            Liên hệ ngay
                        </Button>
                    </Grid>
                    <Grid sx={{ border: '1px solid #eee', height: 'fit-content', marginBottom: isMobileView ? '30px' : '0px' }} size={{ xs: 12, sm: 8, md: 4 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ height: 100, borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '10px 10px', gap: 10, fontSize: '20px' }}>
                                <PhoneOutlined style={{ fontSize: '30px', color: 'blue' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, }}>
                                    <h2>Hotline Ho Chi Minh</h2>
                                    <p style={{ fontWeight: '600' }}>0-123-456-789</p>
                                </div>
                            </div>
                            <div style={{ height: 100, borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '10px 10px', gap: 10, fontSize: '20px' }}>
                                <PhoneOutlined style={{ fontSize: '30px', color: 'blue' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, }}>
                                    <h2>Hotline Ha Noi</h2>
                                    <p style={{ fontWeight: '600' }}>0-123-456-789</p>
                                </div>
                            </div>
                            <div style={{ height: 100, borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '10px 10px', gap: 10, fontSize: '20px' }}>
                                <ClockCircleOutlined style={{ fontSize: '30px', color: 'blue' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, }}>
                                    <h2>Working time</h2>
                                    <p style={{ fontWeight: '600' }}>Mon - Fri | 8:30 - 17:00</p>
                                </div>
                            </div>
                        </div>
                    </Grid>

                </Grid>

            </Container>
        </Box >
    )
}

export default EmployerPage;