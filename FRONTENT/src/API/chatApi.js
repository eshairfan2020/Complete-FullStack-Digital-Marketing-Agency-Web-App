import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

export const getAIResponse = async (question) => {
  try {
    const res = await axios.post(API_URL, {
      question,
    });

    return res.data.answer;
  } catch (err) {
    console.log(err);
    return "Server Error";
  }
};
