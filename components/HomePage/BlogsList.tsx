import React from 'react';
import { ContentfulBlog } from '../../libs/interfaces';

import Blog from "./Blog";
import classes from "./BlogsList.module.css";

type sys = {
  id: string,
  firstPublishedAt: Date
}
type Blog = {
  title: string,
  author: string,
  sys: sys
};

type BlogListProps = {
  blogs: ContentfulBlog[] | undefined;
};

function BlogsList({ blogs }: BlogListProps) {
  return (
    <ul className={classes.list}>
      {blogs!.map((blog) => (
        <Blog
          key={blog.sys.id}
          id={blog.sys.id}
          title={blog.title}
          author={blog.author}
          datePublished={blog.sys.firstPublishedAt}
        />
      ))}
    </ul>
  );
}

export default BlogsList;
