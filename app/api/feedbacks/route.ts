import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";

interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export async function GET() {
  try {
    const snapshot = await db
      .collection("feedbacks")
      .orderBy("timestamp", "desc")
      .get();
    const feedbacks = snapshot.docs.map((doc) => doc.data() as Feedback);

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedbacks" },
      { status: 500 }
    );
  }
}

// POST request: Submit new feedback
export async function POST(req: Request) {
  try {
    const { name, message }: { name: string; message: string } =
      await req.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    const newFeedback: Feedback = {
      id: Date.now().toString(), // Ensure it's a string,
      name,
      email: "",
      message,
      timestamp: new Date().toISOString(),
    };
    
    await db.collection("feedbacks").doc(newFeedback.id).set(newFeedback);
    
    return NextResponse.json({
      message: "Feedback submitted successfully!",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
