const fs=require('fs')
const http=require('http')
const url=require('url')
const replaceTemplate=require('./modules/replaceTemplate');
// const tin=fs.readFileSync('./txt/input.txt','utf-8')
// console.log(tin)
// const tout=`${tin}`
// fs.writeFileSync('./txt/output.txt',tout)
// fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
// fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//     console.log(data2);
// });
// });
// console.log('test')



const templateCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const templateOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const templateProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(data);


const server=http.createServer((req,res) => {
    
    
    const {query,pathname}=url.parse(req.url,true);


    if(pathname==='/' || pathname==='/overview'){
        res.writeHead(200,{
            'contentType':'text/html'
        });
        const cardsHtml= dataObj.map(el => replaceTemplate(templateCard,el)).join('');
        const result=templateOverview.replace('{%CARD%}',cardsHtml);


        res.end(result);
    }
    else if(pathname === '/product'){
        res.writeHead(200,{
            'contentType':'text/html'
        });
        const product=dataObj[query.id];
        const result=replaceTemplate(templateProduct,product);
        res.end(result);
    }
    else if(pathname=== '/api')
    {
        res.writeHead(200,{'contentType':'application/json'});
        res.end(data);

    }
    else{
        res.writeHead(400,{
            'Content-type':'text/html'
        })
        res.end('<h1>Path not found</h1>');
    }
})

server.listen(8000,'127.0.0.1',()=>{
    console.log('started');
})