// netlify/functions/send-push.js
import webpush from 'web-push';

// Set VAPID keys from environment variables
webpush.setVapidDetails(
  'mailto:you@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export async function handler(event) {
  try {
    const subscription = JSON.parse(event.body);

    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Hello!",
        body: "This is a test push from Netlify 🚀",
        icon: "/apple-touch-icon.png"
      })
    );

    return { statusCode: 200, body: "Push sent!" };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}
