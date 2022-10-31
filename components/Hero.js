import Link from 'next/link';

export default function Hero() {
  return (
    <section className="mb-40">
      <div className="px-6 py-13 md:px-12 text-gray-800 text-center lg:text-left">
        <div className="container mx-auto xl:px-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="mt-12 lg:mt-0">
              <h1 className="text-4xl md:text-6xl xl:text-5xl font-bold tracking-tight mb-5">
                Incentivize your <br />
                <span className="text-green-700">vertical farm</span>
              </h1>
              <p className="mb-5">
                You’ve made it to the future! It’s like stock, but better. A
                directory of NFTs for farm businesses and the crops they grow.
              </p>
              <p className="mb-10">
                Invest in NFTs that deposit direct support to the farms that
                feed our communities, support the healing of our planet, and
                nurture the nutritious produce that keeps all of us thriving!
              </p>
              <button
                className="inline-block px-7 py-3 mr-2 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out mb-2"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                role="button"
              >
                <Link href="https://perawallet.app/">
                  <a target="_blank">Create wallet</a>
                </Link>
              </button>
              <button
                className="inline-block px-7 py-3 bg-transparent text-green-600 font-medium text-sm leading-snug uppercase rounded hover:text-green-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out border border-green-600"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                role="button"
              >
                <Link href="/about">Learn More</Link>
              </button>
            </div>
            <div className="mb-12 lg:mb-0">
              <img
                src="/assets/vegetables.svg"
                className="w-full rounded-lg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
