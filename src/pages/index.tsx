import useAxios from '@/hooks/useAxios';
import Wallet from '@/views/wallet';
interface CoinList {
  item: ICoinInfoProps
}
const Home = () => {
  const { response } = useAxios('search/trending');
  console.log("response", response);
  const coins = response ? response['coins'] : []
  return (
    <>
      <Wallet />
      {coins.length > 0 && coins.map((coin: CoinList, index) => {
        const item = coin.item;
        return <CoinInfo key={item.coin_id} {...item} />
      })}
    </>
  );
};

interface ICoinInfoProps {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
}

const CoinInfo = (props: ICoinInfoProps) => {
  return (
    <div className=' font-light mb-2 border-gray-200 border-2 rounded hover:border-gray-300'>
      <h1>{props.name}</h1>
      <span>{props.score + 1}</span>
      <img src={props.small} alt={props.name} />
    </div>
  );
};

export default Home;