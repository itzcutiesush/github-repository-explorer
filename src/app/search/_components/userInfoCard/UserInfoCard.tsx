import Image from "next/image";
import { GitHubUser } from "@/lib/services/types";
import styles from "./UserInfoCard.module.scss";

type UserInfoCardProps = {
  user: GitHubUser;
  isExpanded: boolean;
  onClick: () => void;
};

export const UserInfoCard = ({
  user,
  isExpanded,
  onClick,
}: UserInfoCardProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardInfo}>
        <Image
          src={user.avatar_url}
          alt={user.login}
          width={40}
          height={40}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <h2 className={styles.title}>
            <a
              href={user.html_url}
              target="_blank"
              className={styles.username}
              onClick={(e) => e.stopPropagation()}
            >
              {user.name || user.login}
            </a>
          </h2>
        </div>
      </div>
      <div className={styles.expandIcon}>
        <span
          className={`${styles.arrow} ${
            isExpanded ? styles.arrowUp : styles.arrowDown
          }`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
