import { useAppSelector } from "@/redux/hooks";
import { RightCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const AiResume = () => {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.account.user);
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
                    <h1
                        style={{
                            fontSize: '25px',
                            fontWeight: 'bold'
                        }}
                    >Tạo CV của bạn với sự hỗ trợ của AI: Trực tuyến tối ưu<br /> CV Maker</h1>
                </div>
                <div className="text-2">
                    <p>Công cụ tạo CV thông minh của bạn, giúp tạo ra những bản lý lịch ấn tượng để chinh phục công việc mơ ước!</p>
                </div>
                {user._id === '' && 
                    <div className="text-2">
                        <p>Bạn cần Login để tọa CV nhé!</p>
                    </div>
                }
                <div className="btn-cv">
                    <Button
                        type="primary"
                        shape="round"
                        size="large"
                        style={{ backgroundColor: '#8B5CF6', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontWeight: '500' }}
                        onClick={() => navigate('/resume-builder')}

                    >
                        Tạo CV <RightCircleOutlined />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AiResume;