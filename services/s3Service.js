/**
 * Created by devo on 10/31/2017.
 */
import aws from 'aws-sdk'
import extend from 'extend'
import { errors } from 'devomain-constants'

let s3Service = function (config) {
    this.config = config
    if (!config.region) throw errors.SERVICES.S3SERVICE_REGION_NOT_DEFINED
    if (!config.bucket) throw errors.SERVICES.S3SERVICE_BUCKET_NOT_DEFINED
    aws.config.update({
        accessKeyId: ENV.AWS_ACCESS_KEY_ID,
        secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY
    })
    this.s3 = new aws.S3()
}

s3Service.prototype.uploadBase64Image = async function uploadBase64Image (bucket, name, data) {
    data = (typeof data === 'string') ? data : data.toString()
    let type = data.substr(5, data.search(/;/) - 5)
    let ext = type.split('/')[1]
    let buf = Buffer.allocUnsafe(data.replace(/^data:image\/\w+;base64,/, ''), 'base64')
    await this.upload(bucket, name + '.' + ext, buf, {
        ContentEncoding: 'base64',
        ContentType: type
    })
    return name + '.' + ext
}

s3Service.prototype.upload = function upload (bucket, dest, data, config) {
    config = config || {}
    config.Bucket = bucket
    config.Key = dest
    config.Body = data
    let self = this
    return new Promise(function (resolve, reject) {
        self.s3.putObject(config, function (err, result) {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

s3Service.prototype.getSignedUrl = function () {
    return this.s3.getSignedUrl.apply(this.s3, arguments)
}

s3Service.prototype.download = function (bucket, key, file) {
    let self = this
    return new Promise(function (resolve, reject) {
        self.s3.getObject({
            Bucket: bucket,
            Key: key
        }, function (err, data) {
            if (err) return reject(err)
            if (data) {
                console.log(data.Body)
                // fs.writeFileSync(file,data.)
            } else {
                return resolve(null)
            }
        })
    })
}

s3Service.prototype.update = function update (config) {
    if (config.region) {
        aws.config.update({region: config.region})
        this.s3 = null
        this.s3 = new aws.S3()
    }
    extend(true, this.config, config)
}

export default s3Service
