import paymentMethods from './../../assets/images/paymentMethods.png';

export default function Copyright() {
  return (
    <div className="bg-gray-800 p-4">
      <div className="container flex items-center justify-between">
        <p className="text-white">&copy; Farmzone - All Right Reserved</p>
        <div>
          <img src={paymentMethods} alt="methods" className="h-5" />
        </div>
      </div>
    </div>
  )
}