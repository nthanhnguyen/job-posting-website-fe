import { Col, Divider } from 'antd';
import styles from 'styles/client.module.scss';
import SearchClient from '@/components/client/search.client';
import JobCard from '@/components/client/card/job.card';
import CompanyCard from '@/components/client/card/company.card';
import Blog from '../blog';
import AiResume from '../ai';
import SubscriberJobCard from '@/components/client/card/job-subscriber.card';
import { useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';

const HomePage = () => {
    const user = useAppSelector(state => state.account.user);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1020);
    const [isMobileViewThump, setIsMobileViewThump] = useState(window.innerWidth <= 775);

    const handleResize = () => {
        setIsMobileView(window.innerWidth <= 1020);
    };

    const handleAnotherResize = () => {
        setIsMobileViewThump(window.innerWidth <= 775);
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
        <div>
            <div className={`${styles["container"]} ${styles["home-section"]}`}>
                <div className='thump' style={{
                    backgroundImage: `url("/src/img/thump.png")`,
                    height: isMobileViewThump ? '390px' : '330px',
                    width: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    position: 'absolute',
                    top: '70px',
                    right: '0px',
                }}>
                </div>
                <div className="search-content" style={{ marginTop: 20, padding: '80px 0' }}>
                    <Col span={24}>
                        <h2 style={{ fontSize: "32px", color: "#fff", marginBottom: '20px', fontWeight: 650 }}>
                            Việc làm cho IT "Chất"
                        </h2>
                    </Col>
                    <SearchClient />
                </div>
                <CompanyCard />
                <div style={{ margin: 50 }}></div>
                <Divider />

                <div
                    className='thump-job'
                    style={{
                        backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/015/621/450/non_2x/abstract-background-simple-hand-drawn-minimalist-style-with-free-shape-and-pastel-colors-background-illustration-for-presentation-vector.jpg")`,
                        height: '717px',
                        width: '100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                        position: 'absolute',
                        top: '907px',
                        right: '0px',
                        display: isMobileView ? 'none' : 'block'
                    }}
                ></div>
                <JobCard />
                <Divider />
                <SubscriberJobCard />
                <div style={{ margin: 50 }}></div>
                <Divider />
                <AiResume />
                <Blog />
            </div>
        </div>
    );
}

export default HomePage;
