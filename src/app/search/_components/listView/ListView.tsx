import { GitHubUser } from "@/lib/services/types";
import { UserAccordion } from "../userAccordion/UserAccordion";
import styles from "./ListView.module.scss";

export const ListView = ({ users }: { users: GitHubUser[] }) => {
  return (
    <>
      <p className={styles.title}>
        Showing top {users.length} result{users.length > 1 ? "s" : ""}:
      </p>
      {users.map((user) => (
        <UserAccordion key={user.id} user={user} />
      ))}
    </>
  );
};
