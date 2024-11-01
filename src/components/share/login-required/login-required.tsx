import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginRequired = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you have to login to access this page."
      extra={<Button type="primary"
        onClick={() => navigate('/')}
      >Back Home</Button>}
    />
  )
};

export default LoginRequired;