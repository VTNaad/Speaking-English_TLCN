import React, { useState } from 'react';

const WordPractice = ({ word, onClose }) => {
  const [accuracy, setAccuracy] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [history, setHistory] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const playWord = (word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(
        (voice) => voice.lang === 'en-US' && voice.name.toLowerCase().includes('female')
      );
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Your browser does not support text-to-speech!');
    }
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert('Your browser does not support audio recording!');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        sendAudio(audioBlob);
      };

      mediaRecorder.start();
      setRecorder(mediaRecorder);
      setIsRecording(true);
    } catch (err) {
      alert('Could not start recording. Please check your microphone.');
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setIsRecording(false);
    }
  };

  const sendAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');
    formData.append('word', word);

    fetch(`${apiUrl}/word/practice`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setAccuracy(data.accuracy);
          setHistory((prevHistory) =>
            [...prevHistory, { accuracy: data.accuracy, blob: audioBlob, timestamp: new Date().toISOString() }].sort(
              (a, b) => b.accuracy - a.accuracy
            )
          );
        } else {
          alert('Could not process your speech. Please try again!');
        }
      })
      .catch(() => alert('Error communicating with the server.'));
  };

  const playRecording = (blob) => {
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const handleClose = () => {
    setHistory([]);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f9fafb',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        zIndex: 1000,
        width: '350px',
      }}
    >
      <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Practice: {word}</h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px' }}>
        <button
          onClick={() => playWord(word)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <i className="material-icons" style={{ fontSize: '36px', color: '#2563eb' }}>
            volume_up
          </i>
        </button>

        {isRecording ? (
          <button
            onClick={stopRecording}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <i className="material-icons" style={{ fontSize: '36px', color: '#ef4444' }}>
              stop
            </i>
          </button>
        ) : (
          <button
            onClick={startRecording}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <i className="material-icons" style={{ fontSize: '36px', color: '#10b981' }}>
              mic
            </i>
          </button>
        )}
      </div>

      {accuracy !== null && <p style={{ margin: '10px 0', color: '#2563eb' }}>Accuracy: {accuracy}%</p>}

      <h3 style={{ marginTop: '20px', color: '#4b5563' }}>History</h3>
      <ul style={{ textAlign: 'left', maxHeight: '150px', overflowY: 'auto', margin: '10px 0', padding: 0 }}>
        {history.map((record, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '5px',
              padding: '5px 10px',
              background: '#e5e7eb',
              borderRadius: '8px',
            }}
          >
            <span>
              {record.accuracy}% - {new Date(record.timestamp).toLocaleTimeString()}
            </span>
            <button
              onClick={() => playRecording(record.blob)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <i className="material-icons" style={{ fontSize: '20px', color: '#10b981' }}>
                play_arrow
              </i>
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleClose}
        style={{
          marginTop: '20px',
          backgroundColor: '#ef4444',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          padding: '10px 20px',
          cursor: 'pointer',
        }}
      >
        Close
      </button>
    </div>
  );
};

export default WordPractice;
