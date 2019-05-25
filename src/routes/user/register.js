/**
 * Created by devollove9 on 2017/9/19.
 */
let errors = load( 'constants/errors' );
let queryValidator = load( 'middleware/queryValidator' );
let crypt = load( 'libs/encryption/crypt' );
let permissionFilter = load( 'middleware/permissionFilter' );
let idGenerator = load( 'libs/idGenerator' );

module.exports = [
    queryValidator( load( 'validation/user/register' ) ),
    async ( next ) => {
        let user;
        
        // Try Find User
        user = await models.User
            .findOne()
            .where( 'username' ).equals( this.params.username.toLowerCase() )
            .lean().exec();
        
        if ( user ) {
            throw errors.USER.USER_USERNAME_EXIST;
        }
        let newUserId = idGenerator();
        let date = new Date();
        let newUser = new models.User({
            userId: newUserId,
            username:this.params.username.toLowerCase(),
            password: crypt.encrypt( this.params.password ),
            registerDate: date.getTime(),
            lastLoginDate: 0,
            account: {
                credit: 0,
                balance: 0
            },
            notification: {
                arn:'',
                platform:''
            }
        });
        await newUser.save();

        let newPermission = new models.Permission(
            {
                userId:newUserId,
                permissionId:idGenerator(),
                permission:[
                    {
                        role:"user",
                        parameter:[],
                        restrict:[],
                        action:"*",
                        criteria: {
                            userId: newUserId
                        }
                    }
                ]
            }
        );
        await newPermission.save();
        
        send( this , newUser );
        await next();
    }];