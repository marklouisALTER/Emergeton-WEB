import { useDispatchModalStore } from "@/store/Modal/useDispatchModal";
import moment from 'moment';

type AlertCardProps = {
    message: string;
    alert_type: string;
    created_at: number;
    id: string;
    residentID: string;
    latitude: number;
    longitude: number;
    address: string;
    first_name: string;
    last_name: string;
};

const AlertCard = (props: AlertCardProps) => {
    
    const { openModal } = useDispatchModalStore();
    const alertID = props.id;
    
    const createdTimeAgo = moment(props.created_at, 'X').fromNow(); 

    const confirmationDispatch = () => {
        openModal(alertID);
    }

    return (
        <div key={props.id} className='relative w-full rounded-lg bg-white shadow-lg p-5 cursor-pointer transition-transform ease-in-out hover:scale-[1.02] hover:shadow-xl'>
            <div className='flex items-center justify-between'>
                <h3 className='font-secondary text-red-600 font-semibold text-lg animate-pulse'>🚨 Emergency Alert</h3>
                <p className='font-secondary text-gray-500 text-sm'>{createdTimeAgo}</p>
            </div>
            <div className='mt-4'>
                <p className='font-secondary text-gray-500 text-sm'>
                    <span className='text-gray-800 font-medium'>Resident:</span> <span className='text-black/70'>{props.first_name} {props.last_name}</span>
                </p>
                <p className='font-secondary text-gray-500 text-sm'>
                    <span className='text-gray-800 font-medium'>Address:</span> <span className='text-black/70'>{props.address}</span>
                </p>
                <p className='font-secondary text-gray-500 text-sm'>
                    <span className='text-gray-800 font-medium'>Message:</span> <span className='text-black/70'>{props.message}</span>
                </p>
                <p className='font-secondary text-gray-500 text-sm'>
                    <span className='text-gray-800 font-medium'>Alert type:</span> <span className='text-black/70'>{props.alert_type}</span>
                </p>
            </div>
            <div className='mt-4 w-full flex justify-between items-center'>
                <button 
                    onClick={confirmationDispatch}
                    className='bg-green-600 text-white text-sm px-4 py-2 rounded-md font-secondary hover:bg-green-700 transition-colors duration-200'>
                    Deploy
                </button>
            </div>
        </div>
    )
}

export default AlertCard;
