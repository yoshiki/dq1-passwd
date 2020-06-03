'use strict'

const consts = require('./constants.js');
const Status = require('./status.js');

function generate8bitCode(status) {
    let code = [];

    code.push(status.item2.index() << 4 | status.item1.index());
    code.push(status.uroko.index() << 7 | status.name2.index() << 1 | status.ring.index());
    code.push(status.exp >> 8 & 0xff);
    code.push(status.item6.index() << 4 | status.item5.index());
    code.push(status.key << 4 | status.herb);
    code.push(status.gold >> 8 & 0xff);
    code.push(status.weapon.index() << 5 | status.armor.index() << 2 | status.shield.index());
    code.push(status.checksum << 5 & 0x80 | status.oujyo.index() << 6 | status.name4.index());
    code.push(status.item8.index() << 4 | status.item7.index());
    code.push(status.name1.index() << 2 | status.gorem.index() << 1 | status.checksum >> 1 & 0x01);
    code.push(status.gold & 0xff);
    code.push(status.item4.index() << 4 | status.item3.index());
    code.push(status.checksum << 7 & 0x80 | status.death.index() << 6 | status.name3.index());
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
    let passwd = "";
    for (let i = 19; i >= 0; i--) {
        if (split && (i == 2 || i == 7 || i == 14)) {
            passwd += " ";
        }
        passwd += consts.kanaForPass[data[i]];
    }
    return passwd;
}

exports.encode = (status, split) => {
    const codeOf8bit = generate8bitCode(status);
    const codeOf6bit = convert8bitTo6Bit(codeOf8bit);
    return stringify(codeOf6bit, split);
};

function convertPasswdToCode(passwd) {
    const normalizedPasswd = passwd.replace(/ /g, "");
    let code = [];
    for (const c of normalizedPasswd.split('').reverse()) {
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
    const status = new Status(
        consts.nameCharValue[code[9] >> 2 & 0x3f], // name1
        consts.nameCharValue[code[1] >> 1 & 0x3f], // name2
        consts.nameCharValue[code[12] & 0x3f],     // name3
        consts.nameCharValue[code[7] & 0x3f],      // name4
        consts.itemValue[code[0] & 0x0f],          // item1
        consts.itemValue[code[0] >> 4 & 0x0f],     // item2
        consts.itemValue[code[11] & 0x0f],         // item3
        consts.itemValue[code[11] >> 4 & 0x0f],    // item4
        consts.itemValue[code[3] & 0x0f],          // item5
        consts.itemValue[code[3] >> 4 & 0x0f],     // item6
        consts.itemValue[code[8] & 0x0f],          // item7
        consts.itemValue[code[8] >> 4 & 0x0f],     // item8
        code[5] * 256 + code[10],                  // ゴールド
        code[2] * 256 + code[13],                  // けいけんち
        code[4] >> 4 & 0x0f,                       // 所持しているかぎの数
        code[4] & 0x0f,                            // 所持しているやくそうの数
        consts.weaponValue[code[6] >> 5 & 0x07],   // ぶき
        consts.armorValue[code[6] >> 2 & 0x07],    // よろい
        consts.shieldValue[code[6] & 0x03],        // たて
        ((code[1] >> 7 & 0x01) == 0),              // りゅうのうろこを身に付けたことがある
        ((code[7] >> 6 & 0x01) == 0),              // 王女を救出済
        ((code[9] >> 1 & 0x01) == 0),              // ゴーレムを討伐済
        ((code[1] & 0x01) == 0),                   // せんしのゆびわを装備してる
        ((code[12] >> 6 & 0x01) == 0),             // しのくびかざりを発見済
        code[7] >> 5 & 0x04 | code[9] << 1 & 0x02 | code[12] >> 7 & 0x01, // checksum
    );

    // Check password correctly
    if (code[14] != 0 || status.key > 6 || status.herb > 6) {
        return null;
    }
    
    return status;
}

exports.decode = (passwd) => {
    const passwdCode = convertPasswdToCode(passwd);
    const codeOf8bit = convert6BitTo8Bit(passwdCode);
    const status = generateStatus(codeOf8bit);
    return status;
};

// const status = new Status(
//     consts.nameChar.num0,       // 1st name char
//     consts.nameChar.num0,       // 2nd name char
//     consts.nameChar.num0,       // 3rd name char
//     consts.nameChar.num0,       // 4th name char
//     consts.item.nothing,        // 1st item
//     consts.item.nothing,        // 2nd item
//     consts.item.nothing,        // 3rd item
//     consts.item.nothing,        // 4th item
//     consts.item.nothing,        // 5th item
//     consts.item.nothing,        // 6th item
//     consts.item.nothing,        // 7th item
//     consts.item.nothing,        // 8th item
//     0,                          // 0-65535 ゴールド
//     65535,                      // 0-65535 けいけんち
//     1,                          // 0-6 所持しているかぎの数
//     1,                          // 0-6 所持しているやくそうの数
//     consts.weapon.lotoSword,    // ぶき
//     consts.armor.lotoArmor,     // よろい
//     consts.shield.silverShield, // たて
//     true,                       // りゅうのうろこを身に付けたことがある
//     true,                       // 王女を救出済
//     true,                       // ゴーレムを討伐済
//     true,                       // せんしのゆびわを装備してる
//     true,                       // しのくびかざりを発見済
//     1,                          // 0-7 チェックサム用
// );