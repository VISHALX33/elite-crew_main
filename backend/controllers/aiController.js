import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ response: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ message: 'Failed to process AI request' });
  }
};
