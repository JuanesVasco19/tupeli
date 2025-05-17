'use client'
import { useState } from 'react';
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Box, Paper } from '@mui/material';

export default function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(6).fill(''));
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "¿Cómo te sientes hoy o qué estado de ánimo buscas en la película?",
      options: ["Quiero reírme", "Quiero llorar", "Busco suspenso", "Algo ligero y relajante", "Necesito motivación", "Algo romántico"]
    },
    {
      question: "¿Qué género de película prefieres?",
      options: ["Comedia", "Drama", "Acción", "Ciencia Ficción", "Romance", "Documental"]
    },
    {
      question: "¿Cuánto tiempo tienes disponible?",
      options: ["Menos de 1.5 horas", "Entre 1.5 y 2 horas", "Más de 2 horas", "No me importa la duración"]
    },
    {
      question: "¿Con quién vas a ver la película?",
      options: ["Solo/a", "En pareja", "Con amigos", "En familia", "Con niños"]
    },
    {
      question: "¿Prefieres películas...?",
      options: ["Clásicas", "Contemporáneas", "De los últimos 5 años", "No tengo preferencia"]
    },
    {
      question: "¿Tienes alguna preferencia por el país o idioma de la película?",
      options: ["Español", "Inglés con subtítulos", "Cualquier idioma con subtítulos", "Solo en español", "Cine europeo", "Cine asiático","Cine latinoamericano"]
    }
  ];

  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Tus Preferencias
          </Typography>
          {questions.map((question, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {question.question}
              </Typography>
              <Typography variant="body1" sx={{ ml: 2 }}>
                {answers[index]}
              </Typography>
            </Box>
          ))}
          <Button 
            variant="contained" 
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers(Array(6).fill(''));
              setShowResults(false);
            }}
            sx={{ mt: 2 }}
          >
            Realizar Test Nuevamente
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Pregunta {currentQuestion + 1} de {questions.length}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {questions[currentQuestion].question}
        </Typography>
        
        <FormControl component="fieldset">
          <RadioGroup
            value={answers[currentQuestion]}
            onChange={(e) => handleAnswerChange(e.target.value)}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
          >
            {currentQuestion === questions.length - 1 ? 'Ver Resultados' : 'Siguiente Pregunta'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
