import React from 'react';
import { TOKEN, ALGOD_SERVER, PORT } from "./constants";


const algosdk = require('algosdk');


const CreateAsset = ({userAccount}) => {
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState('');
    const [isLoading, setLoading] = useState(false);

    const assetURL = useRef()
    const assetName = useRef()
    const unitName = useRef()
    const totalUnit = useRef()
    const note = useRef()
    const decimals = useRef()
    const traineeadd = useRef()
    
    
    const toggleModal = () => {
      setModal(!modal);
    };
 
    const createAsset = async () =>{
        // await AlgoSigner.connect();
        setLoading(true);
        let client =  new algosdk.Algodv2(TOKEN, ALGOD_SERVER, PORT)
                
        //Query Algod to get testnet suggested params
        let txParamsJS = await client.getTransactionParams().do()

        try{
        
            const txn = await new algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
                from: userAccount.current[0].address,
                assetName: assetName.current,
                unitName: unitName.current,
                total: +totalUnit.current,
                decimals: +decimals.current,
                assetURL : assetURL.current,
                manager: userAccount.current[0].address,
                reserve: userAccount.current[0].address,   
                freeze: userAccount.current[0].address,
                clawback: userAccount.current[0].address,
                note: AlgoSigner.encoding.stringToByteArray(note.current),
                suggestedParams: {...txParamsJS}
              });
            
            const txn_b64 = await AlgoSigner.encoding.msgpackToBase64(txn.toByte());
            console.log('id1', txn_b64)
             let signedTxs  = await AlgoSigner.signTxn([{txn: txn_b64}])
              console.log('id2', signedTxs)

              // Get the base64 encoded signed transaction and convert it to binary
            let binarySignedTx = await AlgoSigner.encoding.base64ToMsgpack(signedTxs[0].blob);
            console.log('id3', binarySignedTx)
             // Send the transaction through the SDK client
            let id = await client.sendRawTransaction(binarySignedTx).do();
                console.log('id4', id)
                // setLoading(false)
            let assetID = null;
            const ptx = await algosdk.waitForConfirmation(client, id.txId, 4);
            assetID = ptx["asset-index"];  
            // console.log("AssetID = " + assetID);
            // console.log('guysss',traineeadd.current);
            const enc = new TextEncoder();
            const notes = enc.encode(`${assetID}`);
            
            try{
                const txn = await new algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                    from:  userAccount.current[0].address,
                    to: traineeadd.current,
                    amount : 0,
                    note: notes,
                    suggestedParams: {...txParamsJS}
                  });
                  
                // Use the AlgoSigner encoding library to make the transactions base64
                let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
                  
                let signedTxs = await AlgoSigner.signTxn([{txn: txn_b64}])
    
                // Get the base64 encoded signed transaction and convert it to binary
                let binarySignedTx = AlgoSigner.encoding.base64ToMsgpack(signedTxs[0].blob);
    
                // Send the transaction through the SDK client
                let id = await client.sendRawTransaction(binarySignedTx).do();
                    console.log('success', id)
                    setStatus('Transaction sent successfully!');
                    toggleModal();
                    setLoading(false)
                    // if(id['txId'] !== null){
                    //     await printCreatedAsset(client, userAccount.current[0].address, assetID);
                    //     await printAssetHolding(client, userAccount.current[0].address, assetID);
                    // }
            }catch(err){
                console.log('error', err)
                setStatus('Asset Id not send successfully');
                toggleModal();
                setLoading(false)
            }  
        }catch(err){
            console.log('error first',err)
            setStatus('Asset creation failed, check if your Algosigner account is connected');
            toggleModal();
            setLoading(false)
        }
    

// let params = await algodclient.getTransactionParams().do();
//  params.fee = 1000;
//  params.flatFee = true;
// let note = undefined; // arbitrary data to be stored in the transaction; here, none is stored
// let addr = recoveredAccount1.addr;
// let defaultFrozen = false;
// let decimals = 0;
// let totalIssuance = 1000;
// let unitName = "LATINUM";
// let assetName = "latinum";
// let assetURL = "http://someurl";
// let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac65d";
// let manager = recoveredAccount2.addr;
// let reserve = recoveredAccount2.addr;
// let freeze = recoveredAccount2.addr;
// let clawback = recoveredAccount2.addr;

// let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
//     addr, 
//     note,
//     totalIssuance, 
//     decimals, 
//     defaultFrozen, 
//     manager, 
//     reserve, 
//     freeze,
//     clawback, 
//     unitName, 
//     assetName, 
//     assetURL, 
//     assetMetadataHash, 
//     params);

// let rawSignedTxn = txn.signTxn(recoveredAccount1.sk)
// let tx = (await algodclient.sendRawTransaction(rawSignedTxn).do());

// let assetID = null;
// const ptx = await algosdk.waitForConfirmation(algodclient, tx.txId, 4);
// assetID = ptx["asset-index"];
// console.log("Transaction " + tx.txId + " confirmed in round " + ptx["confirmed-round"]);

 return(
    <>
    <Header/>
    <div className='create'>
        <div>
            
        </div>

    </div>
    </>
    )


    
}
export default CreateAsset;