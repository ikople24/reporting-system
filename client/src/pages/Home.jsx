import {useUser} from '@clerk/clerk-react'

const Home = () => {

  return (
    <div>
      <div>
        <div>
          <h1 className="text-2xl font-bold">Home</h1>
          {/* <p>สวัสดี, {user.firstName}</p>
          {role === 'superadmin' && <p>คุณเป็น Super Admin จัดการได้ทุกส่วน</p>}
          {role === 'admin' && <p>คุณเป็น Admin จัดการข้อมูลและตั้งค่าได้</p>}
          {role === 'user' && <p>คุณเป็น User สามารถแจ้งปัญหาได้</p>} */}
        </div>
      </div>
    </div>
  )
}

export default Home