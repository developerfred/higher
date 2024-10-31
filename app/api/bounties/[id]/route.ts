import { NextResponse } from 'next/server';

const BOUNTYCASTER_API = 'https://www.bountycaster.xyz/api/v1';
const CACHE_TIME = 60; // Cache time in seconds


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(
      `${BOUNTYCASTER_API}/bounty/${params.id}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch bounty: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch bounty details',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { 
      status: 500 
    });
  }
}