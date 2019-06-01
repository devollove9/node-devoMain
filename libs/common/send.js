/**
 * Created by devollove9 on 2017/10/26.
 */
const send = (ctx, body) => {
    ctx.response.status = 200
    ctx.result = {
        data: body,
        error: {}
    }
    ctx.body = JSON.stringify({
        data: body,
        error: {}
    })
}

export default send
