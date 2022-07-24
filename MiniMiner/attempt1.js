import axios from 'axios';
import { checkPrime } from 'crypto';
import { sha256, sha224 } from 'js-sha256';

var url = "https://hackattic.com/challenges/mini_miner/problem?access_token=99ad6fa897e453f5"


var objec = {
    difficulty: 8,
    block: { nonce: null, data: [] }
  };

// console.log(sha256('{"data":[],"nonce":45}'))

// console.log(parseInt("0b",16))

const check = (digest, difficulty) => {
    // console.log(digest)
    var quotient = difficulty/8;
    var remainder = difficulty%8;
    
    var substr_digest;
    if(remainder) substr_digest = digest.substring(0,quotient+1)
    else substr_digest = digest.substring(0,quotient)
    
    if(parseInt(substr_digest,16) != 0) return false
    else return true;

    // if(remainder!=0){
    //     var hex = digest[quotient];
    //     var bin = parseInt(hex,16).toString(2);
    //     if(parseInt(bin.substring(0,remainder)) != 0) return false;
    //     else return true;


    // }else return true
}



const solve = (data) => {
    console.log(data)
    // console.log(data.block)

    var diff = data.difficulty;
    var block = data.block;
    var nonce = -1;

    while(true){
        
        //if digest satisfies the criteria, break with the current nonce
        if(check(sha256(JSON.stringify(block, Object.keys(block).sort())), diff)){
            break;
        }
        //else
        nonce++;
        console.log(nonce)
        block.nonce = nonce;


    }

    
    console.log(nonce);
    // console.log(block)
    console.log(JSON.stringify(block, Object.keys(block).sort()))
    var solution = {
        nonce: nonce
    }
    axios.post("https://hackattic.com/challenges/mini_miner/solve?access_token=99ad6fa897e453f5",solution)
        .then(res => console.log(res.data))
}

// solve(objec)

axios.get(url)
    .then(res => solve(res.data));
