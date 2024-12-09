import { Button, Col, Form, Row, Select } from 'antd';
import { EnvironmentOutlined, MonitorOutlined } from '@ant-design/icons';
import { LOCATION_LIST, SKILLS_LIST } from '@/config/utils';
import { ProForm } from '@ant-design/pro-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Skills from '@/pages/resume-builder/resume/components/forms/Skills';
import { isMobile } from 'react-device-detect';

interface IProps {
    //
}

const SearchClient = (props: IProps) => {
    const optionsSkills = SKILLS_LIST;
    const optionsLocations = LOCATION_LIST;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 575);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth <= 575);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onFinish = async (values: any) => {
        const { skills, location } = values;
        const query = new URLSearchParams();
        if (skills && skills.length > 0) {
            query.append('skills', skills.join(','));

        }
        if (location && location.length > 0) {
            query.append('location', location.join(','));
        }

        navigate(`/job?${query.toString()}`);
    }


    return (
        <ProForm
            form={form}
            onFinish={onFinish}
            submitter={
                {
                    render: () => <></>
                }
            }
        >

            <Row
                gutter={[isMobileView ? 10 : 20, 10]}
                style={{
                    flexDirection: isMobileView ? 'column' : 'row',
                }}
            >

                <Col xs={24} sm={12} md={16}>
                    <ProForm.Item
                        name="skills"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            showArrow={false}
                            //style={{ width: '100%' }}
                            size='large'
                            placeholder={
                                <>
                                    <MonitorOutlined /> Tìm theo kỹ năng...
                                </>
                            }
                            optionLabelProp="label"
                            options={optionsSkills}
                        />
                    </ProForm.Item>
                </Col>
                <Col span={12} xs={24} sm={12} md={4}>
                    <ProForm.Item name="location">
                        <Select
                            mode="multiple"
                            allowClear
                            size='large'
                            showArrow={false}
                            style={{ width: '100%' }}
                            placeholder={
                                <>
                                    <EnvironmentOutlined /> Địa điểm...
                                </>
                            }
                            optionLabelProp="label"
                            options={optionsLocations}
                        />
                    </ProForm.Item>
                </Col>
                <Col span={12} xs={24} sm={24} md={4}>
                    <button
                        onClick={() => form.submit()}
                        style={{
                            padding: isMobileView ? '10px' : '6px',
                            width: '100%',
                            borderRadius: '18px',
                            border: 'none',
                            backgroundColor: '#9DD1FC',
                            fontSize: '17px',
                            cursor: 'pointer',

                        }}
                    >Search</button>
                </Col>
            </Row>
        </ProForm>
    )
}
export default SearchClient;