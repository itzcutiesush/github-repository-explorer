import { Button } from "@/ui/button/Button";
import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Github Repository Explorer</h1>
        <Button variant="primary" fullWidth>
          <Link href="/search" className={styles.link}>
            Let&apos;s Go!
          </Link>
        </Button>
      </main>
    </div>
  );
}
