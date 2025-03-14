import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    console.error('No URL provided');
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  console.log(`Proxying request to: ${url}`);

  try {
    const response = await axios({
      method: 'get',
      url: url,
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
    });
    console.log(`Successful response from ${url}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(`Error proxying request to ${url}:`, error.message);
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
  }
}
