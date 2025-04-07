import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define TypeScript interfaces
interface Feedback {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

// Use /tmp directory for writable access in serverless environments
const dataFilePath = "/tmp/feedback.json";

// Read feedback data from file
function readFeedbackData(): Feedback[] {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }

    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data) as Feedback[];
  } catch (error) {
    console.error("Error reading feedback data:", error);
    return [];
  }
}

// Write feedback data to file
function writeFeedbackData(data: Feedback[]): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing feedback data:", error);
  }
}

// GET request: Fetch all feedback
export async function GET() {
  try {
    const feedbackData = readFeedbackData();

    // Sort feedback by timestamp (newest first)
    feedbackData.sort(
      (a: Feedback, b: Feedback) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json(feedbackData);
  } catch (error) {
    console.error("Error retrieving feedback data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
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

    const feedbackData = readFeedbackData();
    const newFeedback: Feedback = {
      id: Date.now(),
      name,
      message,
      timestamp: new Date().toISOString(),
    };

    feedbackData.push(newFeedback);
    writeFeedbackData(feedbackData);

    return NextResponse.json({
      message: "Feedback submitted successfully!",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
