const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();

const db = admin.firestore();

exports.sendNotificationOnNewActivity = functions.firestore
  .document("activity/{docId}") // Listen only to the 'activity' collection
  .onCreate(async (snap, context) => {
    const newActivity = snap.data(); // Get the new document data

    try {
      // Fetch all admin users
      const adminQuerySnapshot = await db
        .collection("users")
        .where("role", "==", "admin")
        .get();

      const tokens = [];
      adminQuerySnapshot.forEach((doc) => {
        const fcmToken = doc.data().fcmToken;
        if (fcmToken) {
          tokens.push(fcmToken);
        }
      });

      if (tokens.length === 0) {
        console.log("No admin tokens found.");
        return;
      }

      // Customize the notification payload with activity details
      const payload = {
        notification: {
          title: "New Activity Added",
          body: `A new activity was created: ${newActivity.name || "Unnamed Activity"}`,
        },
        data: {
          activityId: context.params.docId, // Pass document ID for further actions
          name: newActivity.name || "Unnamed Activity",
          details: newActivity.details || "No Details Provided",
          timestamp: newActivity.timestamp || new Date().toISOString(),
        },
      };

      // Send notifications to all admin tokens
      const response = await admin.messaging().sendToDevice(tokens, payload);
      console.log("Notification sent successfully:", response);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  });
