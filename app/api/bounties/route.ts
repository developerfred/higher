import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const BOUNTYCASTER_API = 'https://www.bountycaster.xyz/api/v1';
const CACHE_TIME = 60; // Cache time in seconds

export async function GET(request: Request) {
  try {
    const headersList = headers();
    const cache = headersList.get('x-cache') !== 'no-cache';

    // Add cache control headers
    const response = await fetch(`${BOUNTYCASTER_API}/bounties/open`, {
      next: { revalidate: cache ? CACHE_TIME : 0 },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Bountycaster API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Filter Aether bounties
    const aetherBounties = data.bounties.filter(
      (bounty: any) => bounty.poster.short_name === "@aethernet"
    );

    return NextResponse.json({
      success: true,
      data: aetherBounties,
      timestamp: new Date().toISOString(),
      cached: cache,
    }, {
      headers: {
        'Cache-Control': cache ? `max-age=${CACHE_TIME}` : 'no-cache',
      },
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch bounties',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  }
}
