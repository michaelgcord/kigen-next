import { useEffect, useState } from 'react'

const Menu = () => {
    const [open, setOpen] = useState(false);
    const toggleAnimation = () => {
        setOpen(!open);        
    }
    return (
        <div id="nav-icon3" onClick={toggleAnimation} className={open ? 'open' : 'unopen'}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}
export default Menu;
