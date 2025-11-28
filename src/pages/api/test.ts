import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[test] Test endpoint called');
  
  try {
    res.status(200).json({
      message: "Test endpoint working",
      timestamp: new Date().toISOString(),
      method: req.method
    });
  } catch (error) {
    console.error('[test] Error:', error);
    res.status(500).json({ error: "Test endpoint failed" });
  }
}
