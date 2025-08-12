// netlify/functions/formHandler.js
exports.handler = async (event) => {
  try {
    // Parse JSON sent from frontend
    const data = JSON.parse(event.body);

    console.log("Received data:", data);

    // Example: you can add logic here to email, save to DB, etc.
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        message: "Data received successfully",
        received: data
      })
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "error",
        message: err.message
      })
    };
  }
};
