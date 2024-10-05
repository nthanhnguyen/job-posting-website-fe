import { callFetchJob } from '@/config/api';
import { LOCATION_LIST, convertSlug, getLocationName } from '@/config/utils';
import { IJob } from '@/types/backend';
import { EnvironmentOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Card, Col, Empty, Pagination, Row, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from 'styles/client.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface IProps {
    showPagination?: boolean;
}

const JobCard = (props: IProps) => {
    const { showPagination = false } = props;
    
    const [skills, setSkills] = useState<string[]>([]);
    const [location, setLocation] = useState<string[]>([]);
    const [searchParams] = useSearchParams();

    const [displayJob, setDisplayJob] = useState<IJob[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
    const navigate = useNavigate();

    useEffect(() => {
        // Get value fezz
        // Lấy giá trị từ query params và cập nhật ngay vào state
        const skillsParam = searchParams.get('skills');
        const locationParam = searchParams.get('location');

        // Use temp variables to save updated value
        const updatedSkills = skillsParam ? skillsParam.split(',') : [];
        const updatedLocation = locationParam ? locationParam.split(',') : [];

        setSkills(updatedSkills);
        setLocation(updatedLocation);

        // Call fetchJob after updated state
        fetchJob(updatedSkills, updatedLocation);
    }, [searchParams, current, pageSize, filter, sortQuery]);

    const fetchJob = async (updatedSkills: string[], updatedLocation: string[]) => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        // Add skills and location to query if exist
        if (updatedSkills.length > 0) {
            query += `&skills=${encodeURIComponent(updatedSkills.join(','))}`;
        }
        if (updatedLocation.length > 0) {
            query += `&location=${encodeURIComponent(updatedLocation.join(','))}`;
        }

        const res = await callFetchJob(query);
        if (res && res.data) {
            setDisplayJob(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
    };

    const handleOnchangePage = (pagination: { current: number, pageSize: number }) => {
        const query = new URLSearchParams();

        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
            // query.set('page', pagination.current.toString());  // Cập nhật tham số 'page'
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        // navigate(`?${query.toString()}`);
    };

    const handleViewDetailJob = (item: IJob) => {
        const slug = convertSlug(item.name);
        navigate(`/job/${slug}?id=${item._id}`);
    };

    return (
        <div className={`${styles["card-job-section"]}`}>
            <div className={`${styles["job-content"]}`}>
                <Spin spinning={isLoading} tip="Loading...">
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <div className={isMobile ? styles["dflex-mobile"] : styles["dflex-pc"]}>
                                <span className={styles["title"]}>Công Việc Mới Nhất</span>
                                {!showPagination &&
                                    <Link to="job">Xem tất cả</Link>
                                }
                            </div>
                        </Col>

                        {displayJob?.map(item => (
                            <Col span={24} md={12} key={item._id}>
                                <Card size="small" title={null} hoverable onClick={() => handleViewDetailJob(item)}>
                                    <div className={styles["card-job-content"]}>
                                        <div className={styles["card-job-left"]}>
                                            <img alt="example" src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${item?.company?.logo}`} />
                                        </div>
                                        <div className={styles["card-job-right"]}>
                                            <div className={styles["job-title"]}>{item.name}</div>
                                            <div className={styles["job-location"]}><EnvironmentOutlined style={{ color: '#58aaab' }} />&nbsp;{getLocationName(item.location)}</div>
                                            <div><ThunderboltOutlined style={{ color: 'orange' }} />&nbsp;{(item.salary + "").replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ</div>
                                            <div className={styles["job-updatedAt"]}>{dayjs(item.updatedAt).fromNow()}</div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}

                        {(!displayJob || displayJob.length === 0) && !isLoading && (
                            <div className={styles["empty"]}>
                                <Empty description="Không có dữ liệu" />
                            </div>
                        )}
                    </Row>
                    {showPagination && (
                        <>
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
                        </>
                    )}
                </Spin>
            </div>
        </div>
    );
};

export default JobCard;
