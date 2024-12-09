import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import skyImage from '../assets/1s.jpg';
import companyImage from '../assets/company.jpg';
import ocean from '../assets/ocean.png';

const LessonScreen = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null); // Moved here outside of any conditional logic
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(`${apiUrl}/course/${courseId}/lessons`);
        const data = await response.json();
        if (data.success) {
          setLessons(data.data); // Assume the API returns a list of lessons
        } else {
          setError('Cannot load lessons list');
        }
      } catch (error) {
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  const handleCardClick = (lessonId) => {
    setActiveLesson(lessonId === activeLesson ? null : lessonId); // Toggle active state
    navigate(`/lesson/${lessonId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const lessonScreenStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
  };

  const introductionStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundImage: `url(${ocean})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '20px',
    color: '#fff',
    fontFamily: '"Poppins", sans-serif',
  };

  const frameStyle = {
    position: 'relative',
    margin: '20px auto',
    padding: '30px 20px 20px 20px',
    backgroundImage: `url(${skyImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '20px 20px 0 0',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
    width: '80%',
    color: '#fff',
  };

  const framePointerStyle = {
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundImage: `url(${skyImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '60px',
    height: '20px',
    backgroundColor: '#fff',
    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
  };

  const lessonListStyle = {
    display: 'flex',
    gap: '100px', // Khoảng cách giữa các bài học
    justifyContent: 'center', // Căn giữa theo chiều ngang
    alignItems: 'center', // Căn giữa theo chiều dọc (nếu cần)
    overflowX: 'auto', // Cuộn ngang khi vượt giới hạn
    padding: '20px',
    scrollBehavior: 'smooth',
  };
  
  const lessonCardStyle = {
    flex: '0 0 auto', // Đảm bảo các thẻ lesson không co giãn
    width: '220px', // Độ rộng cố định
    padding: '20px',
    borderRadius: '15px',
    background: 'linear-gradient(135deg, #FFFF00 0%, #2a5298 100%)', // Gradient ban đầu
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.5s ease',
  };
  
  const lessonCardActiveStyle = {
    background: 'linear-gradient(135deg, #009900 0%, #b91d73 100%)', // Gradient khi chọn
    transform: 'scale(1.05)', // Phóng to nhẹ khi chọn
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Đổ bóng mạnh hơn
  };
  
  const lessonCardTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
  };
  
  const lessonCardDescStyle = {
    fontSize: '16px',
    textAlign: 'center',
    color: '#e0e0e0',
  };

  const companyIntroStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '60px 40px',
    backgroundColor: '#f4f7fa',
    marginTop: '40px',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    borderTop: '3px solid #3b82f6',
    color: '#374151',
    fontFamily: '"Poppins", sans-serif',
    lineHeight: '1.8',
    maxWidth: '1200px',
    margin: '40px auto',
  };

  const textStyle = {
    flex: '1',
    paddingRight: '20px',
    fontSize: '18px',
  };

  const imageStyle = {
    flex: '1',
    maxWidth: '100%',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  };

  const productsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: '0 auto',
    maxWidth: '84.5%',
    padding: '0 30px',
  };

  return (
    <div style={lessonScreenStyle}>
      <Header />
      <div style={introductionStyle}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>
          Welcome to the English Speaking Practice Website
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>
          Explore the lessons and improve your English communication skills!
        </p>
      </div>
      <div style={frameStyle}>
        <div style={framePointerStyle}></div>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Course Overview</h2>
        <p style={{ fontSize: '18px' }}>
          Join us to embark on a journey towards mastering English speaking with structured lessons and practical exercises!
        </p>
      </div>
      <div style={lessonListStyle}>
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            style={{
              ...lessonCardStyle,
              ...(activeLesson === lesson._id ? lessonCardActiveStyle : {}),
            }}
            onClick={() => handleCardClick(lesson._id)}
          >
            <h3 style={lessonCardTitleStyle}>{lesson.title}</h3>
            <p style={lessonCardDescStyle}>{lesson.description}</p>
          </div>
        ))}
      </div>

      <div style={companyIntroStyle}>
        <div style={textStyle}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>About Our Company</h2>
          <p style={{ marginBottom: '15px' }}>
            We are committed to providing top-notch English learning resources to help individuals 
            around the world improve their communication skills.
          </p>
          <p>
            Our team of experienced instructors and developers is dedicated to helping you achieve 
            fluency and confidence in English through our structured lessons and advanced learning tools.
          </p>
        </div>
        <div>
          <img src={companyImage} alt="Our Company" style={imageStyle} />
        </div>
      </div>
    </div>
  );
};

export default LessonScreen;
