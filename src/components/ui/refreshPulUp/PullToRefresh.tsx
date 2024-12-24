import { useState } from "react";

interface Props {
    readonly children: React.ReactNode;
    readonly onRefresh: any
}

export const PullToRefresh = ({ onRefresh, children }: Props) => {
    const [startY, setStartY] = useState(0);
    const [distance, setDistance] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const handleTouchStart = (e: any) => {
        setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: any) => {
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;

        if (diff > 0) {
            setDistance(diff);
        }
    };

    const handleTouchEnd = () => {
        if (distance > 100) {
            setRefreshing(true);
            onRefresh().finally(() => {
                console.log("end")
                setRefreshing(false);
            });
        }
        setDistance(0);
    };

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
                transform: `translateY(${distance}px)`,
                transition: refreshing ? "transform 0.3s" : "none",
            }}
        >
            {refreshing ? (
                <div style={{ textAlign: "center" }}>Обновление...</div>
            ) : (
                <div style={{ textAlign: "center" }}>Потяните вниз для обновления</div>
            )}
            {children}
        </div>
    );
};