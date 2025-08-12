// netlify/functions/formHandler.js

const headers = {
  "Access-Control-Allow-Origin": "*", // Allow all origins (change if needed)
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

exports.handler = async (event) => {
  // Handle CORS preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "OK"
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ status: "error", message: "Method Not Allowed" })
    };
  }

  try {
    // Parse JSON sent from frontend
    const data = JSON.parse(event.body);

    console.log("Received data:", data);

    // ---- Add email sending / DB save logic here ----
    // For now, just return success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "ok",
        message: "Data received successfully",
        received: data
      })
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: "error",
        message: err.message
      })
    };
  }
};
