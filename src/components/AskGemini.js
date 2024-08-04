import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';

const AskGemini = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ask-gemini`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnswer(data.answer);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to get response from Gemini');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to get response from Gemini');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Ask Gemini
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Ask a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
      {error && <Alert severity="error" style={{ marginTop: '20px' }}>{error}</Alert>}
      {answer && (
        <Box mt={4}>
          <Typography variant="h6">Answer:</Typography>
          <TextField
            value={answer}
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default AskGemini;

