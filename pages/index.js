import Head from 'next/head';
import { Hero } from '../components/Hero';
import { Navbar } from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Plyant</title>
        <meta
          name="description"
          content="A dApp to help small-scale farmers in developing countries document and transfer land rights"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
    </div>
  );
}
