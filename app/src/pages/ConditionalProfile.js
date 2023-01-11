import { useParams } from 'react-router-dom'
import Profile from './Profile'
import MyProfile from './MyProfile'
import log from '../utils/coolog'
import extractSubFromToken from '../utils/extractSubFromToken'

function ConditionalProfile()  {
    log.info('ConditionalProfile -> render')

    const { targetUserId } = useParams()

    const userId = extractSubFromToken(sessionStorage.token)

    return targetUserId === userId ? <MyProfile /> : <Profile />
}
export default ConditionalProfile