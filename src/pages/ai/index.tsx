import { RightCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

const AiResume = () => {
    return (
        <div className="container-resume" style={{
            marginTop: '45px',
            backgroundImage: `url("/src/img/aibg.png")`,
            height: '300px',
            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            padding: '20px 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px', fontFamily: '"Roboto", sans-serif' }}>
                <div className="text-1" >
                    <h1>Create your CV with AI : The Ultimate Online<br /> CV Maker</h1>
                </div>
                <div className="text-2">
                    <p>Your AI-powered CV Maker for Crafting Job-Winning Resumes</p>
                </div>
                <div className="btn-cv">
                    <Button type="primary" shape="round" size="large" style={{ backgroundColor: '#8B5CF6' }}>Build CV <RightCircleOutlined /></Button>
                </div>
            </div>
        </div>
    )
}

export default AiResume;