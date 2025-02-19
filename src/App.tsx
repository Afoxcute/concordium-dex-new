// import React, { useEffect, useState } from 'react';
// import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
// import Connection from './Connection';
// import { version } from '../package.json';
// import Dex from './components/Dex';
// import DexVerification from './components/DexVerification';

// const VERIFIER_URL = '/api';

// export default function App() {
//     const [account, setAccount] = useState<string>();
//     const [authToken, setAuthToken] = useState<string>();
//     const [isDexVerified, setIsDexVerified] = useState<boolean>(false);
//     const [showVerification, setShowVerification] = useState<boolean>(true); // Show verification by default

//     useEffect(() => {
//         detectConcordiumProvider()
//             .then((provider) => {
//                 provider.on('accountChanged', setAccount);
//                 provider.on(
//                     'accountDisconnected',
//                     () => void provider.getMostRecentlySelectedAccount().then(setAccount),
//                 );
//                 provider.getMostRecentlySelectedAccount().then(setAccount).catch(console.error);
//             })
//             .catch(() => setAccount(undefined));
//     }, []);

//     const handleVerificationComplete = () => {
//         setIsDexVerified(true);
//         setShowVerification(false);
//     };

//     return (
//         <main className="restricted-media">
//             <h1 className="title">Concordium DEX</h1>
//             <Connection
//                 verifier={VERIFIER_URL}
//                 account={account}
//                 authToken={authToken}
//                 setAccount={setAccount}
//                 setAuthToken={setAuthToken}
//             />
            
//             {showVerification && (
//                 <DexVerification
//                     onVerificationComplete={handleVerificationComplete}
//                     onCancel={() => {
//                         // Optional: Add logic for what happens when verification is cancelled
//                         alert('Verification is required to use the DEX');
//                     }}
//                 />
//             )}
            
//             {isDexVerified && <Dex account={account} />}

//             <div>
//                 <br />
//                 Version: {version} |{' '}
//                 <a
//                     style={{ color: 'white' }}
//                     href="https://developer.concordium.software/en/mainnet/net/guides/dex/index.html"
//                     target="_blank"
//                     rel="noreferrer"
//                 >
//                     DEX Documentation
//                 </a>
//                 <br />
//             </div>
//         </main>
//     );
// } 



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Root from './components/Root'; // Your gallery component
// import WCCD from './components/wCCD'; // Your wCCD component wrapper

// export default function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Root />} />
//                 <Route path="/wccd" element={<WCCD />} />
//             </Routes>
//         </Router>
//     );
// }

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Network, WithWalletConnector, MAINNET, TESTNET } from '@concordium/react-components';
import Root from './components/Root'; // Your gallery component
import WCCD from './components/wCCD'; // Your wCCD component wrapper
import { WCCD_CONTRACT_INDEX_MAINNET, WCCD_CONTRACT_INDEX_TESTNET } from '../src/components/constants';

export default function App() {
    const testnet = 'testnet';
    const mainnet = 'mainnet';

    let NETWORK: Network;
    let wCCDContractIndex: bigint;

    // if (process.env.NETWORK === mainnet) {
    //     NETWORK = MAINNET;
    //     wCCDContractIndex = WCCD_CONTRACT_INDEX_MAINNET;
    // } else if (process.env.NETWORK === testnet) {
        NETWORK = TESTNET;
        wCCDContractIndex = WCCD_CONTRACT_INDEX_TESTNET;
    // } else {
    //     throw Error('Environmental variable NETWORK needs to be defined and set to either "mainnet" or "testnet"');
    // }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route 
                    path="/wccd" 
                    element={
                        <WithWalletConnector network={NETWORK}>
                            {(props) => <WCCD walletConnectionProps={props} wCCDContractIndex={wCCDContractIndex} />}
                        </WithWalletConnector>
                    } 
                />
            </Routes>
        </Router>
    );
}