import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { IJob } from "@/types/backend";
import { callFetchJobById, callFetchRelatedJob } from "@/config/api";
import styles from 'styles/client.module.scss';
import parse from 'html-react-parser';
import { Col, Divider, Row, Skeleton, Tag, Select, Input, Button } from "antd";
import { DollarOutlined, EnvironmentOutlined, HistoryOutlined } from "@ant-design/icons";
import { getLocationName, getSkillName } from "@/config/utils";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ApplyModal from "@/components/client/modal/apply.modal";
import { FilterOutlined, HeartOutlined, RightCircleOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import { Container } from "@mui/material";
import SearchClient from "@/components/client/search.client";
import { callFetchJob } from '@/config/api';



dayjs.extend(relativeTime)


const ClientJobDetailPage = (props: any) => {
    const [jobDetail, setJobDetail] = useState<IJob | null>(null);
    const [displayJob, setDisplayJob] = useState<IJob[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchParams] = useSearchParams();


    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState("");
    const sortQuery = "sort=-updatedAt"

    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // job id

    useEffect(() => {
        const init = async () => {
            if (id) {
                setIsLoading(true)
                const res = await callFetchJobById(id);
                if (res?.data) {
                    setJobDetail(res.data);
                    console.log('jobDetail :>> ', jobDetail);
                    if (res.data?.skills) {
                        fetchJob(res.data.skills);
                    }
                }
                setIsLoading(false)
            }
        }
        init();
    }, [id]);

    const fetchJob = async (updatedSkills: string[]) => {
        setIsLoading(true);
        let query = `&${sortQuery}`;

        // Add skills and location to query if exist
        if (updatedSkills.length > 0) {
            query += `&skills=${encodeURIComponent(updatedSkills.join(','))}`;
        }

        const res = await callFetchRelatedJob(query);
        if (res && res.data) {
            setDisplayJob(res.data.result);
            setTotal(res.data.meta.total);
        }
        setIsLoading(false);
        console.log(">> check result", displayJob)
    };

    return (


        <div className={`${styles["container"]} ${styles["detail-job-section"]}`}>
            {isLoading ?
                <Skeleton />
                :
                <Row gutter={[20, 20]}>
                    {jobDetail && jobDetail._id &&
                        <>
                            <div style={{
                                backgroundImage: `url("/src/img/thump.png")`,
                                height: '280px',
                                width: '100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '100% 100%',
                                position: 'absolute',
                                top: '70px',
                                right: '0px',
                            }}></div>
                            <div className="top-content" style={{ background: 'transparent', padding: '80px 0', height: '100px', width: '100%' }}>
                                <div className="search-client"
                                    style={{
                                        paddingLeft: '35px'
                                    }}>
                                    <SearchClient />
                                </div>

                            </div>
                            <Container>
                                <div className="company-spotlight-wrapper" style={{ border: '1px solid #eee', display: 'flex', position: 'relative', marginTop: '5px', background: '#fff', borderRadius: '15px' }}>
                                    <div
                                        className='img-company'
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                        }}>
                                        <img src="/src/img/bg.jpg" className='company-thump'
                                            style={{
                                                height: '200px',
                                                width: '300px',
                                                justifyContent: 'center',
                                                borderRadius: '15px'
                                            }} />

                                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${jobDetail.company?.logo}`} className='company-icon'
                                            style={{
                                                height: '120px',
                                                width: '120px',
                                                borderRadius: '10px',
                                                position: 'absolute',
                                                top: '20%',
                                                left: '20%'
                                            }} />



                                        <div className="col-content"
                                            style={{
                                                display: 'flex',
                                                flexGrow: '1',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div
                                                className='col-1-content'
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                    marginLeft: '80px',
                                                    rowGap: '10px',
                                                    flex: '1 1 0'
                                                }}>
                                                <h4
                                                    style={{
                                                        fontSize: '20px'
                                                    }}>
                                                    {jobDetail.company?.name}</h4>
                                                <p style={{
                                                    marginRight: '15px',
                                                }}><EnvironmentOutlined style={{ color: '#58aaab' }} />&nbsp;{getLocationName(jobDetail.location)}</p>
                                                <a href="#" style={{ textDecoration: 'none' }}>Xem 24 việc làm<RightOutlined style={{ fontSize: '14px' }} /></a>
                                            </div>
                                            <div
                                                className='col-2-content'
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'center',
                                                    flexDirection: 'column',
                                                    marginLeft: '60px',
                                                    rowGap: '10px',
                                                    borderLeft: '2px dashed #eee',
                                                    paddingLeft: '20px',
                                                    height: '100%',
                                                    width: '100%',
                                                    flex: '1 1 20px'
                                                }}
                                            >
                                                <p><RightCircleOutlined style={{ fontSize: '14px', marginRight: '2px' }} />{jobDetail.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Container>


                            <Col span={24} md={16}>
                                <div className="sticky-content"
                                    style={{
                                        background: '#fff',
                                        minHeight: 700,
                                        padding: 24,
                                        border: '1px solid #eee',
                                        borderRadius: '15px',
                                        marginTop: '30px',
                                        position: 'sticky',
                                        top: '0px',
                                    }}
                                >
                                    <div className="company-title" style={{ paddingBottom: '15px', display: 'flex' }}>
                                        <img
                                            src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${jobDetail.company?.logo}`}
                                            style={{ height: '100px', width: '100px' }} />
                                        <div style={{
                                            display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', paddingLeft: '12px'
                                        }}>
                                            <h4
                                                style={{
                                                    fontSize: '20px'
                                                }}>
                                                {jobDetail.name}</h4>
                                            <p style={{
                                                marginRight: '15px',
                                            }}><EnvironmentOutlined style={{ color: '#58aaab' }} />&nbsp;{getLocationName(jobDetail.location)}</p>
                                        </div>
                                    </div>
                                    <div className="submit"
                                        style={{ display: 'flex', justifyContent: 'space-between' }}
                                    >
                                        <Button
                                            onClick={() => setIsModalOpen(true)}
                                            className={styles["btn-apply"]}
                                            danger style={{
                                                width: '95%',
                                                height: '50px',
                                            }}>
                                            NỘP ĐƠN ỨNG TUYỂN
                                        </Button>
                                        <HeartOutlined style={{ fontSize: '30px', color: 'red' }} />
                                    </div>
                                    <Divider />
                                    <div className="detail-job"
                                        style={{
                                            maxHeight: '100vh',
                                            overflow: 'scroll',
                                            overflowX: 'hidden'
                                        }}
                                    >
                                        <div style={{
                                            minHeight: 300
                                        }}>
                                            <div className={styles["skills"]}>
                                                {jobDetail?.skills?.map((item, index) => {
                                                    return (
                                                        <Tag key={`${index}-key`} color="gold" >
                                                            {getSkillName(item)}
                                                        </Tag>
                                                    )
                                                })}
                                            </div>
                                            <div className={styles["salary"]}>
                                                <DollarOutlined />
                                                <span>&nbsp;{(jobDetail.salary + "")?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ</span>
                                            </div>
                                            <div className={styles["location"]}>
                                                <EnvironmentOutlined style={{ color: '#58aaab' }} />&nbsp;{getLocationName(jobDetail.location)}
                                            </div>
                                            <div>
                                                <HistoryOutlined /> {dayjs(jobDetail.updatedAt).fromNow()}
                                            </div>
                                            <Divider />
                                            {parse(jobDetail.description)}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        {/* Component job card preview*/}
                        <Col span={24} md={8}>
                                <div className="job-listing-wrapper"
                                    style={{
                                        flexGrow: 1
                                    }}
                                >
                                    <h4 style={{
                                        fontWeight: 500,
                                        fontSize: '20px',
                                        marginBlockStart: '50px',
                                        marginBlockEnd: '50px',
                                        padding: '0 4px',
                                    }}>Việc làm liên quan</h4>

                                    <div
                                        className="job-listing"
                                        style={{
                                            padding: '0 0 48px 0',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',

                                        }}>
                                        {displayJob?.map(item => (
                                            <div className="office-job"
                                                key={item._id}
                                                style={{
                                                    backgroundColor: '#FFF4E9',
                                                    minHeight: 280,
                                                    padding: 24,
                                                    border: '1px solid #eee',
                                                    borderRadius: '15px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                <h4 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px' }}>{item.name}</h4>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                    <div className="company-image"
                                                        style={{ width: '70px', marginBottom: '5px' }}>
                                                        <img alt="example" src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${item?.company?.logo}`} />
                                                    </div>
                                                    <div className="company-name"
                                                        style={{ textTransform: 'uppercase', }}
                                                    >
                                                        {item.company?.name}
                                                    </div>
                                                </div>
                                                <div style={{ fontWeight: '500', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                    <div>
                                                        <p style={{ color: 'green' }}><DollarOutlined />  You'll love it</p>
                                                    </div>
                                                    <div style={{ color: 'green', marginTop: '2px' }}>
                                                        <span>&nbsp;{(item.salary + "")?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ</span>
                                                    </div>
                                                </div>
                                                <Divider />
                                                <div className={styles["job-location"]}><EnvironmentOutlined style={{ color: '#58aaab' }} />&nbsp;{getLocationName(item.location)}</div>
                                                {item?.skills?.map((item, index) => {
                                                    return (
                                                        <Tag key={`${index}-key`} color="red" >
                                                            {getSkillName(item)}
                                                        </Tag>
                                                    )
                                                })}
                                                <Divider />

                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </Col> 

                        </>
                    }
                </Row>
            }
            <ApplyModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                jobDetail={jobDetail}
            />
        </div>
    )
}
export default ClientJobDetailPage;