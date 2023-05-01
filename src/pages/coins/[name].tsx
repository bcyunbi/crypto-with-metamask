import { useRouter } from "next/router"

const CoinDetail = () => {
    const router = useRouter()

    return <>router::{router.query.name}</>
}

export default CoinDetail