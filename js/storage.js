const STYLES_JSON_URL = 'data/styles.json'

//get style from json
export const getStyles = async () => {
  try {
    const response = await fetch(STYLES_JSON_URL);
    if (!response.ok) {
      throw new Error(`Field json: ${response.status}`)
    }

    const saveStyles = await response.json();

    if (saveStyles) return saveStyles;
    throw new Error('Incorrect data format in localStorage');
  }
  catch (error) { console.error('Error loading style',error)}
}