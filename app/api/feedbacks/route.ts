import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Define the data file path
const dataFilePath = path.join(process.cwd(), "data", "feedback.json")

// Read feedback data from file
function readFeedbackData() {
  try {
    // Check if the file exists
    if (!fs.existsSync(dataFilePath)) {
      return []
    }

    const data = fs.readFileSync(dataFilePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading feedback data:", error)
    return []
  }
}

export async function GET() {
  try {
    // Read feedback data
    const feedbackData = readFeedbackData()

    // Sort by timestamp in descending order (newest first)
    feedbackData.sort((a: any, b: any) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })

    return NextResponse.json(feedbackData)
  } catch (error) {
    console.error("Error retrieving feedback data:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

