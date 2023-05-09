import useAxios from '@/hooks/useAxios';
import CoinTrending from '@/views/coin-trending';
import Markets from '@/views/markets';
import Wallet from '@/views/wallet';
const Home: React.FC = () => {
  const { response } = useAxios('search/trending');
  const coins = response ? response['coins'] : []
  return (
    <>
      <Wallet />
      <CoinTrending coins={coins} />
      <Markets />
    </>
  );
};

export default Home;