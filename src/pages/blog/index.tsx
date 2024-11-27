import styles from 'styles/client.module.scss';
import { Button, Card, Divider } from 'antd';
import 'styles/blog.scss'
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import dummy from '../resume-builder/data/dummy';
import { useNavigate } from "react-router-dom";

const Blog = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-container">
            <Divider style={{ marginTop: '45px' }} />
            <span className={styles["title"]}>Bài Viết Nổi Bật</span>
            <Box sx={{ flexGrow: 1, marginTop: '30px' }}>
                <Grid container spacing={3} columns={16}>
                    {dummy.blogcardlarge.map((data) => {
                        return (
                            <Grid size={8}
                                sx={{
                                    background: '#fff',
                                    border: '1px solid #eee',
                                    borderRadius: '12px',
                                    height: 585
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: '20px' }}>
                                    <div className='img-blog'>
                                        <img src={data.image} style={{ height: '350px', width: '100%', borderRadius: '12px 12px 0 0' }} />
                                    </div>
                                    <div className='cont-blog'
                                        style={{ padding: '10px 10px' }}
                                    >
                                        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{data.title}</h2>
                                        <p>{data.content}</p>
                                    </div>
                                    <div>
                                        <Button
                                            style={{ border: 'none', boxShadow: 'none', color: 'blue' }}
                                            onClick={() => navigate('/blog')}
                                        > Xem thêm</Button>
                                    </div>
                                </div>
                            </Grid>
                        )
                    })}

                    <Grid size={8}>
                        <Box sx={{ width: '100%' }}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {dummy.blogcard.map((data) => {
                                    return (
                                        <Grid size={6}
                                            key={data._id}
                                            sx={{
                                                background: '#fff',
                                                border: '1px solid #eee',
                                                borderRadius: '12px',
                                                height: 280
                                            }}
                                        >
                                            <div className='img-blog'>
                                                <img src={data.image} style={{ height: '150px', width: '100%', borderRadius: '12px 12px 0 0' }} />
                                            </div>
                                            <div className='cont-blog'
                                                style={{ padding: '10px 10px' }}
                                            >
                                                <p >{data.content}</p>
                                            </div>
                                            <div>
                                                <Button
                                                    style={{ border: 'none', boxShadow: 'none', color: 'blue' }}
                                                    onClick={() => navigate('/blog')}
                                                > Xem thêm</Button>
                                            </div>
                                        </Grid>
                                    )
                                })}

                            </Grid>
                        </Box>
                    </Grid>
                </Grid >
            </Box >

        </div >
    );
};

export default Blog;