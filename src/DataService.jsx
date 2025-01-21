const fetchData = async (filePath) => {
  try {
    const response = await fetch(`/${filePath}`) // Add `/` before filePath if necessary

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching local JSON:', error)
    throw error
  }
}

export default fetchData
