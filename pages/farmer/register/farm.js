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
    createNFT();
    router.push('/farmer/');
  };

  const algosdk = require('algosdk');
  const crypto = require('crypto');
  // const fs = require('fs').promises
  // see ASA param conventions here: https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0003.md
  // for JavaScript SDK doc see: https://algorand.github.io/js-algorand-sdk/

  const keypress = async () => {
    process.stdin.setRawMode(true);
    return new Promise((resolve) =>
      process.stdin.once('data', () => {
        process.stdin.setRawMode(false);
        resolve();
      }),
    );
  };
  // createAccount
  // once created sucessfully, you will need to add funds
  // The Algorand TestNet Dispenser is located here:
  // https://dispenser.testnet.aws.algodev.network/

  const DISPENSERACCOUNT =
    'HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA';
  async function createAsset(algodClient, alice) {
    console.log('');
    console.log('==> CREATE ASSET');
    //Check account balance
    const accountInfo = await algodClient.accountInformation(alice.addr).do();
    const startingAmount = accountInfo.amount;
    console.log('Alice account balance: %d microAlgos', startingAmount);

    // Construct the transaction
    const params = await algodClient.getTransactionParams().do();
    // comment out the next two lines to use suggested fee
    // params.fee = 1000;
    // params.flatFee = true;
    // const closeout = receiver; //closeRemainderTo
    // WARNING! all remaining funds in the sender account above will be sent to the closeRemainderTo Account
    // In order to keep all remaining funds in the sender account after tx, set closeout parameter to undefined.
    // For more info see:
    // https://developer.algorand.org/docs/reference/transactions/#payment-transaction
    // Asset creation specific parameters
    // The following parameters are asset specific
    // Throughout the example these will be re-used.

    // Whether user accounts will need to be unfrozen before transacting
    const defaultFrozen = false;
    // Used to display asset units to user
    const unitName = user.name;
    // Friendly name of the asset
    const assetName = user.name;
    // Optional string pointing to a URL relating to the asset
    const url = 'https://s3.amazonaws.com/your-bucket/metadata.json';
    // Optional hash commitment of some sort relating to the asset. 32 character length.
    // metadata can define the unitName and assetName as well.
    // see ASA metadata conventions here: https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0003.md

    // The following parameters are the only ones
    // that can be changed, and they have to be changed
    // by the current manager
    // Specified address can change reserve, freeze, clawback, and manager
    // If they are set to undefined at creation time, you will not be able to modify these later
    const managerAddr = farmer.addr; // OPTIONAL: FOR DEMO ONLY, USED TO DESTROY ASSET WITHIN
    // Specified address is considered the asset reserve
    // (it has no special privileges, this is only informational)
    const reserveAddr = undefined;
    // Specified address can freeze or unfreeze user asset holdings
    const freezeAddr = undefined;
    // Specified address can revoke user asset holdings and send
    // them to other addresses
    const clawbackAddr = undefined;

    // Use actual total  > 1 to create a Fungible Token
    // example 1:(fungible Tokens)
    // totalIssuance = 10, decimals = 0, result is 10 total actual
    // example 2: (fractional NFT, each is 0.1)
    // totalIssuance = 10, decimals = 1, result is 1.0 total actual
    // example 3: (NFT)
    // totalIssuance = 1, decimals = 0, result is 1 total actual
    // integer number of decimals for asset unit calculation
    const decimals = 0;
    const total = 1; // how many of this asset there will be

    // temp fix for replit
    //const metadata2 = "16efaa3924a6fd9d3a4824799a4ac65d";

    const fullPath = __dirname + '/NFT/metadata.json';
    const metadatafile = await fs.readFile(fullPath);
    //    const metadatafile = (await fs.readFileSync(fullPath)).toString();
    const hash = crypto.createHash('sha256');
    hash.update(metadatafile);

    // replit error  - work around
    // const metadata = "16efaa3924a6fd9d3a4824799a4ac65d";
    // replit error  - the following only runs in debug mode in replit, and use this in your code
    const metadata = new Uint8Array(hash.digest()); // use this in your code

    const fullPathImage = __dirname + '/NFT/alice-nft.png';
    //    const metadatafileImage = (await fs.readFileSync(fullPathImage));
    const metadatafileImage = await fs.readFile(fullPathImage);
    const hashImage = crypto.createHash('sha256');
    hashImage.update(metadatafileImage);
    const hashImageBase64 = hashImage.digest('base64');
    const imageIntegrity = 'sha256-' + hashImageBase64;

    // use this in yout metadata.json file
    console.log('image_integrity : ' + imageIntegrity);

    // signing and sending "txn" allows "addr" to create an asset
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: farmer.addr,
      total,
      decimals,
      assetName,
      unitName,
      assetURL: url,
      assetMetadataHash: metadata,
      defaultFrozen,
      freeze: freezeAddr,
      manager: managerAddr,
      clawback: clawbackAddr,
      reserve: reserveAddr,
      suggestedParams: params,
    });

    const rawSignedTxn = txn.signTxn(alice.sk);
    const tx = await algodClient.sendRawTransaction(rawSignedTxn).do();
    let assetID = null;
    // wait for transaction to be confirmed
    const confirmedTxn = await algosdk.waitForConfirmation(
      algodClient,
      tx.txId,
      4,
    );
    //Get the completed Transaction
    console.log(
      'Transaction ' +
        tx.txId +
        ' confirmed in round ' +
        confirmedTxn['confirmed-round'],
    );
    assetID = confirmedTxn['asset-index'];
    // console.log("AssetID = " + assetID);

    await printCreatedAsset(algodClient, alice.addr, assetID);
    await printAssetHolding(algodClient, alice.addr, assetID);
    console.log(
      'You can verify the metadata-hash above in the asset creation details',
    );
    console.log(
      'Using terminal the Metadata hash should appear as identical to the output of',
    );
    console.log(
      'cat aliceAssetMetaData.json | openssl dgst -sha256 -binary | openssl base64 -A',
    );
    console.log('That is: Cii04FOHWE4NiXQ4s4J02we2gnJop5dOfdkBvUoGHQ8=');

    return { assetID };
  }

  async function destroyAsset(algodClient, alice, assetID) {
    console.log('');
    console.log('==> DESTROY ASSET');
    // All of the created assets should now be back in the creators
    // Account so we can delete the asset.
    // If this is not the case the asset deletion will fail
    const params = await algodClient.getTransactionParams().do();
    // Comment out the next two lines to use suggested fee
    // params.fee = 1000;
    // params.flatFee = true;
    // The address for the from field must be the manager account
    const addr = alice.addr;
    // if all assets are held by the asset creator,
    // the asset creator can sign and issue "txn" to remove the asset from the ledger.
    // const txn = algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject({
    //from: addr,
    //note: undefined,
    //assetIndex: assetID,
    //suggestedParams: params
    //})
    // The transaction must be signed by the manager which
    // is currently set to alice
    const rawSignedTxn = txn.signTxn(alice.sk);
    const tx = await algodClient.sendRawTransaction(rawSignedTxn).do();
    // Wait for confirmation
    const confirmedTxn = await algosdk.waitForConfirmation(
      algodClient,
      tx.txId,
      4,
    );
    //Get the completed Transaction
    console.log(
      'Transaction ' +
        tx.txId +
        ' confirmed in round ' +
        confirmedTxn['confirmed-round'],
    );
    // The account3 and account1 should no longer contain the asset as it has been destroyed
    console.log('Asset ID: ' + assetID);
    console.log('Alice = ' + alice.addr);
    await printCreatedAsset(algodClient, alice.addr, assetID);
    await printAssetHolding(algodClient, alice.addr, assetID);

    return;
    // Notice that although the asset was destroyed, the asset id and associated
    // metadata still exists in account holdings for any account that optin.
    // When you destroy an asset, the global parameters associated with that asset
    // (manager addresses, name, etc.) are deleted from the creator's account.
    // However, holdings are not deleted automatically -- users still need to
    // use the closeToAccount on the call makePaymentTxnWithSuggestedParams of the deleted asset.
    // This is necessary for technical reasons because we currently can't have a single transaction touch potentially
    // thousands of accounts (all the holdings that would need to be deleted).

    // ==> DESTROY ASSET
    // Transaction QCE52AAX75VBSGDL36VHMNVT6LXSR5M6V5JUNSKE6BXQGLQEMLDA confirmed in round 16833536
    // Asset ID: 28291127
    // Alice = RA6RAUNDQGHRWTCR5YRL2YJMIXTHWD5S3ZYHVBGSNA76AVBAYELSNRVKEI
    // Bob = YC3UYV4JLHD344OC3G7JK37DRVSE7X7U2NOZVWSQNVKNEGV4M3KFA7WZ44
  }
  async function closeoutAliceAlgos(algodClient, alice) {
    console.log('');
    console.log("==> CLOSE OUT ALICE'S ALGOS TO DISPENSER");
    let accountInfo = await algodClient.accountInformation(alice.addr).do();
    console.log('Alice Account balance: %d microAlgos', accountInfo.amount);
    const startingAmount = accountInfo.amount;
    // Construct the transaction
    const params = await algodClient.getTransactionParams().do();
    // comment out the next two lines to use suggested fee
    // params.fee = 1000;
    // params.flatFee = true;
    // For more info see:
    // https://developer.algorand.org/docs/reference/transactions/#payment-transaction
    // receiver account to send to
    const receiver = alice.addr;
    const enc = new TextEncoder();
    const amount = 0;
    const sender = alice.addr;
    // closeToRemainder will remove the assetholding from the account
    const closeRemainderTo = DISPENSERACCOUNT;
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: sender,
      to: receiver,
      amount,
      closeRemainderTo,
      note: undefined,
      suggestedParams: params,
    });
    // Sign the transaction
    const rawSignedTxn = txn.signTxn(alice.sk);
    // Submit the transaction
    const tx = await algodClient.sendRawTransaction(rawSignedTxn).do();
    // Wait for confirmation
    const confirmedTxn = await algosdk.waitForConfirmation(
      algodClient,
      tx.txId,
      4,
    );
    //Get the completed Transaction
    console.log(
      'Transaction ' +
        tx.txId +
        ' confirmed in round ' +
        confirmedTxn['confirmed-round'],
    );
    // const mytxinfo = JSON.stringify(confirmedTxn.txn.txn, undefined, 2);
    // console.log("Transaction information: %o", mytxinfo);
    accountInfo = await algodClient.accountInformation(alice.addr).do();
    let txAmount = confirmedTxn.txn.txn.amt;
    if (confirmedTxn.txn.txn.amt == undefined) {
      console.log('Transaction Amount: %d microAlgos', 0);
      txAmount = 0;
    } else {
      console.log(
        'Transaction Amount: %d microAlgos',
        confirmedTxn.txn.txn.amt,
      );
    }
    console.log('Transaction Fee: %d microAlgos', confirmedTxn.txn.txn.fee);
    const closeoutamt = startingAmount - txAmount - confirmedTxn.txn.txn.fee;
    console.log('Close To Amount: %d microAlgos', closeoutamt);
    console.log('Bobs Account balance: %d microAlgos', accountInfo.amount);
    return;
    // Sample Output
    // ==> CLOSE OUT ALICE'S ALGOS TO DISPENSER
    // Alice Account balance: 8996000 microAlgos
    // Transaction IC6IQVUOFLTTXNWZWD4F6L5CZXOFBTD3EY2QJUY5MHUOQSAX3CEA confirmed in round 16833543
    // Transaction Amount: 0 microAlgos
    // Transaction Fee: 1000 microAlgos
    // Bobs Account balance: 0 microAlgos
  }

  const createAccount = function () {
    try {
      // let account1_mnemonic = "goat march toilet hope fan federal around nut drip island tooth mango table deal diesel reform lecture warrior tent volcano able wheel marriage absorb minimum";
      // const myaccount = algosdk.mnemonicToSecretKey(account1_mnemonic);
      const myaccount = algosdk.generateAccount();
      console.log('Account Address = ' + myaccount.addr);
      let account_mnemonic = algosdk.secretKeyToMnemonic(myaccount.sk);
      console.log('Account Mnemonic = ' + account_mnemonic);
      console.log('Account created. Save off Mnemonic and address');
      console.log('Add funds to account using the TestNet Dispenser: ');
      console.log(
        'https://dispenser.testnet.aws.algodev.network/?account=' +
          myaccount.addr,
      );

      return myaccount;
    } catch (err) {
      console.log('err', err);
    }
  };

  // Function used to print created asset for account and assetid
  const printCreatedAsset = async function (algodClient, account, assetid) {
    // note: if you have an indexer instance available it is easier to just use this
    //     let accountInfo = await indexerClient.searchAccounts()
    //    .assetID(assetIndex).do();
    // and in the loop below use this to extract the asset for a particular account
    // accountInfo['accounts'][idx][account]);
    let accountInfo = await algodClient.accountInformation(account).do();
    for (idx = 0; idx < accountInfo['created-assets'].length; idx++) {
      let scrutinizedAsset = accountInfo['created-assets'][idx];
      if (scrutinizedAsset['index'] == assetid) {
        console.log('AssetID = ' + scrutinizedAsset['index']);
        let myparms = JSON.stringify(scrutinizedAsset['params'], undefined, 2);
        console.log('parms = ' + myparms);
        break;
      }
    }
  };
  // Function used to print asset holding for account and assetid
  const printAssetHolding = async function (algodClient, account, assetid) {
    // note: if you have an indexer instance available it is easier to just use this
    //     let accountInfo = await indexerClient.searchAccounts()
    //    .assetID(assetIndex).do();
    // and in the loop below use this to extract the asset for a particular account
    // accountInfo['accounts'][idx][account]);
    let accountInfo = await algodClient.accountInformation(account).do();
    for (idx = 0; idx < accountInfo['assets'].length; idx++) {
      let scrutinizedAsset = accountInfo['assets'][idx];
      if (scrutinizedAsset['asset-id'] == assetid) {
        let myassetholding = JSON.stringify(scrutinizedAsset, undefined, 2);
        console.log('assetholdinginfo = ' + myassetholding);
        break;
      }
    }
  };

  async function createNFT() {
    console.log('i am here');
    try {
      let alice = createAccount();
      console.log('Press any key when the account is funded');
      await keypress();
      // Connect your client
      // const algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      // const algodServer = 'http://localhost';
      // const algodPort = 4001;
      const algodToken =
        '2f3203f21e738a1de6110eba6984f9d03e5a95d7a577b34616854064cf2c0e7b';
      const algodServer = 'https://academy-algod.dev.aws.algodev.network';
      const algodPort = 443;

      let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

      // CREATE ASSET
      const { assetID } = await createAsset(algodClient, alice);
      // DESTROY ASSET
      // await destroyAsset(algodClient, alice, assetID)
      // CLOSEOUT ALGOS - Alice closes out Alogs to dispenser
      await closeoutAliceAlgos(algodClient, alice);
    } catch (err) {
      console.log('err', err);
    }
  }

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
