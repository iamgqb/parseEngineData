

// engineData is an array form descriptor.coffee

var MATCH_TYPE = [hashStart, hashEnd]

var paresr = function(engineData){
    //字符替换？
    console.log (textReg(textSegment(codeToString(engineData))));
    //分割
    //逐行正则
}


function codeToString(engineData){
    return String.fromCharCode.apply(null, engineData);
}

function textSegment(text){
    return text.split('\n');
}

function textReg(textArr){
    return textArr.map(function(currentText){
        return matchTest(currentText.replace(/^\t+/g, ''));
    }).join('\n');
}

function matchTest(currentText){

    for (var currentType in MATCH_TYPE) {
        var t = new MATCH_TYPE[currentType](currentText);
        if (t.match()){
            return t.parse();
        }
    }
    return currentText;
}

function hashStart(text){
    var reg = /^<<$/;
    var toStr = '{'

    return {
        match: function(){
            return reg.test(text);
        },
        parse: function(){
            return text.replace(reg, toStr);
        }
    }

}

function hashEnd(text){
    var reg = /^>>$/;
    var toStr = '}'

    return {
        match: function(){
            return reg.test(text);
        },
        parse: function(){
            return text.replace(reg, toStr);
        }
    }
    
}
module.exports = paresr;
