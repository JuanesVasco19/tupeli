import { NextResponse } from 'next/server';

const BASE = 'https://api.themoviedb.org/3/discover/movie';
const KEY  = '9603fc65791bb54b81984dae53c3cc0f';            

/*  Diccionarios de apoyo  */

const moodGenres = {             // Q-0  “¿Cómo te sientes hoy…?”
  'Quiero reírme':               '35',          // Comedy
  'Quiero llorar':               '18',          // Drama
  'Busco suspenso':              '53',          // Thriller
  'Algo ligero y relajante':     '10751',       // Family
  'Necesito motivación':         '99',          // Documentary
  'Algo romántico':              '10749',       // Romance
};

const explicitGenre = {          // Q-1  “¿Qué género prefieres?”
  'Comedia':          '35',
  'Drama':            '18',
  'Acción':           '28',
  'Ciencia Ficción':  '878',
  'Romance':          '10749',
  'Documental':       '99',
};

/* Opciones Q-3 (con quién) */
const groupExtraGenres = {
  'En familia': '10751',         // Family
  'Con niños': '16,10751',       // Animation + Family
};

/*  Función principal }*/

function mapAnswers(a) {
  const p   = {};
  const g   = new Set();                       // recoger géneros sin duplicados

  /* Q-0  mood  */
  if (moodGenres[a[0]]) {
    moodGenres[a[0]].split(',').forEach(id => g.add(id));
  }

  /* Q-1  género explícito  */
  if (explicitGenre[a[1]]) {
    g.add(explicitGenre[a[1]]);
  }

  /* Q-2  duración */
  switch (a[2]) {
    case 'Menos de 1.5 horas':  p['with_runtime.lte'] = 90;             break;
    case 'Entre 1.5 y 2 horas': p['with_runtime.gte'] = 90;
                                p['with_runtime.lte'] = 120;            break;
    case 'Más de 2 horas':      p['with_runtime.gte'] = 120;            break;
  }

  /* Q-3  con quién  */
  if (groupExtraGenres[a[3]]) {
    groupExtraGenres[a[3]].split(',').forEach(id => g.add(id));
  }

  /* Q-4  época */
  if (a[4] === 'Clásicas') {
    p['primary_release_date.lte'] = '1980-12-31';
  } else if (a[4] === 'Contemporáneas') {
    p['primary_release_date.gte'] = '1981-01-01';
    p['primary_release_date.lte'] = '2019-12-31';
  } else if (a[4] === 'De los últimos 5 años') {
    p['primary_release_date.gte'] = '2020-01-01';
  }
  // “No tengo preferencia” ⇒ nada

  /* Q-5  idioma / región  */
  switch (a[5]) {
    case 'Español':
    case 'Solo en español':
      p.with_original_language = 'es'; break;
    case 'Cine europeo':
      p.with_origin_country = 'FR|DE|IT|ES|GB'; break;
    case 'Cine asiático':
      p.with_origin_country = 'JP|KR|CN|IN'; break;
    case 'Cine latinoamericano':
      p.with_origin_country = 'MX|AR|BR|CL|CO'; break;
    // Inglés, “cualquier idioma”, etc. → sin filtro
  }

  /* Géneros finales */
  if (g.size) p.with_genres = Array.from(g).join(',');

  return p;
}


export async function POST(req) {
  const answers = await req.json();     
  const params  = new URLSearchParams({
    api_key: KEY,
    sort_by: 'vote_average.desc',
    vote_count_gte: 200,
    ...mapAnswers(answers),
  });

  const res  = await fetch(`${BASE}?${params}`, { cache: 'no-store' });
  const data = await res.json();
  return NextResponse.json(data.results.slice(0, 12));
}
