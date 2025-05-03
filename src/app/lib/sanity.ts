// lib/sanity.ts
import { createClient } from 'next-sanity';

// Create a Sanity client instance to interact with your Sanity project
const client = createClient({
  projectId: 'wqbb3t57', // Replace with your Sanity project ID
  dataset: 'production', // Use your Sanity dataset name (usually 'production')
  apiVersion: '2025-05-01', // Use the latest API version
  useCdn: true, // Set to true for faster reads from the CDN
});

export default client;
