const webpush = require("web-push");

exports.handler = async function(event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers };
  }

  try {
    const subscription = JSON.parse(event.body);

    // Only private key from Netlify needed here
    webpush.setVapidDetails(
      "mailto:you@example.com",
      null, // public key not required in backend
      process.env.VAPID_PRIVATE_KEY
    );

    // Optional: small delay for testing
    await new Promise(resolve => setTimeout(resolve, 5000));

    await webpush.sendNotification(subscription, JSON.stringify({
      title: "Hello!",
      body: "This is a test push message",
      icon: "https://heilotiastudio.github.io/MarkusPWA/apple-touch-icon.png"
    }));

    return { statusCode: 200, body: JSON.stringify({ message: "Push sent!" }), headers };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }), headers };
  }
};





