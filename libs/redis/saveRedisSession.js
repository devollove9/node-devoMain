/**
 * Created by devo on 10/31/2017.
 */

const saveRedisSession = async (session, redisInstance) => {

    let result = await redisInstance.sadd('AUTHTOKEN::' + session.userId, session.token)
    if (result.toString() !== '1') return result

    result = await redisInstance.setex(session.token, session.maxAge, JSON.stringify(session))
    if (result.toString() !== 'OK') return result

    result = await redisInstance.setex('USERID::' + session.token, session.maxAge + 20, session.userId)
    return result
}

export default saveRedisSession
