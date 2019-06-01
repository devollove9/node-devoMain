/**
 * Created by devollove9 on 2017/10/26.
 * All services
 * Requested packages:
 *  nodemailer
 *  node-ses-transport
 *  aws-sdk
 *  extend
 */

import emailService from './emailService'
// import s3Service from './s3Service'
// import snsService from './snsService'

const services = {
    emailService: emailService
    // s3Service: s3Service,
    // snsService: snsService
}

export { emailService }
export default services
