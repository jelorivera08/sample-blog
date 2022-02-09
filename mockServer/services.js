import db from './db';

export const getBlogs = () => {
  return Object.values(db);
};

export const saveBlog = (blog) => {
  const blogFromDb = db[blog.id];

  if (blogFromDb) {
    db[blog.id] = blog;
  } else {
    db[blog.id] = blog;
  }
};

export const getBlog = (id) => {
  return db[id];
};
