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

  // Estilos personalizados para Paper y botones
  const paperSx = {
    p: 4,
    borderRadius: 5,
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(6px)',
    border: '1px solid #ececec',
    minWidth: 340,
    transition: 'box-shadow 0.3s',
    '&:hover': {
      boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.30)',
    },
  };

  const buttonSx = {
    background: 'linear-gradient(90deg, #ff8c00 0%, #a4508b 100%)',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: 3,
    px: 4,
    py: 1.5,
    boxShadow: '0 2px 8px rgba(164,80,139,0.10)',
    transition: 'background 0.3s, transform 0.2s',
    '&:hover': {
      background: 'linear-gradient(90deg, #a4508b 0%, #ff8c00 100%)',
      transform: 'scale(1.04)',
    },
  };

  const radioSx = {
    '& .MuiRadio-root': {
      color: '#a4508b',
      background: '#fff',
      borderRadius: '50%',
      transition: 'color 0.2s, background 0.2s',
    },
    '& .Mui-checked': {
      color: '#ff8c00',
    },
    '& .MuiFormControlLabel-root:hover .MuiRadio-root': {
      color: '#ff8c00',
      backgroundColor: 'rgba(255,140,0,0.10)',
      borderRadius: '50%',
    },
  };

  // Fondo degradado y centrado
  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #232526 0%, #5f0a87 100%)',
        overflow: 'auto',
      }}
    >
      {showResults ? (
        <Paper elevation={6} sx={paperSx}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#a4508b', letterSpacing: 1 }}>
            Tus Preferencias
          </Typography>
          {questions.map((question, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#ff8c00' }}>
                {question.question}
              </Typography>
              <Typography variant="body1" sx={{ ml: 2, color: '#232526', fontWeight: 500 }}>
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
            sx={{ ...buttonSx, mt: 2, width: '100%' }}
          >
            Realizar Test Nuevamente
          </Button>
        </Paper>
      ) : (
        <Paper elevation={6} sx={paperSx}>
          <Typography variant="h5" gutterBottom align="center" sx={{ color: '#a4508b', fontWeight: 'bold', letterSpacing: 1 }}>
            Pregunta {currentQuestion + 1} de {questions.length}
          </Typography>
          <Typography variant="h6" gutterBottom align="center" sx={{ color: '#ff8c00', fontWeight: 600 }}>
            {questions[currentQuestion].question}
          </Typography>
          <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
            <RadioGroup
              value={answers[currentQuestion]}
              onChange={(e) => handleAnswerChange(e.target.value)}
              sx={radioSx}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  sx={{
                    mx: 0,
                    my: 0.5,
                    px: 2,
                    borderRadius: 2,
                    background: '#fff',
                    fontWeight: 500,
                    transition: 'background 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      background: 'rgba(255,140,0,0.08)',
                      boxShadow: '0 2px 8px rgba(255,140,0,0.10)',
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              sx={buttonSx}
            >
              {currentQuestion === questions.length - 1 ? 'Ver Resultados' : 'Siguiente Pregunta'}
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
