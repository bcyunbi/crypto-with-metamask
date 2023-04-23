import { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import Button from '@/components/button';
import css from '@/pages/index.module.scss'
export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [isRequestingAccounts, setIsRequestingAccounts] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [ens, setEns] = useState<string>('');

  useEffect(() => {
    connectWallet();
  }, []);
  const connectWallet = async () => {
    if (typeof window === 'undefined' || isRequestingAccounts) {
      return;
    }
    setIsRequestingAccounts(true);

    try {
      const web3Modal = new Web3Modal({
        network: 'rinkeby',
        cacheProvider: true,
        providerOptions: {}
      });

      const provider = await web3Modal.connect();
      if (provider) {
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress() || '';
        console.log('signer', signer);
        setAddress(address)
        const balance = await web3Provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance))
        const ens = await web3Provider.lookupAddress(address) || ''
        setEns(ens)
        setIsConnected(true);
      }
    } catch (error: any) {
      setError(error.message)
      console.log(error);
    } finally {
      setIsRequestingAccounts(false);
    }
  };

  const disconnectWallet = async () => {
    setIsConnected(false);
    setAddress('')
    setBalance('')
    setEns('')
  };
  return (
    <div className=" md:mx-auto p-4 w-full h-full flex justify-center items-center gap-3 flex-col">
      <Card active={isConnected} data={{
        address: getSimpleAddress(address), balance: balance, ens: ens
      }} />
      {isConnected ? (
        <Button text='Disconnect wallet' onClick={disconnectWallet} />
      ) : (
        <Button text='Connect wallet' onClick={connectWallet} />
      )}
      {error && <div>{error}</div>}
    </div>
  );
}

const Card = ({ active, data }: {
  active: boolean;
  data: {
    address: string;
    balance: string;
    ens: string;
  };
}) => {
  const { address, balance, ens } = data
  return <>
    <div className={`${css.card} ${active ? '' : 'blur'}`}>
      <div> address::{address}</div>
      <div> balance::{balance}</div>
      <div> ens:{ens}</div>
    </div></>
}
const getSimpleAddress = (str: string) => {
  if (!str || str.length < 7) return str
  const firstFour = str.substring(0, 4); // "This"
  const lastFour = str.substring(str.length - 4); // "ring"
  return firstFour + '...' + lastFour
}