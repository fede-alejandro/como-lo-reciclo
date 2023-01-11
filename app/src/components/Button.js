export default function Button({ children, className, onClick }) {
    return <button className={` text-white bg-green-400 border-green-400 rounded-xl p-1 ${className} p-1`} onClick={onClick}>{children}</button>
}