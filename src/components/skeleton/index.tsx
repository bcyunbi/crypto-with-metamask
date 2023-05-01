interface className {
    className: string;
}

const Skeleton: React.FC<className> = ({ className }) => {
    return (
        <div className="animate-pulse">
            <div className={`bg-gray-300 rounded-md ${className}`}></div>
        </div>
    )
}

export default Skeleton