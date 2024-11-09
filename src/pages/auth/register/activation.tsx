import { callActivate } from '@/config/api';
import { Button, Divider, Form, Input, Row, Select, message, notification, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from 'styles/auth.module.scss';

const ActivatePage = () => {
  const [credential, setCredential] = useState();
  const params = useParams();
  console.log(String(params.token));
  const [error, setError] = useState<boolean>(true);

  useEffect(() => {
    (async function activation() {
      try {
        const res = await callActivate(String(params.token));
        if (res.success) {
          setCredential(res.data);
          setError(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={styles["register-page"]}
      style={{
        backgroundImage: `url(${"/src/img/bg.jpg"})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.wrapper}>
            <div className={styles.heading}>
              <h2 className={`${styles.text} ${styles[""]}`}
                style={{ textAlign: 'center' }}> Đăng Ký Tài Khoản </h2>
              <Divider />
            </div>
            <div>
              One more step! We have sent you the account activation link to your email account
              . Please check your email and click the link to activate your account.
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ActivatePage;
