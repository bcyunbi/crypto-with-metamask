import Navbar from '@/components/nav'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <div className='p-4 pt-16'>
    <Navbar />
    <Component {...pageProps} />
  </div>
}
