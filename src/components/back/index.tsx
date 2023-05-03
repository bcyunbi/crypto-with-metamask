import { BackIcon } from '@/icon';
import { useRouter } from 'next/navigation';

interface BackBtn {
    text?: string;
}

const BackBtn: React.FC<BackBtn> = ({ text = '' }) => {
    const router = useRouter();
    return <>
        <div className='text-sky-500 text-md cursor-pointer flex items-center justify-start gap-2'
            onClick={() => {
                router.back()
            }}><BackIcon />{text}</div>
    </>
}

export default BackBtn