import useAxios from '@/hooks/useAxios';
import CoinTrending from '@/views/coin-trending';
import Wallet from '@/views/wallet';
const Home: React.FC = () => {
  const { response } = useAxios('search/trending');
  console.log("response", response);
  const coins = response ? response['coins'] : []
  return (
    <>
      <Wallet />
      <CoinTrending coins={coins} />
    </>
  );
};

export default Home;