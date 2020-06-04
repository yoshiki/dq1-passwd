'use strict'

const consts = require('./constants.js');

function generate8bitCode(status) {
    let code = [];
    const nameIndexOf = (value) => consts.nameCharValue.indexOf(value);
    const itemIndexOf = (value) => consts.itemValue.indexOf(value);
    const weaponIndexOf = (value) => consts.weaponValue.indexOf(value);
    const armorIndexOf = (value) => consts.armorValue.indexOf(value);
    const shieldIndexOf = (value) => consts.shieldValue.indexOf(value);
    const boolIndexOf = (value) => [ true, false ].indexOf(value);

    code.push(itemIndexOf(status.item2) << 4
              | itemIndexOf(status.item1));
    code.push(boolIndexOf(status.uroko) << 7
              | nameIndexOf(status.name2) << 1
              | boolIndexOf(status.ring));
    code.push(status.exp >> 8 & 0xff);
    code.push(itemIndexOf(status.item6) << 4
              | itemIndexOf(status.item5));
    code.push(status.key << 4 | status.herb);
    code.push(status.gold >> 8 & 0xff);
    code.push(weaponIndexOf(status.weapon) << 5
              | armorIndexOf(status.armor) << 2
              | shieldIndexOf(status.shield));
    code.push(status.checksum << 5 & 0x80
              | boolIndexOf(status.oujyo) << 6
              | nameIndexOf(status.name4));
    code.push(itemIndexOf(status.item8) << 4
              | itemIndexOf(status.item7));
    code.push(nameIndexOf(status.name1) << 2
              | boolIndexOf(status.gorem) << 1
              | status.checksum >> 1 & 0x01);
    code.push(status.gold & 0xff);
    code.push(itemIndexOf(status.item4) << 4
              | itemIndexOf(status.item3));
    code.push(status.checksum << 7 & 0x80
              | boolIndexOf(status.death) << 6
              | nameIndexOf(status.name3));
    code.push(status.exp & 0xff);
    code.push(0);
    
    // Calcurate check code
    for (let i = 0; i <= 13; i++) {
        let wc = code[i];
        for (let j = 0; j <= 7; j++) {
            if ((wc & 0x80) != 0) {
                code[14] ^= consts.magicCode[(i << 3) + j];
            }
            wc <<= 1;
        }
    }

    return code;
}

function convert8bitTo6Bit(code) {
    let data = [];
    let k = 0;
    for (let i = 0; i <= 14; i++) {
        if (i % 3 == 0) {
            data[k] = code[i] >> 2 & 0x3f;
            k += 1;
            data[k] = code[i] << 4 & 0x30;
        } else if (i % 3 == 1) {
            data[k] |= code[i] >> 4 & 0x0f;
            k += 1;
            data[k] = code[i] << 2 & 0x3c;
        } else if (i % 3 == 2) {
            data[k] |= code[i] >> 6 & 0x03;
            k += 1;
            data[k] = code[i] & 0x3f;
            k += 1;
        }
    }

    let work = 0;
    for (let i = 19; i >= 0; i--) {
        data[i] = (data[i] + work + 4) & 0x3f;
        work = data[i];
    }

    return data;
}

function stringify(data, split) {
    let pw = "";
    for (let i = 19; i >= 0; i--) {
        if (split && (i == 2 || i == 7 || i == 14)) {
            pw += " ";
        }
        pw += consts.kanaForPass[data[i]];
    }
    return pw;
}

exports.encodeStatus = (status, split = false) => {
    const code = generate8bitCode(status);
    const data = convert8bitTo6Bit(code);
    return stringify(data, split);
};

function convertPwToCode(pw) {
    const normalizedPw = pw.replace(/ /g, "");
    let code = [];
    for (const c of normalizedPw.split('').reverse()) {
        code.push(consts.kanaForPass.indexOf(c));
    }
    return code;
}

function convert6BitTo8Bit(data) {
    for (let i = 0; i < 19; i++) {
        data[i] = (data[i] - data[i+1] - 4) & 0x3f;
    }
    data[19] = (data[19] - 4) & 0x3f;

    // Convert 6bit to 8bit
    let code = [];
    let k = 0;
    for (let i = 0; i <= 19; i++) {
        if (i % 4 == 0) {
            code[k] = data[i] << 2 & 0xfc;
        } else if (i % 4 == 1) {
            code[k] |= data[i] >> 4 & 0x03;
            k++;
            code[k] = data[i] << 4 & 0xf0;
        } else if (i % 4 == 2) {
            code[k] |= data[i] >> 2 & 0x0f;
            k++;
            code[k] = data[i] << 6 & 0xc0;
        } else if (i % 4 == 3) {
            code[k] |= data[i] & 0x3f;
            k++;
        }
    }

    // Calcurate check code
    for (let i = 0; i <= 13; i++) {
        let wc = code[i];
        for (let j = 0; j <= 7; j++) {
            if ((wc & 0x80) != 0) {
                code[14] ^= consts.magicCode[(i << 3) + j];
            }
            wc <<= 1;
        }
    }

    return code;
}

function generateStatus(code) {
    const status = {
        name1: consts.nameCharValue[code[9] >> 2 & 0x3f],
        name2: consts.nameCharValue[code[1] >> 1 & 0x3f],
        name3: consts.nameCharValue[code[12] & 0x3f],
        name4: consts.nameCharValue[code[7] & 0x3f],
        item1: consts.itemValue[code[0] & 0x0f],
        item2: consts.itemValue[code[0] >> 4 & 0x0f],
        item3: consts.itemValue[code[11] & 0x0f],
        item4: consts.itemValue[code[11] >> 4 & 0x0f],
        item5: consts.itemValue[code[3] & 0x0f],
        item6: consts.itemValue[code[3] >> 4 & 0x0f],
        item7: consts.itemValue[code[8] & 0x0f],
        item8: consts.itemValue[code[8] >> 4 & 0x0f],
        gold: code[5] * 256 + code[10],
        exp: code[2] * 256 + code[13],
        key: code[4] >> 4 & 0x0f,
        herb: code[4] & 0x0f,
        weapon: consts.weaponValue[code[6] >> 5 & 0x07],
        armor: consts.armorValue[code[6] >> 2 & 0x07],
        shield: consts.shieldValue[code[6] & 0x03],
        uroko: ((code[1] >> 7 & 0x01) == 0),
        oujyo: ((code[7] >> 6 & 0x01) == 0),
        gorem: ((code[9] >> 1 & 0x01) == 0),
        ring: ((code[1] & 0x01) == 0),
        death: ((code[12] >> 6 & 0x01) == 0),
        checksum: code[7] >> 5 & 0x04 | code[9] << 1 & 0x02 | code[12] >> 7 & 0x01,
    };

    // Check password correctly
    if (code[14] != 0 || status["key"] > 6 || status["herb"] > 6) {
        return null;
    }
    
    return status;
}

exports.decodePassword = (pw) => {
    const pwCode = convertPwToCode(pw);
    const codeOf8bit = convert6BitTo8Bit(pwCode);
    const status = generateStatus(codeOf8bit);
    return status;
};

exports.constants = consts;
