import styles from 'styles/client.module.scss';
import { Button, Card, Divider } from 'antd';
import 'styles/blog.scss'
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import dummy from '../resume-builder/data/dummy';
import { useState } from 'react';

const Blog = () => {
    const [hoveredLargeCard, setHoveredLargeCard] = useState(null);
    const [hoveredSmallCard, setHoveredSmallCard] = useState(null);

    const handleLargeCardMouseEnter = (id: any) => {
        setHoveredLargeCard(id);
    };

    const handleLargeCardMouseLeave = () => {
        setHoveredLargeCard(null);
    };

    const handleSmallCardMouseEnter = (id: any) => {
        setHoveredSmallCard(id);
    };

    const handleSmallCardMouseLeave = () => {
        setHoveredSmallCard(null);
    };

    const boxStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        gap: '20px',
    };
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
                                    height: 585,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    transform: hoveredLargeCard === data._id ? 'scale(1.02)' : 'scale(1)',
                                    boxShadow: hoveredLargeCard === data._id ? '0px 8px 15px rgba(0, 0, 0, 0.2)' : 'none',
                                }}
                                onMouseEnter={() => handleLargeCardMouseEnter(data._id)}
                                onMouseLeave={handleLargeCardMouseLeave}
                            >
                                <div style={boxStyle}>
                                    <a href='http://localhost:3000/blog/detail/chuyenmonit/AdIQwzwTsilnuxm'>
                                        <div className='img-blog'                                        >
                                            <img src={data.image} style={{ height: '350px', width: '100%', borderRadius: '12px 12px 0 0' }} />
                                        </div>
                                    </a>
                                    <div className='cont-blog'
                                        style={{ padding: '10px 10px' }}
                                    >
                                        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{data.title}</h2>
                                        <p>{data.content}</p>
                                    </div>
                                    <div>
                                        <a style={{ padding: '12px 12px', color: 'blue' }}
                                            href='http://localhost:3000/blog/detail/chuyenmonit/AdIQwzwTsilnuxm'
                                        > Xem thêm</a>
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
                                                height: 280,
                                                position: 'relative',
                                                overflow: 'hidden',
                                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                                transform: hoveredSmallCard === data._id ? 'scale(1.02)' : 'scale(1)',
                                                boxShadow: hoveredSmallCard === data._id ? '0px 8px 15px rgba(0, 0, 0, 0.2)' : 'none',
                                            }}
                                            onMouseEnter={() => handleSmallCardMouseEnter(data._id)}
                                            onMouseLeave={handleSmallCardMouseLeave}
                                        >
                                            <a href={data.link}>
                                                <div className='img-blog'>
                                                    <img src={data.image} style={{ height: '150px', width: '100%', borderRadius: '12px 12px 0 0' }} />
                                                </div>
                                            </a>
                                            <div className='cont-blog'
                                                style={{ padding: '10px 10px' }}
                                            >
                                                <p >{data.content}</p>
                                            </div>
                                            <div>
                                                <Button
                                                    style={{ border: 'none', boxShadow: 'none', color: 'blue' }}
                                                    href={data.link}
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