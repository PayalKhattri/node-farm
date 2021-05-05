module.exports = (temp,product) => {
    let res=temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    res=res.replace(/{%ID%}/g,product.id);
    res=res.replace(/{%IMAGE%}/g,product.image);
    res=res.replace(/{%FROM%}/g,product.from);
    res=res.replace(/{%NUTRIENTS%}/g,product.nutrients);
    res=res.replace(/{%QUANTITY%}/g,product.quantity);
    res=res.replace(/{%PRICE%}/g,product.price);

    if(!product.organic)
    res=res.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    res=res.replace(/{%DESCRIPTION%}/g,product.description);
    return res;

}