
export const askAssistant = async ({ question }) => {
  const BACKEND_URL = "http://localhost:5000/api/chat";

  if (!question) {
    return { success: false, error: "Question is required." };
  }

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Server returned an error status.");
    }

    return {
      success: true,
      answer: data.answer,
    };
  } catch (error) {
    console.error("Error connecting to Express Backend:", error);
    return {
      success: false,
      error: "Could not connect to the backend assistant service.",
      details: error.message,
    };
  }
};
