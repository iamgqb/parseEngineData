

// engineData is an array form descriptor.coffee

var MATCH_TYPE = [hashStart]

var paresr = function(engineData){
    //字符替换？
    textReg(textSegment(codeToString(engineData)));
    //分割
    //逐行正则
}


function codeToString(engineData){
    return String.fromCharCode.apply(null, engineData);
}

function textSegment(text){
    console.log(text.split('\n'))
    return text.split('\n');
}

function textReg(textArr){
    textArr.map(function(currentText){
        matchTest(currentText.replace(/^\t+/g, ''));
    })
}

function matchTest(currentText){
    MATCH_TYPE.forEach(function(currentType){
        var t = new currentType(currentText);
        if (t.match()){
            t.parse();
            // break;
        }
    })
}

function hashStart(text){
    var reg = /^<<$/;

    return {
        match: function(){
            return reg.test(text);
        },
        parse: function(){
            console.log(text)
        }
    }

}
module.exports = paresr;
