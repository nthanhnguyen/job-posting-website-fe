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
                style={{ textAlign: 'center', fontWeight: 500 }}> Đăng Ký Tài Khoản </h2>
              <Divider />
            </div>
            <div>
              Chỉ còn một bước nữa! Chúng tôi đã gửi liên kết kích hoạt tài khoản đến email của bạn.
              Vui lòng kiểm tra email và nhấp vào liên kết để kích hoạt tài khoản của bạn.
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SendMailPage;
