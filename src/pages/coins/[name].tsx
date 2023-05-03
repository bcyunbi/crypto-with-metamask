import Skeleton from "@/components/skeleton";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import BackBtn from "@/components/back";
import HistoryChart from "@/views/history-chart";


const CoinDetail: React.FC = () => {
    const router = useRouter()
    const { name, id } = router.query;
    const [apiRes, setApiRes] = useState(null)
    const [data, setData] = useState(dataDefault)
    useEffect(() => {
        if (id) {
            fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false`)
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    setApiRes(response ? response : null);
                    setData(response ? response : dataDefault);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [id]);

    return (
        <div className='my-6'>
            <BackBtn text={'' + name} />
            <div className='my-6'>
                {
                    apiRes ?
                        <>
                            <div className='flex gap-2 items-center'>
                                {data.image && <img src={data.image.small} alt={data.name} />}
                                <h1 className='text-2xl mb-2 capitalize font-bold'>{data.name}</h1>
                            </div>
                            <HistoryChart />
                            <div className="mt-6 p-5 rounded-lg bg-slate-200">
                                <CoinDescription description={data.description.en} />
                            </div>
                        </> :
                        <div className="wrapper-container mt-8">
                            <Skeleton className="h-8 w-32 mb-4" />
                            <Skeleton className="h-72 w-full mb-10" />
                        </div>
                }
            </div>
        </div>
    )
}

export default CoinDetail

interface Response {
    image: {
        small: string;
    };
    name: string;
    description: {
        en: string;
    }
}

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    description: string;
};

const CoinDescription: React.FC<Props> = ({ description }) => {
    return <p className='text-gray-500 [&>a]:text-sky-600 [&>a]:underline text-sm' dangerouslySetInnerHTML={{ __html: description }}></p>

}
const dataDefault = {
    image: { small: '' },
    name: '',
    description: {
        en: ''
    }
}