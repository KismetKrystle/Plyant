import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="flex flex-col max-w-5xl px-2 mx-auto space-y-4">
        <div className="flex flex-col my-6 space-y-3 p-8">
          <div className="mx-auto max-w-xl">
            <h1 className="text-2xl font-extrabold sm:text-4xl text-center">
              About Plyant
            </h1>
            <div className="mt-4 md:mt-6 sm:text-xl sm:leading-relaxed">
              <p className="mt-4 md:mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ipsum consequat nisl vel pretium lectus quam. Eget aliquet nibh
                praesent tristique magna sit amet purus gravida.
              </p>
              <p className="mt-4 md:mb-6">
                Sed risus ultricies tristique nulla aliquet enim. Arcu vitae
                elementum curabitur vitae nunc sed velit dignissim. Auctor elit
                sed vulputate mi sit. Ut ornare lectus sit amet est placerat in
                egestas erat. Gravida dictum fusce ut placerat. Bibendum neque
                egestas congue quisque egestas. Consectetur lorem donec massa
                sapien faucibus et.
              </p>
              <p className="mt-4 md:mb-6">
                Dapibus ultrices in iaculis nunc. Platea dictumst vestibulum
                rhoncus est. Libero volutpat sed cras ornare arcu dui vivamus.
                Volutpat maecenas volutpat blandit aliquam. Velit egestas dui id
                ornare arcu odio ut. Et magnis dis parturient montes nascetur
                ridiculus mus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
