import React from "react";
import { useQuery } from "@tanstack/react-query";
import { postsQueryOptions } from "../../api/queries/postQueryOptions";
import { commentsQueryOptions } from "../../api/queries/commentQueryOptions";
import "./homePage.scss";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation("homePage");

  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery(postsQueryOptions);
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useQuery(commentsQueryOptions);

  return (
    <div className="home">
      <h1 className="home__title">{t("dashboardTitle")}</h1>
      <div className="home__grid">
        <div className="home__card">
          <h2 className="home__card-title">{t("recentPosts")}</h2>
          {postsLoading && <p>{t("loadingPosts")}</p>}
          {postsError && <p className="home__error">{t("errorPosts")}</p>}
          {posts && (
            <ul className="home__list">
              {posts.slice(0, 5).map((post: any) => (
                <li key={post.id} className="home__list-item">
                  {post.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="home__card">
          <h2 className="home__card-title">{t("recentComments")}</h2>
          {commentsLoading && <p>{t("loadingComments")}</p>}
          {commentsError && <p className="home__error">{t("errorComments")}</p>}
          {comments && (
            <ul className="home__list">
              {comments.slice(0, 5).map((comment: any) => (
                <li key={comment.id} className="home__list-item">
                  {comment.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
