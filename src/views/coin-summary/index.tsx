import Link from "next/link";
import { currencyFormat, percentFormat } from "@/utils/format";
import { TrendingDown, TrendingUp } from "@/icon";
import css from './index.module.scss'
const CoinSummary: React.FC<CoinSummaryType> = ({ coin }) => {
    console.log(coin);
    return (
        <Link href={{
            pathname: '/coins/[name]',
            query: { name: coin.name },
        }
        }>
            <div className={`flex justify-between items-flex font-light p-3 rounded-md  hover:bg-gray-200 ${css.col}`}>
                <div className="w-2/3 h-full flex items-center justify-start flex-row gap-2 flex-auto">
                    <CoinTitle coin={coin} />
                </div>
                <div className="hidden sm:block  w-full">
                    <MarketCap coin={coin} />
                </div>
                <div className="w-1/3 h-full flex items-start justify-end flex-col">
                    <TradingRate coin={coin} />
                </div>
            </div>
        </Link >
    )
}

export default CoinSummary

interface CoinSummaryType {
    coin: {
        id: string | number
        name: string
        image: string
        symbol: string
        current_price: number
        price_change_percentage_24h: number
        market_cap: number
    }
}

const MarketCap: React.FC<CoinSummaryType> = ({ coin }) => {
    return <>
        <div className="hidden sm:flex  w-full gap-1 items-start justify-start flex-col text-zinc-500 text-sm">
            <p>Market Cap</p>
            <span>{currencyFormat(coin.market_cap)}</span>
        </div>
    </>
}

const CoinTitle: React.FC<CoinSummaryType> = ({ coin }) => {
    return <>
        <div className={`w-10 h-10 ${css.img}`}>
            <img src={coin.image} alt={coin.name} />
        </div>
        <div className="flex items-start justify-start flex-col gap-1 text-md text-zinc-700">
            <div className="line-clamp-1">
                <div className="font-medium text-md">{coin.name}
                    <span className="text-xs">({coin.symbol})</span>
                </div>
            </div>
            <span className="text-center">{currencyFormat(coin.current_price)}</span>
        </div>
    </>
}

const TradingRate: React.FC<CoinSummaryType> = ({ coin }) => {
    return <>
        <div className={`flex items-center justify-end w-full h-full text-sm ${coin.price_change_percentage_24h < 0 ? 'text-red-400' : 'text-green-400'}`}>
            <span>{percentFormat(coin.price_change_percentage_24h)}</span>
            {coin.price_change_percentage_24h < 0 ? <TrendingDown /> : <TrendingUp />}
        </div>
    </>
}