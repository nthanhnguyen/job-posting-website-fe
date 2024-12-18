import { callGetNumberOfCompanies, callGetNumberOfUsers } from "@/config/api";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';

const DashboardPage = () => {
    const [isUserFetching, setIsUserFetching] = useState<boolean>(false);
    const [numberUsers, setNumberUsers] = useState<number>(0);

    const [isCompanyFetching, setIsCompanyFetching] = useState<boolean>(false);
    const [numberCompanies, setNumberCompanies] = useState<number>(0);

    const formatter = (value: number | string) => {
        return (
            <CountUp end={Number(value)} separator="," />
        );
    };

    useEffect(() => {
        const init = async () => {
            setIsUserFetching(true);
            const res = await callGetNumberOfUsers();
            if (res && res.data) {
                setNumberUsers(res.data.totalItems);
            }
            setIsUserFetching(false);
        }
        init();
    }, [])

    useEffect(() => {
        const init = async () => {
            setIsCompanyFetching(true);
            const res = await callGetNumberOfCompanies();
            if (res && res.data) {
                setNumberCompanies(res.data.totalItems);
            }
            setIsCompanyFetching(false);
        }
        init();
    }, [])

    return (
        <Row gutter={[20, 20]}>
            <Col span={24} md={8} >
                <Card title="Users"
                    bordered={false}
                    loading={isUserFetching}
                    headStyle={{
                        backgroundColor: '#C54333',
                    }}
                    bodyStyle={{
                        backgroundImage: `url('/src/img/usercard.png')`,
                        height: '160px'
                    }}
                >
                    <Statistic
                        title={<span style={{ fontSize: '20px' }}>Total accounts</span>}
                        value={numberUsers}
                        formatter={formatter}
                        valueStyle={{ fontSize: '60px', fontWeight: 'bold', fontFamily: 'monospace', color: '#fff' }}
                    />
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Resumes"
                    bordered={false}
                    loading={isCompanyFetching}
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
                        value={numberCompanies}
                        formatter={formatter}
                        valueStyle={{ fontSize: '60px', fontWeight: 'bold', fontFamily: 'monospace', color: '#fff' }}
                    />
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Companies"
                    bordered={false}
                    headStyle={{
                        backgroundColor: '#DA8C0E',
                    }}
                    bodyStyle={{
                        backgroundImage: `url('/src/img/cpcard.png')`,
                        height: '160px'
                    }}
                >
                    <Statistic
                        title={<span style={{ fontSize: '20px' }}>Total Companies</span>}
                        value={100}
                        formatter={formatter}
                        valueStyle={{ fontSize: '60px', fontWeight: 'bold', fontFamily: 'monospace', color: '#fff' }}
                    />
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Jobs"
                    bordered={false}
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
                        value={100}
                        formatter={formatter}
                        valueStyle={{ fontSize: '60px', fontWeight: 'bold', fontFamily: 'monospace', color: '#fff' }}
                    />
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Approve Resume"
                    bordered={false}
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
                        value={100}
                        formatter={formatter}
                        valueStyle={{ fontSize: '60px', fontWeight: 'bold', fontFamily: 'monospace', color: '#fff' }}
                    />
                </Card>
            </Col>

        </Row>
    )
}

export default DashboardPage;