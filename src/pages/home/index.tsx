import { Divider } from 'antd';
import styles from 'styles/client.module.scss';
import SearchClient from '@/components/client/search.client';
import JobCard from '@/components/client/card/job.card';
import CompanyCard from '@/components/client/card/company.card';
import Blog from '../blog';

const HomePage = () => {
    return (
        <div>

            {/* <div className="search-content" style={{ width: '100%' }} >
                <SearchClient />
            </div> */}
            <div className={`${styles["container"]} ${styles["home-section"]}`}>

                <div className="search-content" style={{ marginTop: 20 }}>
                    <SearchClient />
                </div>
                <Divider />
                <CompanyCard />
                <div style={{ margin: 50 }}></div>
                <Divider />
                <div>
                    <JobCard />
                </div>

                <Blog />
            </div>
        </div >
    )
}

export default HomePage;