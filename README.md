# Gemini AI Integrated Content Generator

## Overview

The **Gemini AI Integrated Content Generator** is a web-based platform that leverages Google's Gemini AI to generate high-quality content efficiently. Users can create articles, blog posts, social media content, and more with AI assistance, making content creation faster and more seamless.

## Features

- **AI-Powered Content Generation**: Utilize Gemini AI to generate creative and informative content.
- **Customizable Output**: Adjust the tone, length, and format of the generated content.
- **SEO Optimization**: Generate content optimized for search engines.
- **Multi-Language Support**: Create content in various languages.
- **User-Friendly Interface**: Simple and intuitive design for easy navigation.
- **Content Editing & Exporting**: Edit generated content before exporting it in different formats.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Service**: Gemini AI API
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle
- **Authentication**: Clerk Auth
- **Hosting**: Vercel

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v20+ recommended)
- PostgreSQL (Neon)
- Google Gemini AI API Key

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/Rahul0070050/ai_content_generator
   cd gemini-ai-content-gen
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_next_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"
   NEXT_PUBLIC_CLERK_SIGN_IN_URL="your_next_clerk_sign_in_url"
   NEXT_PUBLIC_CLERK_SIGN_UP_URL="your_next_clerk_sign_up_url"
   NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY="your_google_gemini_api_key"
   NEXT_PUBLIC_DRIZZLE_DB_URL="your_drizzle_db_url"
   NEXT_PUBLIC_RAZORPAY_WEEKLEY_PLAN="your_razorpay_weekley_plan"
   NEXT_PUBLIC_RAZORPAY_MONTHLEY_PLAN="your_razorpay_monthley_plan"
   NEXT_PUBLIC_RAZORPAY_YEARLEY_PLAN="your_razorpay_yearley_plan"
   NEXT_PUBLIC_KEY_ID="your_key_id"
   NEXT_PUBLIC_KEY_SECRET="your_key_secret"
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Usage

1. Sign up and log in to your account.
2. Enter a topic or keywords to generate content.
3. Customize the output by selecting the desired tone and format.
4. Edit and refine the generated content.
5. Export or copy the content for use.

### Content Generation

- `/dashboard` – Generate AI-powered content
- `/dashboard/history` – Retrieve previously generated content
- `/dashboard/billing` – For subscription

## Contributing

Contributions are welcome! If you'd like to improve the project, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, reach out via:

- Email: your.email@example.com
- GitHub: [yourusername](https://github.com/yourusername)
