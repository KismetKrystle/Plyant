import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="flex flex-col max-w-5xl px-2 mx-auto space-y-4">
        <div className="flex flex-col my-6 space-y-3 p-8">
          <div className="mx-auto max-w-xl">
            <h1 className="font-semibold text-xl text-center">About Plyant</h1>
            <div className="mt-6 md:mt-6">
              <p className="mt-4 md:mb-6">
                We are a dApp that helps incentivize community-based farming for
                Vertical and CEA farmers.
              </p>
              <p className="mt-4 md:mb-6">
                We have been in development since 2022.
              </p>
              <p className="mt-4 md:mb-6">
                We strive to connect the farmers of our future with investors
                and consumers on one interface.
              </p>
              <p className="mt-4 md:mb-6">
                We believe technology and nature are quintessential to our
                future. For centuries farmers have been the anchor of our
                communities, fueling our bodies as we strive to manifest our
                dreams. It is now time for the community to be more than
                consumers. It is time we invest. There are many methods of
                farming that could render a quick profit while leaving long-term
                damage to our environment. Instead every day many farmers are
                choosing to sacrifice their profitability for sustainable
                methods in efforts to help heal the world and provide more
                nutritious produce for all of us.
              </p>
              <p className="mt-4 md:mb-6">
                Here you will find an NFT directory of vertical farms and the
                produce they grow. Eventually, through this dApp, you can invest
                in an NFT that represents a specific farm. This investment will
                help fund ongoing business success, such as equipment
                improvements, staff upgrades, and community outreach projects.
                You can also purchase crops, directly from farmers or their
                associated distributors as an NFT. This crop NFT will give you
                information that provides full transparency about the history of
                crop production, including growing methods, date of harvest, and
                location of harvest ensuring you are as local as possible,
                saving unnecessary carbon emissions.
              </p>
              <p className="mt-4 md:mb-6">
                As we continue to develop the dApp, we will offer more ways to
                incentivize the farmers and to tokenize community participation.
                As the value of this exchange and the farming businesses within
                the network increase, so will the value of the token, opening
                the door to possibilities beyond the environment of the
                platform.
              </p>
              <p className="mt-4 md:mb-6">
                Join the Plyant team in taking care of the hands that feed us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
