import { callGetNumberOfApprovedResumesForHr, callGetNumberOfJobsForHr, callGetNumberOfResumesForHr } from "@/config/api";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';

const DashboardForHrPage = () => {

    const [isJobFetching, setIsJobFetching] = useState<boolean>(false);
    const [numberJobs, setNumberJobs] = useState<number>(0);

    const [isResumeFetching, setIsResumeFetching] = useState<boolean>(false);
    const [numberResumes, setNumberResumes] = useState<number>(0);

    const [isApprovedResumeFetching, setIsApprovedResumeFetching] = useState<boolean>(false);
    const [numberApprovedResumes, setNumberApprovedResumes] = useState<number>(0);

    const formatter = (value: number | string) => {
        return (
            <CountUp end={Number(value)} separator="," />
        );
    };

    useEffect(() => {
        const init = async () => {
            setIsJobFetching(true);
            const res = await callGetNumberOfJobsForHr();
            if (res && res.data) {
                setNumberJobs(res.data.totalItems);
            }
            setIsJobFetching(false);
        }
        init();
    }, [])

    useEffect(() => {
        const init = async () => {
            setIsResumeFetching(true);
            const res = await callGetNumberOfResumesForHr();
            if (res && res.data) {
                setNumberResumes(res.data.totalItems);
            }
            setIsResumeFetching(false);
        }
        init();
    }, [])

    useEffect(() => {
        const init = async () => {
            setIsApprovedResumeFetching(true);
            const res = await callGetNumberOfApprovedResumesForHr();
            if (res && res.data) {
                setNumberApprovedResumes(res.data.totalItems);
            }
            setIsApprovedResumeFetching(false);
        }
        init();
    }, [])

    return (
        <Row gutter={[20, 20]}>
            <Col span={24} md={8}>
                <Card title={<span style={{ fontSize: '20px' }}>Jobs</span>}
                    bordered={false}
                    loading={isJobFetching}
                    headStyle={{
                        backgroundColor: '#009552',
                    }}
                    bodyStyle={{
                        backgroundImage: `url('/src/img/jobcard.png')`,
                        height: '160px'
                    }}
                >
                    <Statistic
                        title={<span style={{ fontSize: '20px' }}>Total Jobs</span>}
                        value={numberJobs}
                        formatter={formatter}
                        valueStyle={{ fontSize: '60px', fontWeight: 'bold', fontFamily: 'monospace', color: '#fff' }}
                    />
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title={<span style={{ fontSize: '20px' }}>Resumes</span>}
                    bordered={false}
                    loading={isResumeFetching}
                    headStyle={{
                        backgroundColor: '#08A9DE',
                    }}
                    bodyStyle={{
                        backgroundImage: `url('/src/img/resumecard.png')`,
                        height: '160px'
                    }}
                >
                    <Statistic
                        title={<span style={{ fontSize: '20px' }}>Total resumes</span>}
                        value={numberResumes}
                        formatter={formatter}
                        valueStyle={{ fontSize: '60px', fontWeight: 'bold', fontFamily: 'monospace', color: '#fff' }}
                    />
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title={<span style={{ fontSize: '20px' }}>Approved Resumes</span>}
                    bordered={false}
                    loading={isApprovedResumeFetching}
                    headStyle={{
                        backgroundColor: '#CD0EA1',
                    }}
                    bodyStyle={{
                        backgroundImage: `url('/src/img/approvecv.png')`,
                        height: '160px'
                    }}
                >
                    <Statistic
                        title={<span style={{ fontSize: '20px' }}>Total Resumes</span>}
                        value={numberApprovedResumes}
                        formatter={formatter}
                        valueStyle={{ fontSize: '60px', fontWeight: 'bold', fontFamily: 'monospace', color: '#fff' }}
                    />
                </Card>
            </Col>

        </Row>
    )
}

export default DashboardForHrPage;