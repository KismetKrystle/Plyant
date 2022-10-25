import Layout from '../../components/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../services/authService';
import { USER_ROLES } from '../../constants';
import Input from '../../components/Forms/Input';
import { Formik, Form } from 'formik';
import Submit from '../../components/Buttons/Submit';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  manager: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  company: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  address: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export default function Register() {
  const router = useRouter();
  const user = isAuthenticated();
  const { walletAddress, role } = user;
  const { farmer, distributor } = USER_ROLES;
  const initialValues = {
    manager: '',
    company: '',
    address: '',
  };

  useEffect(() => {
    if (!walletAddress) router.push('/');
    if (role === farmer) router.push('/farmer');
  }, [distributor, farmer, role, router, walletAddress]);

  const onSubmit = ({ manager, company, address }) => {
    user = { ...user, manager, company, address };

    // TODO: Remove localStorage and update user in database
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/distributor/');
  };

  return (
    <Layout>
      <div className="p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Register Account
            </h2>
            <p className="text-gray-500 mb-6">
              The owner of your business should complete this form.
            </p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={RegisterSchema}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting, isValid, dirty }) => (
                    <Form className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                        <div className="md:col-span-3">
                          <Input
                            label="Manager"
                            name="manager"
                            placeholder="Krystal Kismet"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Input
                            label="Company"
                            name="company"
                            placeholder="Fruits & Veggies"
                          />
                        </div>
                        <div className="md:col-span-6">
                          <Input
                            label="Headquarters Location"
                            name="address"
                            placeholder="1234 NW Bobcat Lane, St. Robert, MO 65584"
                          />
                        </div>
                        <div className="md:col-span-6 text-right mt-3">
                          <div className="inline-flex items-end">
                            <Submit
                              isSubmitting={isSubmitting}
                              isValid={isValid && dirty}
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
