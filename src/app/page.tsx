import CodePreview from "./components/CodePreview";

import styles from "./page.module.css";

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
