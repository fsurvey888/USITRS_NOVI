import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'public', 'news-data.json');

export async function GET() {
  try {
    const data = await readFile(DATA_FILE, 'utf-8');
    const newsItems = JSON.parse(data);
    return Response.json(newsItems);
  } catch (error) {
    return Response.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const newItem = await request.json();
    
    // Read existing news
    let newsItems = [];
    try {
      const data = await readFile(DATA_FILE, 'utf-8');
      newsItems = JSON.parse(data);
    } catch {
      newsItems = [];
    }

    // Add new item at beginning
    const itemWithId = {
      ...newItem,
      id: Date.now(),
    };
    
    newsItems.unshift(itemWithId);
    
    // Save to file
    await writeFile(DATA_FILE, JSON.stringify(newsItems, null, 2));
    
    return Response.json({ success: true, item: itemWithId });
  } catch (error) {
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}
