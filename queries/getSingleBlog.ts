import { gql } from "@apollo/client";

export default gql`
  query getSingleBlog($blogId: String!) {
    blog(id: $blogId) {
      title
      author
      description
      sys {
        id
        firstPublishedAt
        publishedAt
      }
    }
  }
`;
