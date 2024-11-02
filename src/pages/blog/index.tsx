import React from "react";
import styles from 'styles/client.module.scss';
import { Card } from 'antd';
import 'styles/blog.scss'
import { RightOutlined } from '@ant-design/icons';

const { Meta } = Card;


const Blog = () => {
    return (
        <div className="bg-container">
            <div className="ant-divider css-dev-only-do-not-override-1ei40mt ant-divider-horizontal" role="separator" style={{ margin: '48px 0' }}></div>
            <span className={styles["title"]}>Bài Viết Nổi Bật</span>
            <div className="container">
                <Card
                    //hoverable
                    style={{ width: 600, height: 590, marginTop: '48px' }}
                    cover={<img alt="example" src="/src/img/blog1.png" />}
                >
                    <Meta title="Học Unreal Engine 5: Lộ trình học và Tài liệu học chi tiết" description="Unreal Engine 5 là phiên bản lập trình game mới nhất của Unreal Engine
 được phát hành vào năm 2023 bởi Epic Games. Công cụ..." />
                    <div className="hyperlink">
                        <a target="blank" href="https://itviec.com/blog/hoc-unreal-engine-5?itm_campaign=featuredpost&itm_medium=footer&itm_source=itviec.com">
                            <p style={{ fontWeight: '500', color: 'blue', fontSize: '16px', paddingTop: '125px' }}>Bắt đầu học<RightOutlined /></p>
                        </a>
                    </div>
                </Card>
                <div className="blog-items">
                    <Card
                        //hoverable
                        style={{ width: 300, margin: '48px 0' }}
                        cover={<img alt="example" src="/src/img/blog2.png" />}
                    >
                        <Meta description="forEach JavaScript: Một số thao tác cơ bản và ví dụ chi tiết" />
                        <div className="hyperlink">
                            <a target="blank" href="https://itviec.com/blog/hoc-unreal-engine-5?itm_campaign=featuredpost&itm_medium=footer&itm_source=itviec.com">
                                <p style={{ fontWeight: '500', color: 'blue', fontSize: '16px', paddingTop: '12px' }}>Bắt đầu học<RightOutlined /></p>
                            </a>
                        </div>
                    </Card>
                    <Card
                        //hoverable
                        style={{ width: 300, margin: '48px 0' }}
                        cover={<img alt="example" src="/src/img/blog2.png" />}
                    >
                        <Meta description="forEach JavaScript: Một số thao tác cơ bản và ví dụ chi tiết" />
                        <div className="hyperlink">
                            <a target="blank" href="https://itviec.com/blog/hoc-unreal-engine-5?itm_campaign=featuredpost&itm_medium=footer&itm_source=itviec.com">
                                <p style={{ fontWeight: '500', color: 'blue', fontSize: '16px', paddingTop: '12px' }}>Bắt đầu học<RightOutlined /></p>
                            </a>
                        </div>
                    </Card>
                    <Card
                        className="blog-bottom"
                        //hoverable
                        style={{ width: 300, margin: '48px 0' }}
                        cover={<img alt="example" src="/src/img/blog2.png" />}
                    >
                        <Meta description="forEach JavaScript: Một số thao tác cơ bản và ví dụ chi tiết" />
                        <div className="hyperlink">
                            <a target="blank" href="https://itviec.com/blog/hoc-unreal-engine-5?itm_campaign=featuredpost&itm_medium=footer&itm_source=itviec.com">
                                <p style={{ fontWeight: '500', color: 'blue', fontSize: '16px', paddingTop: '12px' }}>Bắt đầu học<RightOutlined /></p>
                            </a>
                        </div>
                    </Card>
                    <Card
                        className="blog-bottom"
                        //hoverable
                        style={{ width: 300, margin: '48px 0' }}
                        cover={<img alt="example" src="/src/img/blog2.png" />}
                    >
                        <Meta description="forEach JavaScript: Một số thao tác cơ bản và ví dụ chi tiết" />
                        <div className="hyperlink">
                            <a target="blank" href="https://itviec.com/blog/hoc-unreal-engine-5?itm_campaign=featuredpost&itm_medium=footer&itm_source=itviec.com">
                                <p style={{ fontWeight: '500', color: 'blue', fontSize: '16px', paddingTop: '12px' }}>Bắt đầu học<RightOutlined /></p>
                            </a>
                        </div>
                    </Card>
                </div>
            </div>
        </div >

    );
};

export default Blog;