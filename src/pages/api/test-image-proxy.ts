import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Test a known S3 image URL
    const testImageUrl = '/api/images/products/product-1764271262287-0-pexels-falling4utah-1080721.jpg';
    
    console.log('[test-image-proxy] Testing proxy URL:', testImageUrl);
    
    // Try to fetch the image through the proxy
    const response = await fetch(`http://localhost:3000${testImageUrl}`);
    
    console.log('[test-image-proxy] Proxy response status:', response.status);
    console.log('[test-image-proxy] Proxy response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const imageBuffer = await response.arrayBuffer();
      console.log('[test-image-proxy] Image size:', imageBuffer.byteLength, 'bytes');
      
      res.status(200).json({
        success: true,
        imageUrl: testImageUrl,
        status: response.status,
        imageSize: imageBuffer.byteLength,
        contentType: response.headers.get('content-type'),
      });
    } else {
      const errorText = await response.text();
      console.error('[test-image-proxy] Proxy error response:', errorText);
      
      res.status(500).json({
        success: false,
        imageUrl: testImageUrl,
        status: response.status,
        error: errorText,
      });
    }
  } catch (error) {
    console.error('[test-image-proxy] Error:', error);
    res.status(500).json({ 
      error: "Test failed", 
      details: error instanceof Error ? error.message : String(error) 
    });
  }
}
