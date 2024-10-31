import { Bounty } from './types';

export const API_BASE_URL = 'http://localhost:3000/api';

export async function fetchBounties(): Promise<Bounty[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/bounties`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch bounties');
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching bounties:', error);
        throw error;
    }
}

export async function fetchBountyDetails(id: string) {
  try {
    const response = await fetch(`/api/bounties/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch bounty details');
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bounty details:', error);
    throw error;
  }
}