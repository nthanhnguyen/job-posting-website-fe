import SearchClient from '@/components/client/search.client';
import { Col, Divider, Row } from 'antd';
import styles from 'styles/client.module.scss';
import JobCard from '@/components/client/card/job.card';
import SubscriberJobCard from '@/components/client/card/job-subscriber.card';

const ClientSubscriberJobPage = (props: any) => { 

    return (
        <div className={styles["container"]} style={{ marginTop: 20 }}>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <SearchClient/>
                </Col>
                <Divider />

                <Col span={24}>
                    <SubscriberJobCard
                        showPagination={true}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default ClientSubscriberJobPage;