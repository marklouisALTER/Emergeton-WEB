type AlertCardProps = {
    message: string;
    alertType: string;
    date: string;
    alertID: string;
    residentID: string;
    latitude: number;
    longitude: number;
}

const AlertCard = (props: AlertCardProps) => {
  return (
    <div key={props.alertID} className='relative w-full rounded-lg bg-white shadow-lg p-5 cursor-pointer transition-transform ease-in-out hover:scale-[1.02] hover:shadow-xl'>
        <div className='flex items-center justify-between'>
        <h3 className='font-secondary text-red-600 font-semibold text-lg animate-pulse'>🚨 Emergency Alert</h3>
        <span className='text-xs text-gray-500'>2 mins ago</span>
        </div>
        <div className='mt-4'>
        <p className='font-secondary text-gray-500 text-sm'>
            <span className='text-gray-800 font-medium'>Message:</span> <span className='text-black/70'>{props.message}</span>
        </p>
        <p className='font-secondary text-gray-500 text-sm'>
            <span className='text-gray-800 font-medium'>Latitude:</span> <span className='text-black/70'>{props.latitude}</span>
        </p>
        <p className='font-secondary text-gray-500 text-sm'>
            <span className='text-gray-800 font-medium'>Longtitude:</span> <span className='text-black/70'>{props.longitude}</span>
        </p>
        </div>
        <div className='mt-4 w-full flex justify-between items-center'>
        <button className='bg-green-600 text-white text-sm px-4 py-2 rounded-md font-secondary hover:bg-green-700 transition-colors duration-200'>
            Deploy
        </button>
        </div>
    </div>
  )
}

export default AlertCard