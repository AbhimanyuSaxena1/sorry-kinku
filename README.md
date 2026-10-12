# 💞 Sorry Website - A Heartfelt Apology Site

This is a special website made to say sorry in a sweet and creative way.  
You can customize it with your own letter, photos, and even add a background song to make it more personal.

---

## ✨ What You Can Customize

- Your own apology letter text  
- Add photos to make it special  
- Add a background song to set the mood  
- **Instant Email Notifications**: Get notified in real-time when buttons are clicked!

---

## 🔔 Email Notification System Setup

Get alerted via email whenever your recipient opens the site or clicks any button (e.g., opens the letter, sends a hug, or opens the gift).

1. Create a free account at [resend.com](https://resend.com).
2. Go to **API Keys** and create an API key.
3. In the project root, create a file named `.env.local` (copy from [`.env.example`](file:///c:/Users/abhis/OneDrive/Desktop/sorry-site-main/.env.example)):
   ```env
   RESEND_API_KEY=re_your_api_key_here
   NOTIFICATION_EMAIL=your_email@gmail.com
   ```
4. Run `npm run dev` and click any button — you'll receive a beautifully formatted email notification with the action, time, and page!

> **Note:** When using Resend's free tier, notifications are sent to the email address registered with your Resend account.

## 🛠️ Tech Stack

- Next.js  
- Tailwind CSS  
- Framer Motion (for smooth animations)  

---

## 👋 About Me

Hey! I'm **Abhi**, a web developer and student who loves building unique websites like this to help people express feelings online.


---

## 📩 Want a Custom Version?

If you want a **live, personalized version** with your own names, messages, photos, or song, just DM me on Instagram or reach out on any social platform above!

---

Thank you for checking out this project! If you like it, please ⭐ star the repo and share it with your friends.

---

_Made with 💖 by Abhi..
