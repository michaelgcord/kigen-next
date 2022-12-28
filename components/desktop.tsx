import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

const Desktop = ({ children }:any) => {
    const [firstRender, setFirstRender] = useState(false);
    useEffect(() => {
        setFirstRender(true);
    }, [])
    const isDesktop = useMediaQuery({ minWidth: 1224 })
    return (
        <div>{firstRender && isDesktop ? children : null}</div>
    )
}
export default Desktop;