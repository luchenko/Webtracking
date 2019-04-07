//import mergeImg from 'merge-img';
const mergeImg = require('merge-img');
 
var fs = require('fs'),
request = require('request');
var text2png = require('text2png');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    //console.log('content-type:', res.headers['content-type']);
    //console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

var userID= 40413846;

var Productos = {
 p1: {
      'id':16488805,
      'sku':16488810,
      'description':'Zapatillas running Air Max Sequent 3',
      'image_url':'https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/FalabellaPE/16488810?$producto310$&wid=75&hei=75',
      'quantity':1
  },
  p2: {
    'id':16123491,
    'sku':16123503,
    'description':'Zapatillas de Running Energy Cloud 2 M',
    'image_url':'https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/FalabellaPE/16123503?$producto310$&wid=75&hei=75',
    'quantity':1
  }
};

doAllProductCards();

//Productos.p1["image_url"];
function getImageProduct(url,idCard,callback) {
  try {
    console.log('entro al catch');
    download(url, idCard+'.png', callback);
    doDescriptionProduct(idCard,Productos.p1.description,Productos.p1.quantity);
//    download(Productos.p2["image_url"], userID + '_' + Productos.p2['sku']+'.png', function(){console.log('done2'+Productos.p2['description']);});
 } 
 catch(err) { console.log(err);}
};



/*
var doAllDescriptionProducts = function () {
  try {
    console.log('entro al catch');
    doDescriptionProduct(userId+'_'+Productos.p1['sku'],Productos.p1.description,Pro.p1.qty);
    doDescriptionProduct(userId+'_'+Productos.p2['sku'],Productos.p2.description,Pro.p2.qty);
  } 
 catch(err) { console.log(err);}
};
*/
function doDescriptionProduct(idCard,Title,qty) {
  try 
  {
  //console.log('doDescriptionProduct');  
  fs.writeFileSync(__dirname + '/'+idCard +'_1_1.png', text2png(Title,{ font: '12px Arial',color:'black', bgColor: '#ffffff',padding:2}));
  fs.writeFileSync(__dirname + '/'+idCard +'_2_1.png', text2png('Unidades: '+qty,{ font: '12px Arial',color:'#666666', bgColor: '#ffffff',padding:2}));
  } catch(err) {console.log(err)};
  
};
/*
var doAllSectionProducts = function()
{
  getImgProduct();
  doDescriptionProduct(function(){console.log('done1'+Productos.p1['description']);});
  //doAllDescriptionProducts();
}

var doAllMergeProducts = function()
{
  getImgProducts();
  doAllDescriptionProducts();
}
*/

var doMergeProduct = function(iditem,idCard)
{
  //console.log('..domergeProduct');
  try{ 
  mergeImg([__dirname + '/'+idCard +'_1_1.png',
            __dirname + '/'+idCard +'_2_1.png'], 
            {align:'left',direction : true})
      .then((img) => { img.write(__dirname + '/'+idCard +'_3_1.png',
            ()=>mergeImg([__dirname + '/src/img/padding.png',
                          __dirname + '/'+idCard+'.png',
                          __dirname + '/'+idCard +'_3_1.png'], 
                          {align:'left',direction : false})
                    .then((img) => { img.write(__dirname + '/20'+iditem+'_'+idCard +'.png', () => console.log('done'));}));});
 
  } catch(err) { console.log(err);};
}

var mergeAll = function (){
      mergeImg([__dirname + '/out100.png',
      __dirname +  '/out201.png', 
      __dirname +  '/out202.png',   
      __dirname +  '/out203.png', 
      __dirname +  '/src/img/estado.png',                                         
      __dirname +  '/src/img/image300.png',
      __dirname +  '/out400.png'],
      {align:'left',direction : true,color:0xFFFFFFFF}).then((img) => { img.write('out0.png', () => console.log('done'));});
};

async function doAllProductCards() {
  try {
   //await doAllSectionProducts();
   var idCard = userID+'_'+Productos.p1.sku;
   var idCard2 = userID+'_'+Productos.p2.sku;
   await getImageProduct(Productos.p1["image_url"],idCard,() => doMergeProduct(1,idCard));
   await getImageProduct(Productos.p2["image_url"],idCard2,() => doMergeProduct(2,idCard2));
   //await getImageDate();
   mergeAll();
  } catch(err) {console.log(err)};

};


 /*
mergeImg([__dirname + '/src/img/image201.png',__dirname +  '/src/img/image202.png',__dirname +  '/src/img/image203.png'])
  .then((img) => {
    // Save image as file
    img.write('out200.png', () => console.log('done'));
  }); 

  mergeImg([__dirname + '/out200.png',__dirname +  '/src/img/image300.png'], {align:'center',direction : true})
  .then((img) => {
    // Save image as file
    img.write('outfinal.png', () => console.log('done'));
  });
*/
var fs = require('fs');

fs.writeFileSync('out101.png', text2png('N° Despacho : 125433551228',{ font: '16px Arial',color:'black', bgColor: '#ffffff',padding:20}));
mergeImg([__dirname + '/out101.png',__dirname +  '/src/img/separador.png'], {align:'left',direction : true,color:0xFFFFFFFF}).then((img) => { img.write('out100.png', () => console.log('done'));});
/*
fs.writeFileSync('out2031_1.png', text2png('Hervidor Eléctrico 1,7 lt Silver',{ font: '12px Arial',color:'black', bgColor: '#ffffff',padding:2}));
fs.writeFileSync('out2032_1.png', text2png('Unidades: 1',{ font: '12px Arial',color:'#666666', bgColor: '#ffffff',padding:2}));
mergeImg([__dirname + '/out2031_1.png',__dirname +  '/out2032_1.png'], {align:'left',direction : true}).then((img) => { img.write('out203_1.png', () => console.log('done'));});
mergeImg([__dirname + '/src/img/padding.png',__dirname + '/src/img/Image201.png',__dirname +  '/out203_1.png'], {align:'left',direction : false}).then((img) => { img.write('out201.png', () => console.log('done'));});

fs.writeFileSync('out2031_2.png', text2png('Cocina sindelen ch54 Mod:755s',{ font: '12px Arial',color:'black', bgColor: '#ffffff',padding:2}));
fs.writeFileSync('out2032_2.png', text2png('Unidades: 1',{ font: '12px Arial',color:'#666666', bgColor: '#ffffff',padding:2}));
mergeImg([__dirname + '/out2031_2.png',__dirname +  '/out2032_2.png'], {align:'left',direction : true}).then((img) => { img.write('out203_2.png', () => console.log('done'));});
mergeImg([__dirname + '/src/img/padding.png',__dirname + '/src/img/Image202.png',__dirname +  '/out203_2.png'], {align:'left',direction : false}).then((img) => { img.write('out202.png', () => console.log('done'));});

fs.writeFileSync('out2031_3.png', text2png('Lampara escritorio modelo:rústico',{ font: '12px Arial',color:'black', bgColor: '#ffffff',padding:2}));
fs.writeFileSync('out2032_3.png', text2png('Unidades: 3',{ font: '12px Arial',color:'#666666', bgColor: '#ffffff',padding:2}));
mergeImg([__dirname + '/out2031_3.png',__dirname +  '/out2032_3.png'], {align:'left',direction : true}).then((img) => { img.write('out203_3.png', () => console.log('done'));});
mergeImg([__dirname + '/src/img/padding.png',__dirname + '/src/img/Image203.png',__dirname +  '/out203_3.png'], {align:'left',direction : false}).then((img) => { img.write('out203.png', () => console.log('done'));});

fs.writeFileSync('out2041_0.png', text2png('02/03',{ font: '12px Arial',color:'#555555', bgColor: '#FFFFFF',padding:2,paddingLeft: 15}));
fs.writeFileSync('out2042_0.png', text2png('04/03',{ font: '12px Arial',color:'#555555', bgColor: '#FFFFFF',padding:2,paddingLeft:73}));
fs.writeFileSync('out2043_1.png', text2png('05/03',{ font: '12px Arial',color:'#000000', bgColor: '#FFFFFF',padding:2,paddingLeft:73}));
fs.writeFileSync('out2044_0.png', text2png('06/03',{ font: '12px Arial',color:'#555555', bgColor: '#FFFFFF',padding:2,paddingLeft:73}));

mergeImg([__dirname + '/out2041_0.png',__dirname + '/out2042_0.png',__dirname +  '/out2043_1.png',__dirname +  '/out2044_0.png'], {align:'left',direction : false}).then((img) => { img.write('out400.png', () => console.log('done'));});

mergeImg([__dirname + '/out100.png',
          __dirname +  '/out201.png', 
          __dirname +  '/out202.png',   
          __dirname +  '/out203.png', 
          __dirname +  '/src/img/estado.png',                                         
          __dirname +  '/src/img/image300.png',
          __dirname +  '/out400.png'],
          {align:'left',direction : true,color:0xFFFFFFFF}).then((img) => { img.write('out0.png', () => console.log('done'));});
*/