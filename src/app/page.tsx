import ProjectDetail from "./containers/ProjectDetail";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <ProjectDetail />
            </main>
        </div>
    );
}
