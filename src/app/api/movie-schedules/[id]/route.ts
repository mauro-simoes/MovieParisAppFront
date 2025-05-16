import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/movie-schedules/${params.id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie schedules');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching movie schedules:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie schedules' },
      { status: 500 }
    );
  }
} 