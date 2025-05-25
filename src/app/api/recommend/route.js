import { NextResponse } from 'next/server';

const BASE = 'https://api.themoviedb.org/3/discover/movie';
const KEY  = '9603fc65791bb54b81984dae53c3cc0f';            

/*  Diccionarios de apoyo  */

const moodGenres = {             // Q-0  "¿Cómo te sientes hoy…?"
  'Quiero reírme':               '35',          // Comedy
  'Quiero llorar':               '18',          // Drama
  'Busco suspenso':              '53',          // Thriller
  'Algo ligero y relajante':     '10751',       // Family
  'Necesito motivación':         '99',          // Documentary
  'Algo romántico':              '10749',       // Romance
};

const explicitGenre = {          // Q-1  "¿Qué género prefieres?"
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
  // "No tengo preferencia" ⇒ nada

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
    // Inglés, "cualquier idioma", etc. → sin filtro
  }

  /* Géneros finales */
  if (g.size) p.with_genres = Array.from(g).join(',');

  return p;
}


export async function POST(req) {
  const answers = await req.json();     
  let paramsList = [];

  // 1. Búsqueda normal
  const baseParams = {
    api_key: KEY,
    sort_by: 'popularity.desc',
    vote_count_gte: 1500,
    include_adult: false,
    ...mapAnswers(answers),
  };
  paramsList.push({ ...baseParams });

  // 2. Fallback 1: quitar duración
  const fallback1 = { ...baseParams };
  delete fallback1['with_runtime.lte'];
  delete fallback1['with_runtime.gte'];
  paramsList.push(fallback1);

  // 3. Fallback 2: quitar país/origen
  const fallback2 = { ...fallback1 };
  delete fallback2['with_origin_country'];
  delete fallback2['with_original_language'];
  paramsList.push(fallback2);

  // 4. Fallback 3: solo populares
  paramsList.push({
    api_key: KEY,
    sort_by: 'popularity.desc',
    vote_count_gte: 1500,
    include_adult: false,
  });

  let data = null;
  let fallbackLevel = 0;
  for (let i = 0; i < paramsList.length; i++) {
    const params = new URLSearchParams(paramsList[i]);
    const res  = await fetch(`${BASE}?${params}`, { cache: 'no-store' });
    data = await res.json();
    if (data.results && data.results.length > 0) {
      fallbackLevel = i;
      break;
    }
  }

  // Devuelve resultados y el nivel de fallback usado
  return NextResponse.json({
    results: (data.results || []).slice(0, 12),
    fallbackLevel,
  });
}
