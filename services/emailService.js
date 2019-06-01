/**
 * Created by devo on 10/31/2017.
 */
import nodemailer from 'nodemailer'
import sesTransport from 'nodemailer-ses-transport'

function EmailService (config) {
    if (!(this instanceof EmailService)) return new EmailService(config)
    this.config = config
    this.mailer = nodemailer.createTransport(
        sesTransport({
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey
        }))
}

EmailService.prototype.send = function send (frm, to, subject, body, html, opts) {
    html = html || false
    let mail = {}
    mail.from = frm
    mail.to = to
    mail.subject = subject
    if (html) {
        mail.html = body
    } else {
        mail.text = body
    }
    opts = opts || {}
    Object.keys(opts).forEach(function (key) {
        mail[key] = opts[key]
    })
    let self = this
    return new Promise(function (resolve, reject) {
        self.mailer.sendMail(mail, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
            self = null
        })
    })
}

export default EmailService
