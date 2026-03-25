export function getApiKey(): string {
    const key = import.meta.env.VITE_RAWG_API_KEY;
    if (!key) {
      throw new Error(
        'Missing VITE_RAWG_API_KEY. Add it to your .env file. Get a key at https://rawg.io/apidocs'
      );
    }
    return key;
  }