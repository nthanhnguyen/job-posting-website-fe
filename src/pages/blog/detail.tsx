import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Button, Container, Divider, Typography } from '@mui/material';
import dummy from '../resume-builder/data/dummy';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BlogDetail = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 595);
    const [isMobileViewThump, setIsMobileViewThump] = useState(window.innerWidth <= 985);

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 595);
    };

    const handleAnotherResize = () => {
        setIsMobileViewThump(window.innerWidth <= 985);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('resize', handleAnotherResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('resize', handleAnotherResize);
        };
    }, []);

    return (
        <Box sx={{ background: '#f7f7f7' }}>
            <div style={{ height: '360px', width: '100%' }}>
                <h2 style={{ top: isMobileView ? '75px' : '120px', zIndex: 9, position: 'relative', textAlign: 'center', fontSize: '40px', fontWeight: 500, color: 'white' }}>
                    JobHub Blog - Ý tưởng phát triển sự nghiệp IT của bạn
                </h2>
                <div style={{
                    backgroundImage: `url("/src/img/thump.png")`,
                    height: '330px',
                    width: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    position: 'absolute',
                    top: '70px',
                    right: '0px',
                }}></div>
            </div>
            <Container>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={4} columns={32}>
                        {dummy.data?.map((data: any) => {
                            return (
                                <Grid size={{ xs: 16, sm: 10, md: 8 }}
                                    key={data._id}
                                    sx={{
                                        background: '#fff',
                                        height: { xs: 300, sm: 283, md: 265 },
                                        border: '1px solid #eee',
                                        padding: '20px 20px',
                                        textAlign: 'justify',
                                        h1: {
                                            fontWeight: '500',
                                            fontSize: '20px',
                                        },
                                        borderRadius: '12px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                    }}>
                                    <h1>{data.title}</h1>
                                    <p>{data.content}</p>
                                </Grid>

                            );
                        })}
                    </Grid>
                </Box>
                <Divider textAlign="left" sx={{ fontWeight: 'bold', fontSize: '20px', marginTop: '25px', marginBottom: '25px' }}>Mới nhất</Divider>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={4} columns={24} size={{ xs: 16, sm: 10, md: 8 }}>
                        {dummy.blog0?.map((data: any) => {
                            return (
                                <Grid size={{ xs: 32, sm: 12, md: 8 }}
                                    key={data._id}
                                    sx={{
                                        border: '1px solid #eee',
                                        borderRadius: '12px',
                                        background: '#fff',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        height: { xs: 530, sm: 610, md: 600 },
                                    }}>
                                    <a href={`/blog/detail/viecit/${data._id}`}>
                                        <div className='image-blog'
                                            style={{
                                                height: '250px',
                                                width: '100%',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <img style={{ borderRadius: '12px 12px 0 0' }} src={data.image} />
                                        </div>
                                    </a>
                                    <div className='text-blog' style={{ padding: '20px 20px' }}>
                                        <h1 style={{ fontWeight: 'bold', fontSize: '20px', paddingBottom: '12px' }}>{data.title}</h1>
                                        <p style={{ paddingBottom: '12px' }}>{data.description}</p>
                                        <Button sx={{ fontSize: '12px', textTransform: 'inherit' }} size='small' variant="outlined">Việc IT</Button>
                                    </div>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
                <Divider textAlign="left" sx={{ fontWeight: 'bold', fontSize: '20px', marginTop: '25px', marginBottom: '25px' }}>Đọc nhiều nhất</Divider>
                <Grid container spacing={4} columns={24}>
                    {dummy.blog1?.map((data: any) => {
                        return (
                            <Grid size={{ xs: 32, sm: 12, md: 8 }}
                                key={data._id}
                                sx={{
                                    border: '1px solid #eee',
                                    borderRadius: '12px',
                                    background: '#fff',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                    height: { xs: 530, sm: 610, md: 600 },
                                }}>
                                <a href={`/blog/detail/chuyenmonit/${data._id}`}>
                                    <div className='image-blog'
                                        style={{
                                            height: '250px',
                                            width: '100%',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <img style={{ borderRadius: '12px 12px 0 0' }} src={data.image} />
                                    </div>
                                </a>
                                <div className='text-blog' style={{ padding: '20px 20px' }}>
                                    <h1 style={{ fontWeight: 'bold', fontSize: '20px', paddingBottom: '12px' }}>{data.title}</h1>
                                    <p style={{ paddingBottom: '12px' }}>{data.description}</p>
                                    <Button sx={{ fontSize: '12px', textTransform: 'inherit' }} size='small' variant="outlined">Chuyên môn IT</Button>
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
                <Divider textAlign="left" sx={{ fontWeight: 'bold', fontSize: '20px', marginTop: '25px', marginBottom: '25px' }}>Bài viết chọn lọc</Divider>
                <Grid container spacing={4} columns={24}>
                    {dummy.blog2?.map((data: any) => {
                        return (
                            <Grid size={{ xs: 32, sm: 12, md: 8 }}
                                key={data._id}
                                sx={{
                                    border: '1px solid #eee',
                                    borderRadius: '12px',
                                    background: '#fff',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                    height: { xs: 530, sm: 610, md: 600 },
                                }}>
                                <a href={`/blog/detail/chuyenit/${data._id}`}>
                                    <div className='image-blog'
                                        style={{
                                            height: '250px',
                                            width: '100%',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <img style={{ borderRadius: '12px 12px 0 0' }} src={data.image} />
                                    </div>
                                </a>
                                <div className='text-blog' style={{ padding: '20px 20px' }}>
                                    <h1 style={{ fontWeight: 'bold', fontSize: '20px', paddingBottom: '12px' }}>{data.title}</h1>
                                    <p style={{ paddingBottom: '12px' }}>{data.description}</p>
                                    <Button sx={{ fontSize: '12px', textTransform: 'inherit' }} size='small' variant="outlined">Chuyện IT</Button>
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
            <div style={{ display: isMobileViewThump ? 'none' : 'flex', position: 'relative', height: '150px', width: '100%', border: '1px solid red', background: '#FFF5E9', justifyContent: 'center', alignItems: 'center', marginTop: '45px' }}>
                <div style={{ textTransform: 'uppercase', fontSize: '20px', fontWeight: 'bold' }}>
                    <span>Câu chuyện sự nghiệp của bạn sẽ truyền cảm hứng đến rất nhiều người.</span>
                </div>
            </div>
        </Box>
    )
}

export default BlogDetail;