
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import PmData from './PmData'
import Pm25Dashboard from './PmData'


const Home = () => {

  return (
    <section>
        <h1 className="text-2xl font-bold">Home</h1>

        <div>PM2.5 to day</div>
        <Pm25Dashboard/>
    </section>
  )
}

export default Home