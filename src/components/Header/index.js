import { memo } from "react";
import "./header.css"

const Header = memo(({ pageName }) => {
    return (
        <div className="header-bar bg-primary text-center text-white p-2">
            <label>{pageName}</label>
        </div>
    )
})

export default Header;