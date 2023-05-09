import Marquee from 'react-fast-marquee';
import css from './index.module.scss'
const CoinTrending = (data: CoinsResponse) => {
  const coinsList = data ? data.coins : []
  return (
    <>
      <div className='text-center font-semibold text-2xl py-2 underline text-neutral-700 tracking-wide decoration-sky-500/[.33]  mb-8'>Rank</div>
      <Marquee speed={30}>
        {coinsList.length > 0 && coinsList.map((coin: Coin) => {
          const item = coin.item;
          return <CoinInfo key={item.coin_id} item={item} />
        })}
      </Marquee>
    </>
  );
};

const CoinInfo: React.FC<Coin> = ({ item }) => {
  return (
    <div className='flex items-center justify-start font-light border-solid border-b-2 border-sky-500/[.13] hover:border-sky-200  gap-2 p-2 mx-2 cursor-default text-md text-zinc-700'>
      <div className='bg-sky-200 text-zinc-700 rounded-full text-xs w-6 h-6 flex items-center justify-center'>{item.score + 1}</div>
      <div>{item.name}</div>
      <div className='w-10 h-10'><img src={item.small} alt={item.name} /></div>
    </div>
  );
};

export default CoinTrending;

interface Coin {
  item: {
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
}

interface CoinsResponse {
  coins: Coin[];
}