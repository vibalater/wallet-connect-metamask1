import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import WalletConnectProvider from "@walletconnect/web3-provider";
import React, {useState} from 'react';
import {providers} from "ethers";

const walletConnectProvider = new WalletConnectProvider({
    rpc: 'https://mainnet.optimism.io',
    chainId: 10,
    // qrcode: false,
    qrcodeModalOptions: {
        mobileLinks: 'metamask',
        desktopLinks: 'metamask',
    }
});

export default function Home() {
  const [msg, setMsg] = useState('');

  const onConnect = () => {
    walletConnectProvider.enable().then(() => {
      const web3Provider = new providers.Web3Provider(walletConnectProvider);
      web3Provider.getSigner().then((signer) => {
        signer.signMessge("test").then((msg) => {
          setMsg(msg);
        }).catch((err) => console.error(err));
      }).catch((err) => console.error(err));
    })
    .catch(err => console.error(err));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={onConnect}>connect</button>

        <p className={styles.description}>
          {msg}
        </p>


      </main>
    </div>
  )
}
