import { gql } from "@apollo/client";

export default gql`
query getAllBlogs{
    blogCollection {
      blogs: items {
        id
        title
        author
        description
        sys {
          id
          firstPublishedAt
        }
      }
    }
  }
`;
