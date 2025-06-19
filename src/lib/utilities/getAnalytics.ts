/**
 * Fetches R2 analytics data from the server.
 * @param headers Optional headers to include in the request.
 * @returns The R2 analytics data.
 */
export const getR2Analytics = async (headers?: HeadersInit) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/r2`, {
      headers: headers || {},
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching R2 analytics data:', error);
    throw error;
  }
};
