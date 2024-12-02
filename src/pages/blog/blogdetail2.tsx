import { useParams } from "react-router-dom";
import dummy from "../resume-builder/data/dummy";
import { Box, Container, Divider } from "@mui/material";
import parse from 'html-react-parser';
import { Col, Row } from "antd";
import { Avatar } from "antd";


const BlogDetailPage2 = () => {
    const { _id } = useParams<string>();
    // Tìm blog dựa trên _id
    const blog = dummy.blog0.find((b) => b._id === _id);

    // Nếu không tìm thấy blog, hiển thị thông báo lỗi
    if (!blog) return (<div style={{ height: '100vh' }}><p>Bài viết không tồn tại</p></div>);

    return (
        <Box>
            <Container>
                <Row gutter={[20, 20]}>
                    <Col span={24} md={16}>
                        <div className="job-tag">
                            <div className="content">
                                <div
                                    style={{
                                        background: '#fff',
                                        minHeight: 280,
                                        padding: 24,
                                        border: '1px solid #eee',
                                        borderRadius: '15px',
                                        marginTop: '48px',

                                    }}
                                >
                                    <h4 style={{ fontWeight: 600, fontSize: '27px', color: 'red', marginBottom: '12px' }}>{blog.title}</h4>
                                    <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '20px' }}>NỘI DUNG CHÍNH</h3>
                                    <Divider />
                                    <img src={blog.image} alt={blog.title} />
                                    {blog?.content?.map((item) => (
                                        <div style={{ boxShadow: 'inherit', background: '#fff ', padding: '30px 30px', textAlign: 'justify' }}
                                            key={item.id}
                                        >
                                            <h3 style={{ fontSize: '26px', fontWeight: 'bold' }}>{item.title_content}</h3>
                                            <div style={{ fontSize: '18px' }}>
                                                <img src={item.images} />
                                                {parse(item.content_data ?? "")}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col span={24} md={8}>
                        <div className="job-listing-wrapper" style={{
                            flexGrow: 1
                        }}>
                            <div className="job-listing" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                maxHeight: '700px',
                                marginTop: '45px',
                            }}>
                                <div className="job-listing" style={{ padding: '0 0 48px 0', display: 'flex', flexDirection: 'column', width: '100%', }}>
                                    {blog.author && (
                                        <div style={{
                                            backgroundColor: '#fff',
                                            minHeight: 'fit-content',
                                            padding: 24,
                                            border: '1px solid #eee',
                                            borderRadius: '15px',
                                            marginBottom: '20px'
                                        }}>
                                            <h3 style={{ fontSize: '18px', marginBottom: '12px', color: 'blue', fontWeight: '500' }}>Được tham vấn thông tin kĩ thuật bởi</h3>
                                            <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '20px' }}>
                                                <Avatar size={{ xl: 60 }} src={<img src={blog.author.avatar} alt="avatar" />} />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <h4>{blog.author.name}</h4>
                                                    <div style={{ fontSize: '15px', color: 'grey', fontWeight: '500' }}><p>{blog.author.role}</p></div>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'justify', fontSize: '16px' }}>
                                                {parse(blog.author.story ?? "")}
                                            </div>

                                        </div>
                                    )}
                                    <div style={{
                                        backgroundColor: '#fff',
                                        minHeight: 'fit-content',
                                        padding: 24,
                                        border: '1px solid #eee',
                                        borderRadius: '15px',
                                        marginBottom: '20px'
                                    }}>
                                        <h3 style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '30px' }}>Related Articles</h3>
                                        {dummy.blog1.map((item: any) => {
                                            return (
                                                <>
                                                    <h2 key={item._id}
                                                        style={{ fontSize: '20px', marginBottom: '20px', fontWeight: '500' }}
                                                    >
                                                        {item.title}
                                                    </h2>
                                                    <Divider />
                                                </>
                                            )
                                        })}
                                        <h2
                                            style={{ fontSize: '20px', fontWeight: '500' }}
                                        >
                                            Git vs GitHub: Các điểm khác nhau và Cách kết hợp
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>


                </Row>
            </Container>
        </Box>
    );
};

export default BlogDetailPage2;
