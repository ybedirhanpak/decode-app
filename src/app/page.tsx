import styles from "./page.module.css";
import CodePreview from "./components/CodePreview";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <code>Preview your code:</code>
                <CodePreview />
            </main>
        </div>
    );
}
