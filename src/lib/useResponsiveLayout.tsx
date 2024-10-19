import { useState, useEffect } from 'react';

const useResponsiveLayout = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleSize = () => {
            setIsMobile(window.innerWidth < 768);
        }

        handleSize();
        window.addEventListener('resize', handleSize);

        return () => window.removeEventListener('resize', handleSize);
    }, [])

    return isMobile;
}

export default useResponsiveLayout;