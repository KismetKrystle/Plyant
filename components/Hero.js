import Link from 'next/link';

const Hero = () => (
  <section>
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Incentivize Your Farm
        </h1>

        <p className="mt-4 sm:text-xl sm:leading-relaxed">
          Lorem ipsum dolor sit amet. In dolores reprehenderit est vitae dolorem
          et voluptatem quibusdam. Quo adipisci et voluptate harum ut ducimus
          aspernatur qui officia distinctio.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="block w-full rounded bg-green-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto">
            <Link href="https://perawallet.app/">
              <a target="_blank">Create a Pera Wallet</a>
            </Link>
          </button>

          <button className="block w-full rounded px-12 py-3 text-sm font-medium text-green-600 shadow hover:text-green-700 focus:outline-none focus:ring active:text-green-500 sm:w-auto">
            <Link href="/">Learn More</Link>
          </button>
        </div>
      </div>
    </div>
  </section>
);

export { Hero };
