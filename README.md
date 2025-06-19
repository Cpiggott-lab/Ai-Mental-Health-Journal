# AI Mental Health Journal 🧠✨

An AI-powered journaling app built with **Next.js**, **TypeScript**, **Prisma**, and **OpenAI API** that helps users log their thoughts, receive mood analysis, positive affirmations, and actionable suggestions to improve their mental well-being.

## 🌟 Features

- ✍️ Create and manage daily journal entries
- 🧠 AI-generated mood summaries using OpenAI API
- 💡 Receive personalized affirmations and activity suggestions
- 🔐 Secure and private with local PostgreSQL database via Docker
- ⚡ Built with modern tools: Next.js (App Router), Tailwind CSS, Prisma ORM

## 🛠 Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Node.js API routes, Prisma ORM, OpenAI API
- **Database:** PostgreSQL (Dockerized)
- **Dev Tools:** Docker, VSCode, Postman

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/ai-mental-health-journal.git
cd ai-mental-health-journal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file based on the example:

```env
DATABASE_URL="postgresql://postgres:prisma@localhost:5432/postgres?schema=public"
OPENAI_API_KEY=your_openai_api_key
```

### 4. Start PostgreSQL with Docker

```bash
docker compose -f docker-compose.postgres.yml up -d
```

### 5. Initialize Prisma & Migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 6. Run the App

```bash
npm run dev
```

---

## 📁 Project Structure

```
/prisma              # Prisma schema & migrations
/lib                 # Shared libraries (e.g., prisma client, OpenAI API)
/pages/api           # Backend API routes
/src                 # Main application source
```

---

## 🤖 AI Functionality

- Uses OpenAI’s GPT-4 to analyze journal entries
- Generates mood summaries, affirmations, and suggested activities
- Future plans: streak tracking, sentiment graphs, user authentication

---

## 📌 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with ❤️ by Christopher Piggott
- Powered by OpenAI, Prisma, and the Next.js ecosystem
