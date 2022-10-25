import Layout from '../../../components/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../../services/authService';
import { USER_ROLES, CROPS, PESTICIDES } from '../../../constants';
import Input from '../../../components/Forms/Input';
import Dropdown from '../../../components/Forms/Dropdown';
import Submit from '../../../components/Buttons/Submit';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Textarea from '../../../components/Forms/Textarea';

const CropsSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf([CROPS.map((crop) => crop.name)])
    .required('Required'),
  dateHarvested: Yup.string().required('Required'),
  datePlanted: Yup.string().required('Required'),
  weight: Yup.number().positive().integer().required('Required'),
  cost: Yup.number().positive().integer().required('Required'),
  pesticides: Yup.string().required('Required'),
  specialTreatments: Yup.string()
    .min(2, 'Too Short!')
    .max(1000, 'Too Long!')
    .required('Required'),
});

export default function Crops() {
  const router = useRouter();
  const user = isAuthenticated();
  const [userCrops, setUserCrops] = useState([]);
  const { walletAddress, role, farms } = user;
  const { farmer, distributor } = USER_ROLES;
  const initialValues = {
    type: '',
    dateHarvested: '',
    datePlanted: '',
    weight: '',
    cost: '',
    pesticides: '',
    specialTreatments: '',
  };

  useEffect(() => {
    if (!walletAddress) router.push('/');
    if (role === distributor) router.push('/distributor');
    if (!farms) router.push('/farmer/register/farm');
  }, [distributor, farmer, farms, role, router, walletAddress]);

  useEffect(() => {
    const filterCrops = user.farms.map((farm) => farm.crops);
    setUserCrops(filterCrops[0]);
  }, []);

  const onSubmit = (values) => {
    let { crops } = user;
    crops = crops ? [...crops, values] : [values];
    user.crops = crops;

    // TODO: Remove localStorage and create crop NFT
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/farmer/');
  };

  return (
    <Layout>
      <div className="p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">Log Crops</h2>
            <p className="text-gray-500 mb-6">
              A NFT of your crops will be minted on Algorand.
            </p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Crop Details</p>
                  <p>Please fill out all the fields.</p>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={CropsSchema}
                  onSubmit={onSubmit}
                >
                  {({ isSubmitting, isValid, dirty }) => (
                    <Form className="lg:col-span-2">
                      <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                        <div className="md:col-span-3">
                          <Dropdown
                            label="Type"
                            name="type"
                            options={userCrops}
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Dropdown
                            label="Pesticides"
                            name="pesticides"
                            options={PESTICIDES}
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Input
                            label="Weight"
                            name="weight"
                            type="number"
                            placeholder="5 kg"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Input
                            label="Cost"
                            name="cost"
                            type="number"
                            placeholder="$100"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Input
                            label="Date Planted"
                            name="datePlanted"
                            type="text"
                            placeholder="02/02/22"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <Input
                            label="Date Harvested"
                            name="dateHarvested"
                            type="text"
                            placeholder="03/06/22"
                          />
                        </div>
                        <div className="md:col-span-6">
                          <Textarea
                            label="Special Treatments"
                            name="specialTreatments"
                            placeholder="I played Mozart every day at sundown."
                          />
                        </div>
                        <div className="md:col-span-6 text-right">
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
