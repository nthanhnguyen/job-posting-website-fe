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
            <Col span={24} md={8}>
                <Card title="Users" bordered={false} loading={isUserFetching}>
                    <Statistic
                        title="Total accounts"
                        value={numberUsers}
                        formatter={formatter}
                    />

                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Resumes" bordered={false} loading={isCompanyFetching}>
                    <Statistic
                        title="Total resumes"
                        value={numberCompanies}
                        formatter={formatter}
                    />
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Card title" bordered={false} >
                    <Statistic
                        title="Active Users"
                        value={112893}
                        formatter={formatter}
                    />
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Card title" bordered={false} >
                    <Statistic
                        title="Active Users"
                        value={112893}
                        formatter={formatter}
                    />
                </Card>
            </Col>
            <Col span={24} md={8}>
                <Card title="Card title" bordered={false} >
                    <Statistic
                        title="Active Users"
                        value={112893}
                        formatter={formatter}
                    />
                </Card>
            </Col>

        </Row>
    )
}

export default DashboardPage;