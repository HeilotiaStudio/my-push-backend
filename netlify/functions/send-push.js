const webpush = require("web-push");

exports.handler = async function(event) {
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

    if (!process.env.VAPID_PRIVATE_KEY) {
      throw new Error("VAPID_PRIVATE_KEY not set in Netlify environment");
    }

    webpush.setVapidDetails(
      "mailto:you@example.com",
      null,
      process.env.VAPID_PRIVATE_KEY
    );

    await webpush.sendNotification(subscription, JSON.stringify({
      title: "Hello!",
      body: "This is a test push message",
      icon: "https://heilotiastudio.github.io/MarkusPWA/apple-touch-icon.png"
    }));

    return { statusCode: 200, body: JSON.stringify({ message: "Push sent!" }), headers };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }), headers };
  }
};







