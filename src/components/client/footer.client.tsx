import 'styles/footer.scss';
import { useNavigate } from 'react-router-dom';


const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className='footer-main'>
            <div className='row' style={{ height: '' }}>
                <div className='footer-content' style={{ marginRight: '110px' }}>
                    <div className='logo-company'>
                        <img src='/src/img/logo.png' />
                        <ul className='social-icon'>
                            <li><a href="https://www.youtube.com/@ucAnhNguyenVo"><i className="fa-brands fa-youtube"></i></a></li>
                            <li><a href="https://www.linkedin.com/in/ducanhnv312/"><i className="fa-brands fa-linkedin-in"></i></a></li>
                            <li><a href="https://www.facebook.com/profile.php?id=61570670880437"><i className="fa-brands fa-facebook"></i></a></li>
                        </ul>
                    </div>
                    <div className='col'>
                        <h4>Về Jobhub</h4>
                        <ul className='list-style'>
                            <a href='/'><li>Trang chủ</li></a>
                            <a href='/company'><li>Các nhà tuyển dụng</li></a>
                            <a href='/job'><li>Việc làm IT</li></a>
                            <a href='/blog'><li>Các bài blog</li></a>
                        </ul>
                    </div>
                    <div className='col'>
                        <h4>Chương trình</h4>
                        <ul className='list-style'>
                            <a href='/blog/detail/chuyenit/8jBGZjPowaZGsXj'><li>Cuộc thi viết</li></a>
                            <a href='/subscriber-job'><li>Việc làm IT nổi bật</li></a>
                        </ul>
                    </div>
                    <div className='col'>
                        <h4>Liên hệ để đăng tin tuyển dụng tại:</h4>
                        <ul className='list-style'>
                            <li><i className="fa-solid fa-phone"></i>Hồ Chí Minh: (+84) 123 456 789</li>
                            <li><i className="fa-regular fa-envelope"></i>Email: jobhub@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr />

            <div className='row-1'>
                <p>Copyright © jobhub</p>
            </div>
        </div>
    )
}

export default Footer;