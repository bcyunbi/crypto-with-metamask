import Skeleton from "@/components/skeleton";
import useAxios from "@/hooks/useAxios";
import CoinSummary from "@/views/coin-summary";

const Markets = () => {
    const { response, loading } = useAxios('coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
    const list = response ? response : []
    if (loading) {
        return (
            <div className="wrapper-container mt-8">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-full mt-2" />
                <Skeleton className="h-8 w-full mt-2" />
                <Skeleton className="h-8 w-full mt-2" />
                <Skeleton className="h-8 w-full mt-2" />
                <Skeleton className="h-8 w-full mt-2" />
                <Skeleton className="h-8 w-full mt-2" />
                <Skeleton className="h-8 w-full mt-2" />
            </div>
        )
    }

    return (
        <section className="mt-8">
            <h1 className="text-2xl mb-2">Markets</h1>
            {response && list.map((coin: Coin) => <CoinSummary key={coin.id} coin={coin} />)}
        </section>
    )
}

export default Markets

interface Coin {
    id: string | number
    name: string
    image: string
    symbol: string
    current_price: number
    price_change_percentage_24h: number
    market_cap: number
}