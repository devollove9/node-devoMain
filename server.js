
const koa = require( 'koa' );
let app = koa();
let router = load('koa-router')();

const bodyParser = require('koa-bodyparser');

module.exports = (context) => {
app.use(bodyParser());

function readFilesla( filePath ){
    return new Promise(function (resolve, reject) {
        fs.readFile( filePath , function (err, data) {
            if(err) return reject(err);
            resolve(data);
        });
    });
}
router.get('/listUsers', function *(next) {
    var me = this;
    //var data2 = yield readFilesla;
    //var data2 = fs.readFileSync( "user.json" , 'utf8' );
    //console.log( data2 );
    //var data = yield readFilesla( "user.json");
    //console.log( data );
    let users = [];
    users = yield models.User
        .find({})
        .lean().exec();
    console.log( users );
    me.body = users;
});

router.get('/', function *(next) {
    let users = models.users;
    let coq = {};
    let query = users.find(coq);
    let resutl = yield query.lean().exec();
    /*
    var doc;
    let userall = users.find({}, function(err, docs) {
        if (!err){
            doc = docs;
            //console.log(docs);
            process.exit();
        } else {throw err;}
    });*/
    console.log( resutl );
    this.body = resutl;
});


app.use( router.routes() );
    return app;
}





