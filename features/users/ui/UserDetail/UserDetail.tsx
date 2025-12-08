import Image from "next/image";
import Link from "next/link";

import { getUniqueId } from "@/features/shared/lib/utils";
import { UserDetailProps } from "@/types";

import { Button, Typography } from "@shared/ui";
import { IconLink } from "@tabler/icons-react";

import { genericBlurData } from "../../lib/constants";
import FavoritesWidget from "../FavoritesWidget/FavoritesWidget";
import styles from "./UserDetail.module.scss";

const {
  detail,
  detailInfoSection,
  detailHeader,
  detailHeaderTitle,
  detailHeaderWidget,
  detailHeaderImage,
  detailInfo,
  detailStats,
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
          <Typography
            weight="bold"
            size="lg"
            as="h2"
            className={detailHeaderTitle}
            truncate
          >
            {user.login}
          </Typography>
          <Image
            src={user.avatarUrl}
            alt={user.login}
            width={300}
            height={300}
            priority
            sizes="(max-width: 48rem) 25rem, 18.75rem"
            placeholder="blur"
            blurDataURL={genericBlurData}
            className={detailHeaderImage}
          />
          <div className={detailHeaderWidget}>
            <FavoritesWidget id={user.id} user={user} />
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
              Public Repos: {user.publicRepos}
            </Typography>
          </div>
          <Typography as="p" size="md">
            Bio: {user.bio || "No bio available"}
          </Typography>
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
                <Button
                  as={Link}
                  href={repo.htmlUrl}
                  variant="unstyled"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography as="span" size="md" variant="default">
                    {repo.name}
                  </Typography>
                </Button>
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
