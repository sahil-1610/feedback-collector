import { NextResponse } from "next/server";
import { db, checkFirestoreConnection } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    // Check Firestore connection first
    await checkFirestoreConnection();

    const feedback = await request.json();

    // Ensure feedback.id is a valid non-empty string; generate one if missing
    if (
      !feedback.id ||
      typeof feedback.id !== "string" ||
      feedback.id.trim() === ""
    ) {
      feedback.id = Date.now().toString();
    }

    // Add retry logic for Firestore operation
    let retries = 3;
    while (retries > 0) {
      try {
        await db.collection("feedbacks").doc(feedback.id).set(feedback);
        break;
      } catch (error: any) {
        if (error.code === 7 && retries > 1) {
          // Wait for 2 seconds before retrying
          await new Promise((resolve) => setTimeout(resolve, 2000));
          retries--;
          continue;
        }
        throw error;
      }
    }

    return NextResponse.json(
      { message: "Feedback submitted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error submitting feedback:", error);

    const errorMessage =
      error.code === 7
        ? "Firestore service is not enabled. Please contact support."
        : "Failed to submit feedback. Please try again later.";

    return NextResponse.json(
      { error: errorMessage },
      { status: error.code === 7 ? 503 : 500 }
    );
  }
}
