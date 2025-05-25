import { NextResponse } from 'next/server';

const KEY = '9603fc65791bb54b81984dae53c3cc0f';
const BASE = 'https://api.themoviedb.org/3/trending/movie/week';

export async function GET() {
  const params = new URLSearchParams({
    api_key: KEY,
    language: 'es-ES',
  });
  const res = await fetch(`${BASE}?${params}`, { cache: 'no-store' });
  const data = await res.json();
  return NextResponse.json((data.results || []).slice(0, 12));
} 