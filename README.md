# Feedback Collector

## Project Description

This project is a simple feedback collection application built with Next.js, Tailwind CSS, and Radix UI. It allows users to submit feedback, which is then stored and can be viewed. The application includes a form for submitting feedback and an interface for displaying collected feedback.

## Project Structure

The project structure is organized as follows:

```
feedback-collector/
├── app/
│   ├── api/
│   │   ├── feedbacks/
│   │   │   └── route.ts        # API endpoint for fetching feedbacks
│   │   └── submit-feedback/
│   │       └── route.ts        # API endpoint for submitting feedback
│   └── page.tsx                # Main page component
├── components/
│   └── ui/                     # Reusable UI components (Button, Textarea, etc.)
│   └── theme-provider.tsx      # Theme provider for dark/light mode
├── lib/
│   └── utils.ts                # Utility functions
├── public/                     # Static assets
├── styles/
│   └── globals.css             # Global CSS styles
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
├── package.json                # Project dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── README.md                   # Project documentation
└── tailwind.config.js          # Tailwind CSS configuration
```

Key directories and files:

*   `app/`: Contains the main application logic, including pages and API routes.
*   `components/`: Contains reusable React components.
*   `lib/`: Contains utility functions used throughout the application.
*   `public/`: Contains static assets such as images and fonts.
*   `styles/`: Contains global CSS styles.

## Tech Stack

*   **Next.js:** A React framework for building web applications.
*   **Tailwind CSS:** A utility-first CSS framework for styling the application.
*   **Radix UI:** A set of accessible and unstyled UI components.
*   **TypeScript:** A superset of JavaScript that adds static typing.
*   **Vercel:** Used for deployment

## Deployment Steps (Netlify)

Follow these steps to deploy the Feedback Collector application on Netlify:

1.  **Create a Netlify Account:**
    *   Go to [Netlify](https://www.netlify.com/) and sign up for an account.

2.  **Connect to Your Git Repository:**
    *   In your Netlify dashboard, click "Add new site" and then "Import an existing project".
    *   Connect to your Git repository (e.g., GitHub, GitLab, Bitbucket) where the Feedback Collector project is hosted.

3.  **Configure Build Settings:**
    *   Netlify will automatically detect that it's a Next.js project. If not, configure the build settings as follows:
        *   **Build command:** `npm run build`
        *   **Publish directory:** `.next`

4.  **Set Environment Variables:**
    *   If you have any environment variables (defined in `.env.local`), add them in the Netlify UI under "Site settings" -> "Environment variables".

5.  **Deploy the Site:**
    *   Click the "Deploy site" button. Netlify will build and deploy your application.

6.  **Monitor Deployment:**
    *   You can monitor the deployment progress in the Netlify dashboard. Once the deployment is complete, Netlify will provide a unique URL for your live site.

7.  **Custom Domain (Optional):**
    *   You can set up a custom domain for your Netlify site under "Domain management".

## Additional Notes

*   Ensure all dependencies are installed by running `npm install` locally before deploying.
*   For any issues during deployment, check the Netlify build logs for error messages.
