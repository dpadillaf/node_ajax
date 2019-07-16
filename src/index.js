const express = require( 'express' );
const morgan = require( 'morgan' );
const path = require( 'path' );

const app = express();

//database
const products = [
    {
        id: 1,
        name: 'TV'
    },
    {
        id: 2,
        name: 'PC'
    },
    {
        id: 3,
        name: 'Celphone'
    }
];

//settings
app.set( 'port', process.env.PORT || 3000 );

//middlewares
app.use( morgan( 'dev' ) );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );

//routes
app.get( '/products', ( req, res ) => {
    res.json( products );
} );

app.post( '/products', ( req, res ) => {
    const { name } = req.body;
    products.push( {
        id: products.length + 1,
        name: name
    } );
    res.send( 'Agregado :)' );
} );

app.put( '/products/:id', ( req, res ) => {
    const { id } = req.params;
    const { name } = req.body;

    products.forEach( (product, i) => {
        if ( product.id == id ){
            product.name = name;
        }
    } );
    res.send( 'Actualizado' );
} );

app.delete( '/products/:id', ( req, res ) => {
    const { id } = req.params;

    products.forEach( (product, i) => {
        if ( product.id == id ){
            products.splice( i, 1 );
        }
    } );
    res.send( 'Borrado' );
} );

//statics files
app.use( express.static( path.join( __dirname, 'public' ) ) );

//server
app.listen( app.get( 'port' ), () => {
    console.log( `Server on port ${ app.get( 'port' ) }` );
} );