'use strict';

const nameChar = new Map([
    [ "num0", "０" ], [ "num1", "１" ], [ "num2", "２" ], [ "num3", "３" ], [ "num4", "４" ],
    [ "num5", "５" ], [ "num6", "６" ], [ "num7", "７" ], [ "num8", "８" ], [ "num9", "９" ],
    [ "a", "あ" ], [ "i", "い" ], [ "u", "う" ], [ "e", "え" ], [ "o", "お" ],
    [ "ka", "か" ], [ "ki", "き" ], [ "ku", "く" ], [ "ke", "け" ], [ "ko", "こ" ],
    [ "sa", "さ" ], [ "si", "し" ], [ "su", "す" ], [ "se", "せ" ], [ "so", "そ" ],
    [ "ta", "た" ], [ "ti", "ち" ], [ "tu", "つ" ], [ "te", "て" ], [ "to", "と" ],
    [ "na", "な" ], [ "ni", "に" ], [ "nu", "ぬ" ], [ "ne", "ね" ], [ "no", "の" ],
    [ "ha", "は" ], [ "hi", "ひ" ], [ "hu", "ふ" ], [ "he", "へ" ], [ "ho", "ほ" ],
    [ "ma", "ま" ], [ "mi", "み" ], [ "mu", "む" ], [ "me", "め" ], [ "mo", "も" ],
    [ "ya", "や" ], [ "yu", "ゆ" ], [ "yo", "よ" ],
    [ "ra", "ら" ], [ "ri", "り" ], [ "ru", "る" ], [ "re", "れ" ], [ "ro", "ろ" ],
    [ "wa", "わ" ], [ "wo", "を" ], [ "nn", "ん" ],
    [ "xtu", "っ" ], [ "xya", "ゃ" ], [ "xyu", "ゅ" ], [ "xyo", "ょ" ],
    [ "daku", "゛" ], [ "handaku", "゜" ], [ "hyphen", "−" ], [ "space", "　" ],
]);

const item = new Map([
    [ "nothing", "なし" ],
    [ "torch", "たいまつ" ], [ "fairyWater", "せいすい" ], [ "wings", "キメラのつばさ" ],
    [ "dragonScale", "りゅうのうろこ" ], [ "fairyFlute", "ようせいのふえ" ],
    [ "fightersRing", "せんしのゆびわ" ], [ "lotosToken", "ロトのしるし" ],
    [ "lorasLove", "おうじょのあい" ], [ "cursedBelt", "のろいのベルト" ],
    [ "silverHarp", "ぎんのたてごと" ], [ "cursedNecklace", "しのくびかざり" ],
    [ "stonesOfSunlight", "たいようのいし" ], [ "staffOfRain", "あまぐものつえ" ],
    [ "nallOfLight", "にじのしずく" ],
    [ "unknown", "不明" ],
]);

const weapon = new Map([
    [ "nothing", "なし" ], [ "nambooPole", "たけざお" ], [ "club", "こんぼう" ],
    [ "copperSword", "どうのつるぎ" ], [ "handAxe", "てつのおの" ],
    [ "broadSword", "はがねのつるぎ" ],[ "flameSword", "ほのおのつるぎ" ],
    [ "lotoSword", "ロトのつるぎ" ],
]);

const armor = new Map([
    [ "nothing", "なし" ],
    [ "clothes", "ぬののふく" ], [ "leatherArmor", "かわのふく" ],
    [ "chainMail", "くさりかたびら" ], [ "halfPlate", "てつのよろい" ],
    [ "fullPlate", "はがねのよろい" ], [ "magicArmor", "まほうのよろい" ],
    [ "lotoArmor", "ロトのよろい" ],
]);

const shield = new Map([
    [ "nothing", "なし" ],
    [ "smallShield", "かわのたて" ],
    [ "largeShield", "てつのたて" ],
    [ "silverShield", "みかがみのたて" ],
]);

module.exports = {
    magicCode: [
        0x88, 0xc4, 0x62, 0x31, 0x08, 0x84, 0x42, 0x21,
        0x98, 0xcc, 0xe6, 0x73, 0xa9, 0xc4, 0x62, 0x31,
        0x5a, 0xad, 0xc6, 0x63, 0xa1, 0xc0, 0x60, 0x30,
        0x38, 0x9c, 0x4e, 0xa7, 0xc3, 0xf1, 0x68, 0xb4,
        0xd0, 0x68, 0xb4, 0x5a, 0x2d, 0x06, 0x83, 0x51,
        0x20, 0x10, 0x08, 0x84, 0x42, 0xa1, 0x40, 0xa0,
        0xf9, 0xec, 0xf6, 0x7b, 0xad, 0xc6, 0xe3, 0x61,
        0x81, 0xd0, 0x68, 0xb4, 0xda, 0x6d, 0xa6, 0xd3,
        0xb2, 0xd9, 0xfc, 0xfe, 0xff, 0xef, 0x67, 0x23,
        0x34, 0x1a, 0x0d, 0x96, 0x4b, 0x35, 0x8a, 0x45,
        0xaa, 0xd5, 0x7a, 0x3d, 0x8e, 0x47, 0xb3, 0x49,
        0xa1, 0x40, 0xa0, 0x50, 0xa8, 0xd4, 0xea, 0x75,
        0xa0, 0xd0, 0x68, 0xb4, 0x5a, 0xad, 0xc6, 0x63,
        0x7e, 0xbf, 0xcf, 0xf7, 0x6b, 0xa5, 0xc2, 0x61
    ],
    kanaForPass: [
        "あ","い","う","え","お",
        "か","き","く","け","こ",
        "さ","し","す","せ","そ",
        "た","ち","つ","て","と",
        "な","に","ぬ","ね","の",
        "は","ひ","ふ","へ","ほ",
        "ま","み","む","め","も",
        "や","ゆ","よ",
        "ら","り","る","れ","ろ",
        "わ",
        "が","ぎ","ぐ","げ","ご",
        "ざ","じ","ず","ぜ","ぞ",
        "だ","ぢ","づ","で","ど",
        "ば","び","ぶ","べ","ぼ"
    ],
    nameChar: nameChar,
    nameCharValue: Array.from(nameChar.values()),
    item: item,
    itemValue: Array.from(item.values()),
    weapon: weapon,
    weaponValue: Array.from(weapon.values()),
    armor: armor,
    armorValue: Array.from(armor.values()),
    shield: shield,
    shieldValue: Array.from(shield.values()),
};