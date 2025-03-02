import axios, { AxiosResponse } from 'axios';

const generateResponse = async (input: string) => {
    try {
        const dataToSend = {
            'contents': [{
                'parts': [{'text': input}]
            }]
        };
        const response: AxiosResponse = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + (process.env.REACT_APP_GEMINI_API_KEY || ''), dataToSend);
        const responseData: any = response.data;
        return responseData['candidates'][0]['content']['parts'][0]['text'];
    } catch (error) {
        return "Error!!!";
    }
};

export default generateResponse
