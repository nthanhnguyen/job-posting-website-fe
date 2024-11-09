import { Divider } from 'antd';

import styles from 'styles/auth.module.scss';

const SendMailPage = () => {

  return (
    <div className={styles["register-page"]}>
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

export default SendMailPage;
