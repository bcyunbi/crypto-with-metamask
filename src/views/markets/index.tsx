import Skeleton from "@/components/skeleton";
import CoinSummary from "@/views/coin-summary";
import { useEffect, useRef, useState } from "react";

const Markets = () => {
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrollRecord, setScrollRecord] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const result = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=${page}&sparkline=false`)
                const data = await result.json() || [];
                let _item = items.concat(data)
                setItems(_item);
                setLoading(false)
            } catch (error) {
                console.log("e", error)
            };
        };
        fetchData();
    }, [page]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRecord;
        }
    }, [items]);

    const handleScroll = (event: { currentTarget: { scrollTop: any; clientHeight: any; scrollHeight: any; }; }) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollTop + clientHeight === scrollHeight) {
            setPage((prevPage) => prevPage + 1);
            setScrollRecord(scrollTop)
        }
    };

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto px-2 mt-8">
                <div className='text-center font-semibold text-2xl py-2 underline text-neutral-700 tracking-wide decoration-sky-500/[.33] mb-2'>Markets</div>
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
        <div className="mt-8 max-w-3xl mx-auto" >
            <div className='text-center font-semibold text-2xl py-2 underline text-neutral-700 tracking-wide decoration-sky-500/[.33] mb-2'>Markets</div>
            <div className='p-3' style={{ height: '400px', overflowY: 'scroll' }} onScroll={handleScroll} ref={scrollRef}>
                {items && items.map((coin: Coin) => <CoinSummary key={coin.id} coin={coin} />)}
            </div>
        </div>
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