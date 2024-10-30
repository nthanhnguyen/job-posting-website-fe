import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { ICompany } from "@/types/backend";
import { callFetchCompanyById } from "@/config/api";
import styles from 'styles/client.module.scss';
import parse from 'html-react-parser';
import { Col, Divider, Row, Skeleton, Button, Menu } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import type { MenuProps } from 'antd';


type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
    {
        label: <Link to={'/'}>GIỚI THIỆU</Link>,
        key: 'home',
    },
    {
        label: <Link to={'/users'}>ĐÁNH GIÁ</Link>,
        key: 'users',
    }
];

const ClientCompanyDetailPage = (props: any) => {
    const [companyDetail, setCompanyDetail] = useState<ICompany | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const topContentRef = React.useRef<HTMLDivElement | null>(null);
    const [isStickyVisible, setIsStickyVisible] = useState(false);
    const [current, setCurrent] = useState('home');

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // job id

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    useEffect(() => {
        const init = async () => {
            if (id) {
                setIsLoading(true)
                const res = await callFetchCompanyById(id);
                if (res?.data) {
                    setCompanyDetail(res.data)
                }
                setIsLoading(false)
            }
        }
        init();
    }, [id]);

    const handleScroll = () => {
        if (topContentRef.current) {
            const topContentHeight = topContentRef.current.offsetHeight; // Get the height of top-content
            const scrollY = window.scrollY;

            // Show sticky header if scrolled past the height of top-content
            setIsStickyVisible(scrollY > topContentHeight);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`${styles["container"]} ${styles["detail-job-section"]}`}>
            {isLoading ?
                <Skeleton />
                :
                <Row gutter={[20, 20]}>
                    {companyDetail && companyDetail._id &&
                        <>
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
                            <div className="top-content" ref={topContentRef} style={{ height: '100%', background: 'transparent', marginBottom: '15px', padding: '80px 0' }}>
                                <Container className="container-content" style={{ display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'left' }}>
                                    <div className="logo-company" style={{ zIndex: 4 }}>
                                        <img
                                            style={{ height: '150px', width: '150px' }}
                                            src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${companyDetail?.logo}`} />
                                    </div>
                                    <div className="infor-company" style={{ zIndex: 4 }}>
                                        <h4 style={{ fontSize: '25px', color: 'white' }}>{companyDetail.name}</h4>
                                        <div style={{ display: 'flex' }}>
                                            <p style={{ marginRight: '15px', color: 'white' }}>
                                                <EnvironmentOutlined style={{ color: '#58aaab' }} />&nbsp;{(companyDetail?.address)}
                                            </p>
                                            {/* <p style={{ color: 'white' }}>
                                                <i style={{ fontSize: '15px', marginRight: '2px' }} className="fa-solid fa-bag-shopping"></i>
                                                9 việc làm đang tuyển dụng
                                            </p> */}
                                        </div>
                                        <div className="btn-cmt">
                                            <Button type="primary" danger size="large" style={{ marginRight: '10px' }}>Viết đánh giá</Button>
                                            <Button danger size="large">Theo dõi</Button>
                                        </div>
                                    </div>
                                </Container>
                            </div>

                            {/* {isStickyVisible && (
                                <div className="top-content-sticky"
                                    style={{
                                        background: '#121212',
                                        height: '70px',
                                        width: '100%',
                                        padding: '12px 12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                        position: 'sticky',
                                        top: '-20px',
                                        zIndex: 9,
                                        marginTop: 0
                                    }}>
                                    <div className="content-sticky-infor" style={{ color: 'white', fontWeight: 'bold' }}>
                                        <h2>{companyDetail.name}</h2>
                                    </div>
                                    <div className="content-sticky-btn">
                                        <Button type="primary" danger size="large" style={{ marginRight: '10px' }}>Viết đánh giá</Button>
                                        <Button danger size="large">Theo dõi</Button>
                                    </div>
                                </div>
                            )} */}


                            <Col span={24} md={16}>
                                <div className="job-tag">
                                    <div className="content">
                                        <div
                                            style={{
                                                background: '#fff',
                                                minHeight: 20,
                                                padding: 10,
                                                border: '1px solid #eee',
                                                borderRadius: '15px',
                                            }}
                                        >
                                            <Container>
                                                <Menu
                                                    onClick={onClick}
                                                    selectedKeys={[current]}
                                                    mode="horizontal"
                                                    items={items}
                                                />
                                            </Container>
                                        </div>
                                        <div
                                            style={{
                                                background: '#fff',
                                                minHeight: 280,
                                                padding: 24,
                                                border: '1px solid #eee',
                                                borderRadius: '15px',
                                                marginTop: '48px'
                                            }}
                                        >
                                            <h4>THÔNG TIN CHUNG</h4>
                                            <Divider />
                                            {parse(companyDetail?.description ?? "")}
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col span={24} md={8}>
                                <div className="job-listing-wrapper" style={{ marginTop: 90 }}>
                                    <h4 style={{
                                        fontSize: '25px', marginBlockStart: '50px', marginBlockEnd: '50px', padding: '0 4px', marginLeft: '25px'
                                    }}>Việc làm đang tuyển dụng</h4>
                                    <div className="job-listing"
                                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', maxHeight: '700px', overflow: 'scroll', marginTop: '45px', overflowX: 'hidden' }}
                                    >
                                        <div className="office-job"
                                            style={{
                                                background: '#FFF4E9', minHeight: '280px', padding: '24px', border: '1px solid #eee', borderRadius: '15px', width: '300px', marginBottom: '20px'
                                            }}>
                                            <h4>Blablabla</h4>
                                            <Divider />
                                            <p>Content</p>
                                            <Divider />
                                            <p>Content</p>
                                        </div>
                                        <div className="office-job"
                                            style={{
                                                background: '#FFF4E9', minHeight: '280px', padding: '24px', border: '1px solid #eee', borderRadius: '15px', width: '300px', marginBottom: '20px'
                                            }}>
                                            <h4>Blablabla</h4>
                                            <Divider />
                                            <p>Content</p>
                                            <Divider />
                                            <p>Content</p>
                                        </div>
                                        <div className="office-job"
                                            style={{
                                                background: '#FFF4E9', minHeight: '280px', padding: '24px', border: '1px solid #eee', borderRadius: '15px', width: '300px', marginBottom: '20px'
                                            }}>
                                            <h4>Blablabla</h4>
                                            <Divider />
                                            <p>Content</p>
                                            <Divider />
                                            <p>Content</p>
                                        </div>
                                        <div className="office-job"
                                            style={{
                                                background: '#FFF4E9', minHeight: '280px', padding: '24px', border: '1px solid #eee', borderRadius: '15px', width: '300px', marginBottom: '20px'
                                            }}>
                                            <h4>Blablabla</h4>
                                            <Divider />
                                            <p>Content</p>
                                            <Divider />
                                            <p>Content</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>



                        </>
                    }
                </Row>
            }
        </div >
    )
}
export default ClientCompanyDetailPage;