import { LogoIcon } from '@/icon';
import { useRouter } from 'next/router';
const Navbar = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    };
    return (
        <div className=' bg-slate-50/50 text-white  p-4  h-16 flex items-center fixed top-0 left-0 w-full z-10 backdrop-blur-md'>
            <div className="w-full text-gray-700">
                <div className="flex items-center gap-1 cursor-pointer" onClick={handleClick} >
                    <div className='text-sky-400 text-sm'><LogoIcon /> </div>
                    <span  className='text-sky-400 text-sm font-semibold'>CRYPTO</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar
