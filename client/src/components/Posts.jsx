import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const Posts = ({ _id, title, summary, cover, createdAt, author }) => {
  return (
    <div className="post max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-8 flex flex-col md:flex-row">
      <div className="image md:w-full h-64 md:h-auto overflow-hidden">
        <Link to={`/post/${_id}`}>
          <div className="w-full h-full">
            <img
              src={cover}
              alt="Post Cover"
              className="w-full transition-transform duration-300 ease-in-out transform hover:scale-105 h-full object-cover object-center"
            />
          </div>
        </Link>
      </div>
      <div className="p-6 flex-1">
        <Link to={`/post/${_id}`}>
          <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
            {title}
          </h2>
        </Link>
        <p className="info text-sm text-gray-500 mt-2">
          <span className="author font-semibold text-gray-700">{author.username}</span>
          <span className="ml-4">{formatISO9075(new Date(createdAt))}</span>
        </p>
        <p className="summary text-gray-700 mt-4 text-base leading-relaxed">
          {summary}
        </p>
        <Link
          to={`/post/${_id}`}
          className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default Posts;
