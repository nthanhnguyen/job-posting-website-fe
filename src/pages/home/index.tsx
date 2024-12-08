import { Col, Divider } from 'antd';
import styles from 'styles/client.module.scss';
import SearchClient from '@/components/client/search.client';
import JobCard from '@/components/client/card/job.card';
import CompanyCard from '@/components/client/card/company.card';
import Blog from '../blog';
import AiResume from '../ai';
import SubscriberJobCard from '@/components/client/card/job-subscriber.card';
import { useAppSelector } from '@/redux/hooks';

const HomePage = () => {
    const user = useAppSelector(state => state.account.user);


    return (
        <div>
            <div className={`${styles["container"]} ${styles["home-section"]}`}>
                <div className='thump' style={{
                    backgroundImage: `url("/src/img/thump.png")`,
                    height: '330px',
                    width: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    position: 'absolute',
                    top: '70px',
                    right: '0px'
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

                <div className='thump-job' style={{
                    backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/015/621/450/non_2x/abstract-background-simple-hand-drawn-minimalist-style-with-free-shape-and-pastel-colors-background-illustration-for-presentation-vector.jpg")`,
                    height: '717px',
                    width: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    position: 'absolute',
                    top: '907px',
                    right: '0px'
                }}>
                </div>
                <JobCard />
                <Divider />
                {user && <SubscriberJobCard />}
                <div style={{ margin: 50 }}></div>
                <Divider />
                <AiResume />
                <Blog />
            </div>
        </div>
    )
}

export default HomePage;