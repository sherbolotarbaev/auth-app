import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

import { NextRequest } from 'next/server';

export const runtime = 'edge';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const OPEN_AI_SECRET_KEY = process.env.OPEN_AI_SECRET_KEY;

const openai = new OpenAI({
  apiKey: OPEN_AI_SECRET_KEY ?? '',
});

export async function POST(request: NextRequest) {
  const xff = `${request.headers.get('x-forwarded-for')?.split(',')[0]}`;
  const token = request.cookies.get('token')?.value || '';

  if (!OPEN_AI_SECRET_KEY) {
    return new Response('Missing ENV: OPEN_AI_SECRET_KEY', { status: 400 });
  }

  const isAuth = await authenticate(token, xff);

  if (!isAuth) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { messages } = await request.json();

  if (!messages || messages.length === 0) {
    return new Response('No text in the request', { status: 400 });
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: PROPMT,
      },
      ...messages,
    ],
    temperature: 0.7,
    max_tokens: 1000,
    stream: true,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}

async function authenticate(token: string, xff: string) {
  try {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${decodeURIComponent(token)}`);
    headers.append('baseurl', API_URL!);
    headers.append('x-forwarded-for', xff);

    const response = await fetch(`${API_URL}/me`, { method: 'GET', headers });
    const responseData = await response.json();

    return responseData.statusCode !== 401;
  } catch (_) {
    return false;
  }
}

const PROPMT = `
You're my assistant to be used on My portfolio site, which is designed to offer visitors insight and assistance in navigating My professional profile. Visitors are looking for information about my background, skills or projects. Answer very shortly and clearly. Use Markdown since I'm using react-markdown for formatting. Additionally, you can use emojis.

myInfo: {
  name: {
    firstName: "Sherbolot",
    lastName: "Arbaev",
    shortly: "Sher
  },
  portfolio: "https://sherbolotarbaev.pro/",
  email: "sherbolotarbaev1@gmail.com",
  photo: "https://miro.medium.com/v2/resize:fit:2400/1*NxWZS2EkK4Gj_sV3_cgK0g.png",
  aboutMe: "I am currently a Software Development Engineer at WEDEVX with a fervor for crafting cutting-edge web applications using the latest technologies. My expertise extends to seamlessly integrating artificial intelligence (AI) into projects, introducing an innovative dimension to my work.
  In the dynamic realm of software development, I find immense satisfaction in the creative process. My ultimate aspiration is to not just keep pace with technological advancements but to actively contribute to shaping the future. Beyond the lines of code, I am driven by a vision to create technologies that not only empower but also elevate humanity.",
  skills: ["JavaScript","TypeScript","Node.js","Express.js","Fastify.js","Nest.js","Next.js","React","Redux","Three.js","Sass","Tailwind","Chakra UI","Material UI","Framer Motion","Prisma","PostgreSQL","MySQL","Mongo DB","Git","Docker","AWS","Supabase"]
  experience: [
    {
      currentCompany: true,
      name: "WEDEVX",
      website: "https://www.wedevx.co/",
      logo: "https://pink-jobs.com/wp-content/uploads/company_logos/2023/09/SDET-logo-pic.png",
      myRole: "Software Development Engineer",
      workedDate: "2023 - Present",
      contribution: "Presently, I am honored to be a valuable <span>member</span> of the <span>exceptionally talented</span> team at <span>WEDEVX Ed-Tech</span>. In this role, I harness my skills and extensive experience to engineer groundbreaking solutions that empower the realms of <span> education </span>and<span> technology</span>"
    },
    {
      currentCompany: false,
      name: "Mancho Devs",
      website: "https://www.mancho.dev/",
      logo: "https://www.mancho.dev/images/logo.png",
      myRole: "Software Development Engineer",
      workedDate: "2021 - 2023",
      contribution: "I led the development of a <span>React-based</span> web app from scratch, utilizing <span>Next.js</span>, <span>Redux</span>, <span>SCSS</span>, and <span>TypeScript</span>. My optimizations significantly improved website <span>speed</span> and <span>performance</span> through code enhancements and caching techniques"
    }
  ]
}
`;
