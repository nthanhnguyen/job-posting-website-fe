import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Button, Container, Divider, Typography } from '@mui/material';
import dummy from '../resume-builder/data/dummy';
import Modal from '@mui/material/Modal';
import React from 'react';

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

    return (
        <Box sx={{ background: '#f7f7f7' }}>
            <div style={{ height: '360px', width: '100%' }}>
                <h2 style={{ zIndex: 9, position: 'relative', textAlign: 'center', top: '120px', fontSize: '40px', fontWeight: 500, color: 'white' }}>
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
                                <Grid size={8}
                                    key={data._id}
                                    sx={{
                                        background: '#fff',
                                        height: '280px',
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
                    <Grid container spacing={4} columns={24}>
                        {dummy.blog?.map((data: any) => {
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
                <Divider textAlign="left" sx={{ fontWeight: 'bold', fontSize: '20px', marginTop: '25px', marginBottom: '25px' }}>Đọc nhiều nhất</Divider>
                <Divider textAlign="left" sx={{ fontWeight: 'bold', fontSize: '20px', marginTop: '25px', marginBottom: '25px' }}>Bài viết chọn lọc</Divider>
            </Container>
            <div style={{ height: '150px', width: '100%', border: '1px solid red', background: '#FFF5E9', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
                <div style={{ textTransform: 'uppercase', fontSize: '20px', fontWeight: 'bold' }}>
                    <span>Câu chuyện sự nghiệp của bạn sẽ truyền cảm hứng đến rất nhiều người.</span>
                </div>
                <div>
                    <Button onClick={handleOpen} sx={{ background: 'red', color: '#fff', border: 'unset', fontSize: '18px' }} variant='outlined' size='large'>Chia sẻ ngay</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Chức năng đang hoàn thiện
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Hãy quay lại sau bạn nhé!
                            </Typography>
                        </Box>
                    </Modal>
                </div>
            </div>
        </Box>
    )
}

export default BlogDetail;