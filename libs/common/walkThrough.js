/**
 * Created by devo on 4/26/2016.
 */
exports = module.exports = function walkThrough( dir ) {
    var results = [];
    var list = fs.readdirSync( dir );
    var listLength = list.length;
    if (! listLength ) return results;
    for ( var file of list ) {
        file = path.resolve( dir, file);
        var stat = fs.statSync( file );
        if ( stat && stat.isDirectory()) {
            results = results.concat( walkThrough( file ) );
            if ( ! --listLength ) return results;
        } else {
            results.push( file );
            if ( ! --listLength ) return results;
        }
    }
};