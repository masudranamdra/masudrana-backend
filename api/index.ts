import dotenv from 'dotenv';
import dns from 'dns';

// Load env variables
dotenv.config();

// Fix DNS resolution issues on Windows/Vercel environments
dns.setServers(['8.8.8.8', '1.1.1.1']);

import app from '../src/app';
import { connectDB } from '../src/config/db';

export default async (req: any, res: any) => {
  // Ensure DB connection is established for serverless function
  await connectDB();
  return app(req, res);
};
