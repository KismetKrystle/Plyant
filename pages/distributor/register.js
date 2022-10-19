import Layout from '../../components/Layout';

export default function Register() {
  return (
    <Layout>
      <div className="flex flex-col max-w-5xl px-2 mx-auto space-y-4">
        <div className="flex flex-col my-6 space-y-3 p-8">
          <div className="mx-auto max-w-xl">
            <h1 className="text-2xl font-extrabold sm:text-4xl text-center">
              Register Account
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
