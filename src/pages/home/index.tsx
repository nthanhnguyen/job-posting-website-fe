import { Col, Divider } from 'antd';
import styles from 'styles/client.module.scss';
import SearchClient from '@/components/client/search.client';
import JobCard from '@/components/client/card/job.card';
import CompanyCard from '@/components/client/card/company.card';
import Blog from '../blog';
import AiResume from '../ai';

const HomePage = () => {
    return (
        <div>

            {/* <div className="search-content" style={{ width: '100%' }} >
                <SearchClient />
            </div> */}
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

                    <Col span={24}><h2 style={{ fontSize: "32px", color: "#fff", marginBottom: '20px' }}>Việc Làm IT Cho Developer "Chất"</h2></Col>
                    <SearchClient />
                </div>
                <CompanyCard />
                <div style={{ margin: 50 }}></div>
                <Divider />
                <JobCard />
                <div style={{ margin: 50 }}></div>
                <Divider />
                <AiResume />
                <Blog />
            </div>
        </div >
    )
}

export default HomePage;