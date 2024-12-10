import { Button, Container, FormControl, InputLabel, MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Form, Input, Select, Radio } from "antd";
import { ClockCircleOutlined, PhoneOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";


const EmployerPage = () => {

    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1100);
    const [isMobileViewThump, setIsMobileViewThump] = useState(window.innerWidth <= 845);

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 1100);
    };

    const handleAnotherResize = () => {
        setIsMobileViewThump(window.innerWidth <= 845);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('resize', handleAnotherResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('resize', handleAnotherResize);
        };
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        position: "",
        email: "",
        phone: "",
        address: "",
        companyName: "",
        companyUrl: "",
        companyLocation: "",
    });

    //To do
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name || ""]: value }));
    };

    const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Ngăn trang reload
        setFormData({
            name: "",
            position: "",
            email: "",
            phone: "",
            address: "",
            companyName: "",
            companyUrl: "",
            companyLocation: "",
        });
        console.log("Form reset!");
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
                <Grid container spacing={2} 
                    component="form"
                    onSubmit={handleSubmitForm}
                >
                    <Grid sx={{ border: '1px solid #eee', height: 'fit-content', padding: '20px 20px', borderRadius: '15px', background: '#fff', marginBottom: '50px' }} size={{ xs: 12, sm: 8, md: 8 }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Thông tin Quý khách</h2>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid size={{ xs: 12, sm: 8, md: 6 }}>
                                <Form.Item
                                    style={{ marginBottom: '15px', width: '100%', }}
                                    labelCol={{ span: 24 }}
                                    name="name"

                                    rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
                                >
                                    {/* <Input size='large' placeholder="Full Name" /> */}
                                    <TextField id="outlined-basic" fullWidth label="Họ tên" size="small" variant="outlined" />
                                </Form.Item>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Form.Item
                                    style={{ marginBottom: '15px', width: '100%', }}
                                    labelCol={{ span: 24 }}
                                    name="position"

                                    rules={[{ required: true, message: 'Chức vụ không được để trống!' }]}
                                >
                                    {/* <Input size='large' placeholder="Work title" /> */}
                                    <TextField id="outlined-basic" fullWidth label="Chức vụ" size="small" variant="outlined" />
                                </Form.Item>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Form.Item
                                    style={{ marginBottom: '15px', width: '100%', }}
                                    labelCol={{ span: 24 }}
                                    name="email"

                                    rules={[{ required: true, message: 'Email không được để trống!' }]}
                                >
                                    {/* <Input size='large' placeholder="Work email" /> */}
                                    <TextField id="outlined-basic" fullWidth label="Email" size="small" variant="outlined" />
                                </Form.Item>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Form.Item
                                    style={{ marginBottom: '15px', width: '100%', }}
                                    labelCol={{ span: 24 }}
                                    name="phone"

                                    rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                                >
                                    {/* <Input size='large' placeholder="Phone number" /> */}
                                    <TextField id="outlined-basic" fullWidth label="Số điện thoại" size="small" variant="outlined" />
                                </Form.Item>
                            </Grid>
                        </Grid>
                        <Form.Item
                            style={{ marginBottom: '15px', width: '100%', marginTop: '9px' }}
                            labelCol={{ span: 24 }}
                            name="address"
                            rules={[{ required: true, message: 'Địa chỉ không được để trống!' }]}
                        >
                            <Select
                                allowClear
                                placeholder='Bạn biết Job Hub từ đâu?'
                                size="large"
                                style={{ width: '100%' }}
                                options={[
                                    { value: 'google', label: 'Google' },
                                    { value: 'facebook', label: 'Facebook' },
                                    { value: 'email', label: 'Email' },
                                    { value: 'linkedin', label: 'linkedIn' },
                                    { value: 'other', label: 'Others' },
                                ]}
                            />
                        </Form.Item>
                        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Thông tin công ty</h2>
                        <Form.Item
                            style={{ marginBottom: '20px', width: '100%', }}
                            labelCol={{ span: 24 }}
                            name="companyName"

                            rules={[{ required: true, message: 'Tên công ty không được để trống!' }]}
                        >
                            {/* <Input size='large' placeholder="Company name" /> */}
                            <TextField id="outlined-basic" fullWidth label="Tên công ty" size="small" variant="outlined" />
                        </Form.Item>
                        <Select
                            allowClear
                            placeholder='Địa chỉ công ty'
                            size="large"
                            style={{ width: '100%', marginBottom: '20px' }}
                            options={[
                                { value: 'Ha Noi', label: 'Ha Noi' },
                                { value: 'Ho Chi Minh', label: 'Ho Chi Minh' },
                                { value: 'Da Nang', label: 'Da Nang' },
                                { value: 'other', label: 'Others' },
                            ]}
                        />

                        <Form.Item
                            style={{ marginBottom: '10px', width: '100%', }}
                            labelCol={{ span: 24 }}
                            name="companyUrl"
                            // value={formData.name}
                            rules={[{ required: true, message: 'Website URL không được để trống!' }]}
                        >
                            {/* <Input size='large' placeholder="Website URL" /> */}
                            <TextField id="outlined-basic" fullWidth label="Website URL" size="small" variant="outlined" />
                        </Form.Item>
                        {/* <Radio></Radio>I have read and agree to JobHub’s <a style={{ color: 'blue', fontWeight: '500' }}>Terms & Conditions</a> and <a style={{ color: 'blue', fontWeight: '500' }}>Privacy Policy</a> in relation to my privacy information. */}
                        <div style={{ display: 'flex', flexDirection: isMobileView ? 'column' : 'unset', justifyContent: 'space-between', marginTop: '50px' }}>
                            <div>
                                <p>Bạn đã có tài khoản? <a style={{ fontWeight: '500' }} href="/login">Login</a></p>
                            </div>
                            <div><Button type="submit" size="large" sx={{ width: isMobileView ? '100%' : '100%', marginTop: isMobileView ? '20px' : '0', background: '#C82222', marginBottom: '10px' }} variant="contained">Contact me</Button></div>
                        </div>
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
            {/* <Box
                sx={{
                    h2: {
                        color: 'black',
                        fontSize: '28px',
                        fontWeight: 'bold'
                    },
                    background: '#fff',
                    height: '100px',

                    textAlign: 'center'
                }}>
                <h2 style={{
                    position: 'relative',
                    top: '45px',
                }}>Experience JobHub's service today</h2>
            </Box> */}
        </Box >
    )
}

export default EmployerPage;