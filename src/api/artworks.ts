import type { ArtworksApiResponse } from "../types/artwork";

const BASE_URL = "https://api.artic.edu/api/v1/artworks";

export async function fetchArtworks(
    page: number,
    limit = 12,
): Promise<ArtworksApiResponse> {
    const url = `${BASE_URL}?page=${page}&limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch artworks");
    }

    return response.json();
}
