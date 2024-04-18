export default async function fetchData({
  endpoint,
  param,
}: {
  endpoint: string;
  param: string;
}) {
  try {
    const url = `https://quizapi.io/api/v1/${endpoint}?apiKey=${
      import.meta.env.VITE_API_KEY
    }&limit=10&${param}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
