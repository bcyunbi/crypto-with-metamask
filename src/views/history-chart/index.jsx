import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import { useRouter } from 'next/router'
import Skeleton from '@/components/skeleton'
import useAxios from '@/hooks/useAxios'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

const HistoryChart = () => {
  const router = useRouter()
  const { id } = router.query
  const { response } = useAxios(
    `coins/${id}/market_chart?vs_currency=usd&days=7`
  )

  if (!response) {
    return (
      <div className='wrapper-container mt-8'>
        <Skeleton className='h-72 w-full mb-10' />
      </div>
    )
  }
  const { prices } = response
  const pricesList = prices ? prices : []
  const coinChartData = pricesList.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }))

  const options = {
    responsive: true,
  }
  const data = {
    labels: coinChartData.map((value) => moment(value.x).format('MMM DD')),
    datasets: [
      {
        fill: true,
        label: id,
        data: coinChartData.map((val) => val.y),
        borderColor: '#0EA5E9',
        backgroundColor: 'rgba(126, 180, 218, 0.314)',
      },
    ],
  }

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  )
}

// interface LineChartProps {
//     options?: ChartOptions<"line">;
//     data: ChartData<"line", unknown>[]:
//     {
//         datasets:object
//     }
// }

// const LineChart: React.FC<LineChartProps> = ({ options, data }) => {
//     return <Line options={options} data={data} />
// }
export default HistoryChart
