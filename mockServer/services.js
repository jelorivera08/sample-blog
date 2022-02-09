import dayjs from 'dayjs';
import db from './db';

export const getBlogs = () => {
  return Object.values(db);
};

export const saveBlog = (blog) => {
  const blogFromDb = db[blog.id];

  if (blogFromDb) {
    db[blog.id] = blog;
  } else {
    db[blog.id] = { ...blog, dateCreated: dayjs().format('MMM DD, YYYY') };
  }
};

export const getBlog = (id) => {
  return db[id];
};

export const deleteBlog = (id) => {
  delete db[id];
  return Object.values(db);
};

export const getBlogsWithFilter = (searchQueryString) => {
  const blogs = Object.values(db);
  const filteredBlogs = blogs.filter((blog) => {
    const hasMatchInTitle = blog.title
      .toLowerCase()
      .includes(searchQueryString.toLowerCase());
    const hasMatchInDescription = blog.description
      .toLowerCase()
      .includes(searchQueryString.toLowerCase());
    const hasMatchInBody = blog.body
      .toLowerCase()
      .includes(searchQueryString.toLowerCase());

    return hasMatchInTitle || hasMatchInDescription || hasMatchInBody;
  });

  return filteredBlogs;
};
