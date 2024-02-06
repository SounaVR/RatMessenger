// UserServer component
import { useState, useRef, useEffect } from 'react';
import pfp from '../../Assets/avatar.jpg';

const UserServer = ({ server, handleServerClick }) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef(null);

    const handleMouseEnter = () => {
        setTooltipVisible(true);
    };

    const handleMouseLeave = () => {
        setTooltipVisible(false);
    };

    useEffect(() => {
        if (tooltipRef.current) {
            const serverRect = tooltipRef.current.parentElement.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const tooltipTop = serverRect.top + window.scrollY + serverRect.height / 2 - tooltipRect.height / 2;
            const tooltipLeft = serverRect.left + window.scrollX + serverRect.width + 9;

            setTooltipPosition({
                top: tooltipTop,
                left: tooltipLeft,
            });
        }
    }, [isTooltipVisible]);

    return (
        <div
            className="server-tooltip"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img className="rounded-circle servers" src={pfp} height="35px" role="button" onClick={() => handleServerClick(server._id)}/>
            {isTooltipVisible && (
                <div
                    className="tooltiptext"
                    style={{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }}
                    ref={tooltipRef}
                >
                    {server?.name}
                </div>
            )}
        </div>
    );
}

export default UserServer;
