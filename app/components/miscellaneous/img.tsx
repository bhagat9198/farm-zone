import logo from './../../assets/images/logo.jpg';
import cropImg from './../../assets/images/crops.jpg';
import userImg from './../../assets/images/userImg.png';

export default function Logo() { 
  return <img src={logo} alt="logo" className='object-contain' />
}

export function CategoryImg() { 
  return <img src={cropImg} alt="category img" className='w-5 h-5 object-contain' />
}

export function UserImg() { 
  return <img src={userImg} alt="user img" className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover" />
}

// export function addProductImg() { 
//   return <img src={userImg} alt="user img" className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover" />
// }



