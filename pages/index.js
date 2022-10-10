import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Plyant</title>
        <meta
          name="description"
          content="A dApp to help small-scale farmers in developing countries document and transfer land rights"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}></main>
    </div>
  );
}
