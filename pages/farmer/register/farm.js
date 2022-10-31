import Layout from '../../../components/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../../services/authService';
import {
  USER_ROLES,
  CROPS,
  CERTIFICATES,
  FARM_TYPES,
} from '../../../constants';
import Input from '../../../components/Forms/Input';
import Multiselect from '../../../components/Forms/Multiselect';
import Dropdown from '../../../components/Forms/Dropdown';
import Submit from '../../../components/Buttons/Submit';
import Checkbox from '../../../components/Forms/Checkbox';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  owner: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  farmer: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  address: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  annualRevenue: Yup.number().positive().integer().required('Required'),
  assetValue: Yup.number().positive().integer().required('Required'),
  employees: Yup.number().positive().integer().required('Required'),
  propertySize: Yup.number().positive().integer().required('Required'),
  verticalGrowArea: Yup.number().positive().integer().required('Required'),
  groundGrowArea: Yup.number().positive().integer().required('Required'),
  farmType: Yup.string()
    .oneOf([FARM_TYPES.map((farm) => farm.name)])
    .required('Required'),
  certificates: Yup.array().min(1).required('Required'),
  crops: Yup.array().min(1).required('Required'),
  reviewedForm: Yup.bool().oneOf([true], 'Field must be checked'),
});

export default function Register() {
  const router = useRouter();
  const user = isAuthenticated();
  const { walletAddress, role } = user;
  const { farmer, distributor } = USER_ROLES;
  const initialValues = {
    name: '',
    owner: '',
    farmer: '',
    address: '',
    annualRevenue: '',
    assetValue: '',
    employees: '',
    propertySize: '',
    verticalGrowArea: '',
    groundGrowArea: '',
    farmType: '',
    certificates: [],
    crops: [],
    reviewedForm: false,
  };

  useEffect(() => {
    if (!walletAddress) router.push('/');
    if (role === distributor) router.push('/distributor');
  }, [distributor, farmer, role, router, walletAddress]);

  const onSubmit = (values) => {
    values.crops = CROPS.filter((crop) => {
      return values.crops.some((name) => crop.name === name);
    });

    let { farms } = user;
    farms = farms ? [...farms, values] : [values];
    user.farms = farms;

    // TODO: Remove localStorage and create farm NFT
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/farmer/');
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Register Farm
            </h2>
            <p className="text-gray-500 mb-6">
              A NFT of your farm will be minted on Algorand.
            </p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Farm Details</p>
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
                        <div className="md:col-span-6">
                          <Input
                            label="Name"
                            name="name"
                            placeholder="Magnolia Ranch"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Input
                            label="Owner"
                            name="owner"
                            placeholder="Krystle Kismet"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Input
                            label="Farmer"
                            name="farmer"
                            placeholder="Jane Appleseed"
                          />
                        </div>
                        <div className="md:col-span-6">
                          <Input
                            label="Address"
                            name="address"
                            placeholder="1234 NW Bobcat Lane, St. Robert, MO 65584"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Input
                            label="Annual Revenue"
                            name="annualRevenue"
                            placeholder="$100,000"
                            type="number"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Input
                            label="Asset Value"
                            name="assetValue"
                            placeholder="$50,000"
                            type="number"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Input
                            label="Number of Employees"
                            name="employees"
                            placeholder="3"
                            type="number"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Input
                            label="Property Size"
                            name="propertySize"
                            placeholder="500 square feet"
                            type="number"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Input
                            label="Vertical Grow Area"
                            name="verticalGrowArea"
                            placeholder="150 square feet"
                            type="number"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Input
                            label="Ground Grow Area"
                            name="groundGrowArea"
                            placeholder="200 square feet"
                            type="number"
                          />
                        </div>
                        <div className="md:col-span-6">
                          <Dropdown
                            label="Farm Type"
                            name="farmType"
                            options={FARM_TYPES}
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Multiselect
                            label="Certificates"
                            name="certificates"
                            options={CERTIFICATES}
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Multiselect
                            label="Crops"
                            name="crops"
                            options={CROPS}
                          />
                        </div>
                        <div className="md:col-span-6">
                          <div className="text-sm text-gray-500">
                            Hold down the command (or control) button to select
                            multiple options.
                          </div>
                        </div>
                        <div className="md:col-span-6">
                          <Checkbox name="reviewedForm" />
                        </div>
                        <div className="md:col-span-6 text-right mt-2">
                          <div className="inline-flex items-end">
                            <Submit
                              isSubmitting={isSubmitting}
                              isValid={isValid && dirty}
                              buttonText="Create NFT"
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
