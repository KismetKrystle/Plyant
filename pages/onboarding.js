import { useEffect } from 'react';
import Layout from '../components/Layout';
import Radio from '../components/Forms/Radio';
import Submit from '../components/Buttons/Submit';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../services/authService';
import { USER_ROLES } from '../constants';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const OnboardingSchema = Yup.object({
  userRole: Yup.string()
    .oneOf([USER_ROLES.farmer, USER_ROLES.distributor])
    .required('Required'),
});

export default function Onboarding() {
  const router = useRouter();
  const user = isAuthenticated();
  const { walletAddress, role } = user;
  const { farmer, distributor } = USER_ROLES;
  const initialValues = { userRole: USER_ROLES.farmer };

  useEffect(() => {
    if (!walletAddress) router.push('/');
    if (role === farmer) router.push('/farmer/register');
    if (role === distributor) router.push('/distributor/register');
  }, [distributor, farmer, role, router, walletAddress]);

  const onSubmit = ({ userRole }) => {
    user.role = userRole;

    // TODO: Remove localStorage and set User.role in the database
    localStorage.setItem('user', JSON.stringify(user));

    if (user.role === farmer) {
      router.push('/farmer/register');
    } else if (user.role === distributor) {
      router.push('/distributor/register');
    }
  };

  return (
    <Layout>
      <div className="p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Welcome to Plyant!
            </h2>
            <p className="text-gray-500 mb-6">
              Before you start, we have just a few questions.
            </p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please select an option.</p>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={OnboardingSchema}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting, isValid }) => (
                    <Form className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                        <div className="md:col-span-3 mt-4">
                          <div role="group">
                            <Radio
                              name="userRole"
                              label="I am a Farmer"
                              value="farmer"
                            />
                            <Radio
                              name="userRole"
                              label="I am a Distributor"
                              value="distributor"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-6 text-right">
                          <div className="inline-flex items-end">
                            <Submit
                              isSubmitting={isSubmitting}
                              isValid={isValid}
                            />
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
