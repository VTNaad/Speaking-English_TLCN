import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import skyImage from '../assets/1s.jpg';
import WordPractice from '../components/WordPractice';

const LessonDetailScreen = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(`${apiUrl}/lesson/${lessonId}/readlesson`);
        const data = await response.json();
        if (data.success) {
          setWords(data.data); // Set the list of words from the API
        } else {
          setError('Cannot load lesson details');
        }
      } catch (error) {
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [lessonId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
  };

  const headerStyle = {
    padding: '20px',
    textAlign: 'center',
    backgroundImage: `url(${skyImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '20px',
    color: '#fff',
    fontFamily: '"Poppins", sans-serif',
    fontSize: '24px',
  };

  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  };

  const wordStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const pronunciationStyle = {
    fontSize: '18px',
    color: '#3b82f6',
    marginBottom: '10px',
  };

  const meaningStyle = {
    fontSize: '16px',
    color: '#6b7280',
  };

  return (
    <div style={containerStyle}>
      <Header />
      <div style={headerStyle}>
        <h1>Lesson Words</h1>
        <p>Practice and learn the words from this lesson.</p>
        <button
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#1D4ED8',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
          onClick={() => navigate(-1)}
        >
          Back to Lessons
        </button>
      </div>
      <div style={cardContainerStyle}>
        {words.map(([word, pronunciation, meaning], index) => (
          <div
            key={index}
            style={cardStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={() => setSelectedWord(word)}
          >
            <div style={wordStyle}>{word}</div>
            <div style={pronunciationStyle}>{pronunciation}</div>
            <div style={meaningStyle}>{meaning}</div>
          </div>
        ))}
      </div>
      {selectedWord && (
        <WordPractice word={selectedWord} onClose={() => setSelectedWord(null)} />
      )}
    </div>
  );
};

export default LessonDetailScreen;
