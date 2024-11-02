import 'styles/footer.scss';
<head>

</head>
const Footer = () => {
    return (
        <div className='footer-main'>
            <div className='row'>
                <div className='footer-content'>
                    <div className='logo-company'>
                        <img src='/src/img/logo.png' />
                        <ul className='social-icon'>
                            <li><a href="#home"><i className="fa-brands fa-google"></i></a></li>
                            <li><a href="#home"><i className="fa-brands fa-linkedin-in"></i></a></li>
                            <li><a href="#home"><i className="fa-brands fa-github"></i></a></li>
                        </ul>
                    </div>
                    <div className='col'>
                        <h4>Về Jobfinding</h4>
                        <ul className='list-style'>
                            <li>Trang chủ</li>
                            <li>Dịch vụ gợi ý ứng viên</li>
                            <li>Liên hệ</li>
                            <li>Việc làm IT</li>
                            <li>Câu hỏi thường gặp</li>
                        </ul>
                    </div>
                    <div className='col'>
                        <h4>Chương trình</h4>
                        <ul className='list-style'>
                            <li>Cuộc thi viết</li>
                            <li>Việc làm IT nổi bật</li>
                        </ul>
                    </div>
                    <div className='col'>
                        <h4>Liên hệ để đăng tin tuyển dụng tại:</h4>
                        <ul className='list-style'>
                            <li><i className="fa-solid fa-phone"></i>Hồ Chí Minh: (+84) 123 456 789</li>
                            <li><i className="fa-regular fa-envelope"></i>Email: jobfinding@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr />

            <div className='row-1'>
                <p>Copyright © jobfinding</p>
            </div>
        </div>
    )
}

export default Footer;