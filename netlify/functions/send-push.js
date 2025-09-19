// send-push.js (Netlify Function example)
exports.handler = async function(event, context) {
  // Allow requests from any origin (for testing)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  // Handle preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers
    };
  }

  try {
    const subscription = JSON.parse(event.body);

    // TODO: send push using web-push
    // webpush.sendNotification(subscription, "Test message");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Push sent!" }),
      headers
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
      headers
    };
  }
};


