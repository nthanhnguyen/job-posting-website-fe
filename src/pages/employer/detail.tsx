import { Button, Container } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import dummy from '../resume-builder/data/dummy';


const EmployerPage = () => {

    return (
        <Box>
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
            <Container >
                <Box sx={{ flexGrow: 1, paddingTop: '190px', zIndex: 9, position: 'relative' }}>
                    <Grid container spacing={2} columns={16}>
                        <Grid size={8} sx={{
                            h2: {
                                fontSize: '40px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: '#fff'
                            },
                            P: {
                                fontSize: '18px',
                                color: '#fff'
                            },
                        }}  >
                            <h2>Hire the best IT Professionals in Vietnam with ITviec</h2>
                            <p style={{ marginBottom: '10px' }}>With in-depth understanding in the IT sector and specialized skills, we can help you reach and hire the best IT candidates.</p>
                            <Button size="large" sx={{ background: '#C82222', marginBottom: '10px' }} variant="contained">Liên hệ ngay</Button>
                            <p>Already have an Employer account? <a href="/login">Sign in</a></p>
                        </Grid>
                        <Grid size={8}>
                            <div style={{ display: 'flex', width: 400, position: 'relative', left: 120 }}>
                                <img src="/src/img/logo.png" />
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Box sx={{
                backgroundImage: `url("/src/img/bgcompany.svg")`,
                height: '60vh',
                width: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                marginTop: '205px'
            }}>
                <Container>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 100, textAlign: 'center' }}>
                        <div style={{ marginTop: '30px' }}>
                            <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>What makes ITviec different?</h2>
                            <p style={{ fontSize: '20px' }}>ITviec is the top recruiting site and database for IT Professionals in Vietnam.</p>
                        </div>
                        <div>

                        </div>
                    </div>
                    <Box>
                        <Grid container spacing={2} columns={40}>
                            <Grid size={13} sx={{ background: '#fff', height: '170px', padding: '12px 12px', border: '1px solid #eee', borderRadius: '12px' }}>
                                a
                            </Grid>
                            <Grid size={13} sx={{ background: '#fff', height: '170px', padding: '12px 12px', border: '1px solid #eee', borderRadius: '12px' }}>
                                a
                            </Grid>
                            <Grid size={13} sx={{ background: '#fff', height: '170px', padding: '12px 12px', border: '1px solid #eee', borderRadius: '12px' }}>
                                a
                            </Grid>
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
                        <Grid container spacing={2} columns={16}>
                            <Grid size={8}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Box>
                                        <h2 style={{ fontWeight: 'bold', fontSize: '30px' }}>Job Posting</h2>
                                        <p style={{ marginTop: '12px', fontSize: '18px' }}>Boost IT recruiting with our Tech and IT job platform. Manage top candidate CVs from ITviec with ease. Intuitive interface, prompt support, powerful tools.</p>
                                    </Box>
                                    <Box sx={{ fontSize: '18px', fontWeight: '500' }}>
                                        <Grid container spacing={2} columns={16}>
                                            <Grid size={8} sx={{ height: '100px', padding: '7px 7px', background: 'linear-gradient(180deg, #FFF6F6 0%, rgba(255, 223, 223, 0) 100%)' }}>
                                                Better opportunities to approach top IT candidates from ITviec
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
                    <div
                        style={{
                            background: '#fff',
                            minHeight: 350,
                            padding: 24,
                            borderRadius: '15px',
                            marginBottom: '30px',
                        }}
                    >
                        <Grid container spacing={2} columns={16}>
                            <Grid size={8}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    <Box>
                                        <h2 style={{ fontWeight: 'bold', fontSize: '30px' }}>Job Posting</h2>
                                        <p style={{ marginTop: '12px', fontSize: '18px' }}>Boost IT recruiting with our Tech and IT job platform. Manage top candidate CVs from ITviec with ease. Intuitive interface, prompt support, powerful tools.</p>
                                    </Box>
                                    <Box sx={{ fontSize: '18px', fontWeight: '500' }}>
                                        <Grid container spacing={2} columns={16}>
                                            <Grid size={8} sx={{ height: '100px', padding: '7px 7px', background: 'linear-gradient(180deg, #FFF6F6 0%, rgba(255, 223, 223, 0) 100%)' }}>
                                                Better opportunities to approach top IT candidates from ITviec
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
            <Container sx={{ marginTop: '100px' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={4} columns={24}>
                        {dummy.blog1?.map((data: any) => {
                            return (
                                <Grid size={8}
                                    key={data._id}
                                    sx={{
                                        border: '1px solid #eee',
                                        borderRadius: '12px',
                                        background: '#fff',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        height: 600,
                                    }}>
                                    <div className='image-blog'
                                        style={{
                                            height: '250px',
                                            width: '100%',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <img style={{ borderRadius: '12px 12px 0 0' }} src={data.image} />
                                    </div>
                                    <div className='text-blog' style={{ padding: '20px 20px' }}>
                                        <h1 style={{ fontWeight: 'bold', fontSize: '20px', paddingBottom: '12px' }}>{data.title}</h1>
                                        <p style={{ paddingBottom: '12px' }}>{data.content}</p>
                                        <Button sx={{ fontSize: '12px', textTransform: 'inherit' }} size='small' variant="outlined">Chuyên môn IT</Button>
                                    </div>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        h2: {
                            color: 'black',
                            fontSize: '28px',
                            fontWeight: 'bold'
                        },
                        gap: 12,
                        marginTop: '65px'
                    }}>
                    <h2>Experience ITviec's service today</h2>
                    <Button
                        size="large" sx={{ background: '#C82222', marginBottom: '10px', fontSize: '20px' }} variant="contained">Liên hệ ngay</Button>

                </Box>
            </Container>
        </Box >
    )
}

export default EmployerPage;