import { useState } from "react"
import {AiFillLike, AiOutlineLike} from 'react-icons/ai'

function LikeButton() {
    const [liked, setLiked] = useState(false)

    return (
        <button onClick={() => setLiked(!liked)}>
            {liked ? <AiFillLike size='1rem'/> : <AiOutlineLike size='1rem'/>}
        </button>
    )
}

export default LikeButton