import { callActivateAccount } from '@/config/api';
import { IAccount } from '@/types/backend';
import { Button, Divider, message, notification } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from 'styles/auth.module.scss';
import { setUserLoginInfo } from '@/redux/slice/accountSlide';

const ActivatePage = () => {
  const [credential, setCredential] = useState<IAccount | undefined>(undefined);
  const params = useParams();
  const [error, setError] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  let params_ = new URLSearchParams(location.search);
  const callback = params_?.get("callback");

  useEffect(() => {
    (async function activation() {
      try {
        const res = await callActivateAccount(String(params.token));
        if (res?.data) {
          setCredential(res?.data);
          setError(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onClickLogin = useCallback(() => {
    navigate('/login')
  }, [error, credential]);

  return (
    <div className={styles["register-page"]}
      style={{
        backgroundImage: `url(${"/src/img/bg.jpg"})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.wrapper}>
            <div className={styles.heading}>
              <h2 className={`${styles.text} ${styles[""]}`}
                style={{ textAlign: 'center', fontSize: '20px', fontWeight: 500 }}> Kích hoạt tài khoản </h2>
              <Divider />
            </div>
            {error ?
              <div>
                Kích hoạt không thành công. Vui lòng kiểm tra rằng bạn đang sử dụng liên kết kích hoạt hợp lệ!
              </div>
              :
              <div>
                Tài khoản của bạn đã được kích hoạt thành công, vui lòng nhấn nút đăng nhập bên dưới để truy cập vào JobHub bạn nhé!
              </div>
            }
            {!error &&
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmit}
                onClick={onClickLogin}
                style={{
                  width: '50%',
                  fontWeight: '500',
                }}
              >
                Đăng nhập
              </Button>
            </div>
            }
          </section>
        </div>
      </main>
    </div>
  );
}

export default ActivatePage;
