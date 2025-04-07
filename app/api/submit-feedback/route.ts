import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Define the data file path
const dataFilePath = path.join(process.cwd(), "data", "feedback.json")

// Ensure the data directory exists
function ensureDirectoryExists() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  // Create empty feedback.json if it doesn't exist
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]), "utf8")
  }
}

// Read feedback data from file
function readFeedbackData() {
  try {
    ensureDirectoryExists()
    const data = fs.readFileSync(dataFilePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading feedback data:", error)
    return []
  }
}

// Write feedback data to file
function writeFeedbackData(data: any[]) {
  try {
    ensureDirectoryExists()
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error writing feedback data:", error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new feedback entry
    const newFeedback = {
      id: uuidv4(),
      name: body.name,
      email: body.email,
      message: body.message,
      timestamp: body.timestamp || new Date().toISOString(),
    }

    // Read existing feedback data
    const feedbackData = readFeedbackData()

    // Add new feedback
    feedbackData.push(newFeedback)

    // Write updated data back to file
    const success = writeFeedbackData(feedbackData)

    if (!success) {
      return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 })
    }

    return NextResponse.json({ success: true, feedback: newFeedback }, { status: 201 })
  } catch (error) {
    console.error("Error handling feedback submission:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

