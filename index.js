
// engineData is an array form descriptor.coffee

var MATCH_TYPE = [  hashStart,
                    hashEnd,
                    multiLineArrayStart,
                    multiLineArrayEnd,
                    property, 
                    propertyWithData];

var nodeStack = [], propertyStack = [];
var currentNode = [], currentProperty;

var paresr = function(engineData){
    //字符替换？
    textReg(textSegment(codeToString(engineData)));
    //分割
    //逐行正则
    console.log(currentNode[0])
}


function codeToString(engineData){
    return String.fromCharCode.apply(null, engineData);
}

function textSegment(text){
    return text.split('\n');
}

function textReg(textArr){
    textArr.map(function(currentText){
        matchTest(currentText.replace(/^\t+/g, ''));
    });
}

function matchTest(currentText){

    for (var currentType in MATCH_TYPE) {
        var t = new MATCH_TYPE[currentType](currentText);
        if (t.match){
            t.parse();
            return;
        }
    }
}

// helper fun
function Match(reg, text){
    return reg.test(text);
}
function isArray(o){
    return Object.prototype.toString.call(o) === '[object Array]';
}


// reg fun
function hashStart(text){
    var reg = /^<<$/;

    return {
        match: Match(reg, text),
        parse: function(){
            stackPush({});
        }
    }
}
function hashEnd(text){
    var reg = /^>>$/;

    return {
        match: Match(reg, text),
        parse: function(){
            updateNode();
        }
    }
}
function multiLineArrayStart(text){
    var reg = /^\/(\w+) \[$/;

    return {
        match: Match(reg, text),
        parse: function(){
            propertyStack.push(text.match(reg)[1]);
            stackPush([]);
        }
    }
}
function multiLineArrayEnd(text){
    var reg = /^\]$/;

    return {
        match: Match(reg, text),
        parse: function(){
            updateNode();
        }
    }
}
function property(text){
    var reg = /^\/([A-Z0-9]+)$/i;

    return {
        match: Match(reg, text),
        parse: function(){
            propertyStack.push(text.match(reg)[1]);
        }
    }
}
function propertyWithData(text){
    var reg = /^\/([A-Z0-9]+) (.*)$/i;

    return {
        match: Match(reg, text),
        parse: function(){
            var match = text.match(reg);
            pushKeyValue(match[1], match[2])
        }
    }
}

// node handle
function stackPush(node){
    nodeStack.push(currentNode);
    currentNode = node;
}
function updateNode(){
    var node = nodeStack.pop();
    if (isArray(node)){
        node.push(currentNode);
    } else {
        node[propertyStack.pop()] = currentNode;
    }
    currentNode = node;
}
function pushKeyValue(key,value){
    currentNode[key] = value;
}


module.exports = paresr;
