/**
 * Created by devo on 10/31/2017.
 */
// import { emailService as EmailService } from 'devomain-services'
import { emailService as EmailService } from '@/services';

const loadService = async (ctx) => {
    AppLogger.info('    [Services] Loading services...')
    let services = {}
    /*
    services.s3 = new s3Service({
        retion: ENV.UPLOAD_REGION,
        bucket: ENV.UPLOAD_BUCKET
    })
    AppLogger.info('        [S3] s3 services initiated at region:' + ENV.UPLOAD_REGION + ', bucket:' + ENV.UPLOAD_BUCKET )
    */
    services.emailService = new EmailService({
        region: ENV.AWS.EMAIL_SERVICE_REGION,
        accessKeyId: ENV.AWS.ACCESS_KEY_ID,
        secretAccessKey: ENV.AWS.SECRET_ACCESS_KEY
    })
    AppLogger.info('        [EmailService] E-mail services initiated')

    ctx.services = services
    AppLogger.info('    [Services] Services loaded...')
}

export default loadService
