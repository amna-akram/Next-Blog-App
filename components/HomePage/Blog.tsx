import React from 'react';
import { NextRouter, useRouter } from "next/router";
import moment from "moment";

import classes from "./Blog.module.css";
import Card from "../../ui/Card/Card";

interface BlogProps {
  title: string,
  author: string,
  datePublished: Date,
  id: string,
}
function Blog({ title, author, datePublished, id }: BlogProps) {
  const router: NextRouter = useRouter();
  function showDetailHandler() {
    router.push("/" + id);
  }
  return (
    <li className={classes.blog} onClick={showDetailHandler}>
      <Card>
        <div className={classes.content}>
          <h3> {title} </h3>
          <p className={classes.author}> {author} </p>
          <p className={classes.ago}> {moment(datePublished).fromNow()} </p>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default Blog;
