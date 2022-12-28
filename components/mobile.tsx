import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

const Mobile = ({ children }:any) => {
    const [firstRender, setFirstRender] = useState(false);
    useEffect(() => {
        setFirstRender(true);
    }, [])
    const isMobile = useMediaQuery({ maxWidth: 1223 })
    return (
        <div>{firstRender && isMobile ? children : null}</div>
    )
}
export default Mobile;