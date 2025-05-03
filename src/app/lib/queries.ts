// lib/queries.ts

// GROQ query to fetch all posts
export const postsQuery = `*[_type == "post"]{
  title,
  slug,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  },
  body,
  author->{
    name
  },
  publishedAt
}
`
  