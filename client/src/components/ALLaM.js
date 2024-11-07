// ALLaM.js
const generateText = async (input) => {
  const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          input,
          model_id: 'sdaia/allam-1-13b-instruct',
      }),
  });

  if (!response.ok) {
      throw new Error('Error generating text');
  }

  return await response.json();
};

export default generateText;
