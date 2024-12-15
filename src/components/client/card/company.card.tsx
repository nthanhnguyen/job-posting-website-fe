import { callFetchCompany, callFetchJobForCompany } from '@/config/api';
import { convertSlug } from '@/config/utils';
import { ICompany } from '@/types/backend';
import { Card, Col, Divider, Empty, Pagination, Row, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Link, useNavigate } from 'react-router-dom';
import styles from 'styles/client.module.scss';

interface IProps {
    showPagination?: boolean;
}

const CompanyCard = (props: IProps) => {
    const { showPagination = false } = props;

    const [displayCompany, setDisplayCompany] = useState<ICompany[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
    const navigate = useNavigate();

    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const [totalJobs, setTotalJobs] = useState<{ [key: string]: number }>({}); 

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetchCompany();
    }, [current, pageSize, filter, sortQuery]);

    const fetchCompany = async () => {
        setIsLoading(true)
        let query = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        const res = await callFetchCompany(query);
        if (res && res.data) {
            setDisplayCompany(res.data.result);
            setTotal(res.data.meta.total)
        }
        setIsLoading(false)
    }


    const handleOnchangePage = (pagination: { current: number, pageSize: number }) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }
    }

    const handleViewDetailJob = (item: ICompany) => {
        if (item.name) {
            const slug = convertSlug(item.name);
            navigate(`/company/${slug}?id=${item._id}`)
        }
    }

    // const totalJobOfCompany = async (companyId?: string): Promise<number> => {
    //     let query = `companyId=${companyId}`;
    //     if (companyId) {
    //         setIsLoading(true);
    //         const res = await callFetchJobForCompany(query);
    //         if (res?.data) {
    //             const jobs = res.data.result;
    //             setIsLoading(false);
    //             return jobs.length;
    //         }
    //     }
    //     return 0;
    // }

    const totalJobOfCompany = async (companyId?: string): Promise<number> => {
        let query = `companyId=${companyId}`;
        if (companyId) {
            setIsLoading(true);
            const res = await callFetchJobForCompany(query);
            if (res?.data) {
                const jobs = res.data.result;
                setIsLoading(false);
                return jobs.length;
            }
        }
        return 0;
    }

    const getTotalJobs = async (companyId?: string) => {
        if (companyId && !(companyId in totalJobs)) {
            const totalJobCount = await totalJobOfCompany(companyId);
            setTotalJobs(prevState => ({
                ...prevState,
                [companyId]: totalJobCount
            }));
        }
    };

    useEffect(() => {
        if (displayCompany) {
            displayCompany.forEach(item => {
                getTotalJobs(item._id);
            });
        }
    }, [displayCompany]);

    return (
        <div className={`${styles["company-section"]}`}>
            <div className={styles["company-content"]}>
                <Spin spinning={isLoading} tip="Loading...">
                    <Row gutter={[20, 20]}>
                        <Col span={24} >
                            <div className={isMobile ? styles["dflex-mobile"] : styles["dflex-pc"]}>
                                <span className={styles["title"]} style={{ fontWeight: 600, fontSize: '30px' }}>Nhà tuyển dụng</span>
                                {!showPagination &&
                                    <Link to="company">Xem tất cả</Link>
                                }
                            </div>
                        </Col>

                        {displayCompany?.map(item => {
                            let totalJob = 0;
                            if (item._id) {
                                totalJob = totalJobs[item._id] ?? 0;
                            }
                            return (
                                <Col span={24}
                                    xs={24}
                                    sm={12}
                                    md={8}
                                    lg={6} key={item._id} >
                                    <Card
                                        onClick={() => handleViewDetailJob(item)}
                                        style={{
                                            backgroundImage: `url('https://freesvg.org/img/1666855551curved-lines-on-white-background.png')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            height: isMobile ? 260 : 330,
                                        }}
                                        hoverable
                                        cover={
                                            <div className={styles["card-customize"]}
                                            >
                                                <img
                                                    alt="example"
                                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${item?.logo}`}
                                                    style={{
                                                        height: isMobile ? '150px' : '200px',
                                                        width: isMobile ? '150px' : '200px',
                                                        background: '#fff'
                                                    }}
                                                />
                                            </div>
                                        }
                                    >
                                        {/* <Divider /> */}
                                        <div style={{ width: "100%", height: '20px' }}></div>
                                        <h3 style={{ textAlign: "center", fontWeight: 'bold', fontSize: isMobile ? '16px' : '20px', position: 'relative', top: '-10px', zIndex: 5 }}>{item.name}</h3>
                                        <h3 style={{ textAlign: "center", fontWeight: 'bold', fontSize: isMobile ? '16px' : '10px', position: 'relative', top: '-10px', zIndex: 5 }}>{item.address}</h3>
                                        <h3 style={{ textAlign: "center", fontWeight: 'bold', fontSize: isMobile ? '16px' : '10px', position: 'relative', top: '-10px', zIndex: 5 }}>{totalJob} Việc làm đang tuyển</h3>
                                    </Card>
                                    <div style={{
                                        background: '#F5F5F5',
                                        width: isMobileView ? '96%' : '94%',
                                        height: '78px',
                                        position: 'absolute',
                                        bottom: '0',
                                        marginBottom: '0px',
                                        borderRadius: '0 0 12px 12px',
                                    }}></div>
                                </Col>
                            )
                        })}

                        {(!displayCompany || displayCompany && displayCompany.length === 0)
                            && !isLoading &&
                            <div className={styles["empty"]}>
                                <Empty description="Không có dữ liệu" />
                            </div>
                        }
                    </Row>
                    {showPagination && <>
                        <div style={{ marginTop: 30 }}></div>
                        <Row style={{ display: "flex", justifyContent: "center" }}>
                            <Pagination
                                current={current}
                                total={total}
                                pageSize={pageSize}
                                responsive
                                onChange={(p: number, s: number) => handleOnchangePage({ current: p, pageSize: s })}
                            />
                        </Row>
                    </>}
                </Spin>
            </div>
        </div>
    )
}

export default CompanyCard;