import { getUniqueId } from "@/features/shared/lib/utils";
import { Anchor, Typography } from "@/features/shared/ui";
import { UserDetailProps } from "@/types";
import { IconLink } from "@tabler/icons-react";
import Image from "next/image";
import FavsWidget from "../FavsWidget/FavsWidget";
import styles from "./UserDetail.module.scss";

const {
  detail,
  detailInfoSection,
  detailHeader,
  detailInfo,
  detailStats,
  detailBio,
  detailRepos,
  detailReposList,
  detailReposItem,
  detailReposItemIcon,
} = styles;

const UserDetail = ({ user, repos }: UserDetailProps) => {
  // TODO Fix UI

  return (
    <article className={detail}>
      <div className={detailInfoSection}>
        <header className={detailHeader}>
          <Typography weight="bold" size="lg" as="h2">
            {user.login}
          </Typography>
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={300}
            height={300}
          />
          <div>
            <FavsWidget id={user.id} />
          </div>
        </header>
        <div className={detailInfo}>
          <Typography as="h3" size="md" weight="bold">
            User Details
          </Typography>
          <div className={detailStats}>
            <Typography as="p" size="md">
              Followers: {user.followers}
            </Typography>
            <Typography as="p" size="md">
              Following: {user.following}
            </Typography>
            <Typography as="p" size="md">
              Public Repos: {user.public_repos}
            </Typography>
          </div>
          <div className={detailBio}>
            <Typography as="p" size="md">
              Bio: {user.bio || "No bio available"}
            </Typography>
          </div>
        </div>
      </div>
      <div className={detailRepos}>
        <Typography as="h3" size="md" weight="bold">
          Repositories
        </Typography>
        {repos.length > 0 ? (
          <ul className={detailReposList}>
            {repos.map((repo) => (
              <li key={getUniqueId()} className={detailReposItem}>
                <IconLink className={detailReposItemIcon} />
                <Anchor
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </Anchor>
              </li>
            ))}
          </ul>
        ) : (
          <Typography as="p" size="md">
            No repositories found.
          </Typography>
        )}
      </div>
    </article>
  );
};

export default UserDetail;
