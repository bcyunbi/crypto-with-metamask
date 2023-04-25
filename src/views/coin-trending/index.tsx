import css from './index.module.scss'
const CoinTrending = (data: CoinsResponse) => {
  const coinsList = data ? data.coins : []
  return (
    <>
      {coinsList.length > 0 && coinsList.map((coin: Coin) => {
        const item = coin.item;
        return <CoinInfo key={item.coin_id} item={item} />
      })}
    </>
  );
};

const CoinInfo: React.FC<Coin> = ({ item }) => {
  return (
    <div className=' font-light mb-2 border-gray-200 border-2 rounded hover:border-gray-300'>
      <h1>{item.name}</h1>
      <span>{item.score + 1}</span>
      <img src={item.small} alt={item.name} />
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