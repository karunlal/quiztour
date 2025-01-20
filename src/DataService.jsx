const fetchData = async (url) => {
  try {
    const response = await fetch(url)
    const text = await response.text() // Read the response as text
    console.log('Response text:', text) // Log the raw response

    // Check if the response is HTML (i.e., not JSON)
    if (text.startsWith('<!DOCTYPE html>')) {
      throw new Error('Received HTML response, not JSON')
    }

    return JSON.parse(text) // Parse JSON only if the response is valid JSON
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export default fetchData
