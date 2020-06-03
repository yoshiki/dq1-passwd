# dq1-passwd

dq1-passwd allows you to encode/decode for dragon quest 1 password(ふっかつのじゅもん).

## Usage

### Encode(Status to password)
```
    const dq1Passwd = require('dq1-passwd.js');
    const Status = require('status.js');
    const consts = require('constants.js');

    const status = new Status(
        consts.nameChar.to,           // 1st name character
        consts.nameChar.nn,           // 2nd name character
        consts.nameChar.nu,           // 3rd name character
        consts.nameChar.ra,           // 4th name character
        consts.item.wings,            // 1st item
        consts.item.fairyWater,       // 2nd item
        consts.item.fairyWater,       // 3rd item
        consts.item.wings,            // 4th item
        consts.item.lotosToken,       // 5th item
        consts.item.lorasLove,        // 6th item
        consts.item.nallOfLight,      // 7th item
        consts.item.stonesOfSunlight, // 8th item
        1234,                         // 0-65535 ゴールド
        65535,                        // 0-65535 けいけんち
        2,                            // 0-6 所持しているかぎの数
        3,                            // 0-6 所持しているやくそうの数
        consts.weapon.lotoSword,      // ぶき
        consts.armor.lotoArmor,       // よろい
        consts.shield.silverShield,   // たて
        true,                         // りゅうのうろこを身に付けたことがある
        true,                         // 王女を救出済
        true,                         // ゴーレムを討伐済
        true,                         // せんしのゆびわを装備してる
        true,                         // しのくびかざりを発見済
        1,                            // 0-7 checksum
    );
    dq1Password.encode(status, true); // わわべろむ がぶまごぢぐざ でこぼゆり らむが
```

### Decode(Password to Status)
```
    const dq1Passwd = require('dq1-passwd.js');
    const Status = require('status.js');
    
    const passwd = 'しせむがも ぐぼむじでごず ばしいられ るもぐ';
    const status = dq1Passwd.decode(passwd);
```

## APIs

### encode(status, split)
`encode` function converts from a player's status to password.
`status` is an object of Status class that is a player's status. The Status class has following values.

| No | Value | Type |
|:---:|:---|:---|
| 1 | 1st name character | `nameChar` in constants.js |
| 2 | 2nd name character | `nameChar` in constants.js |
| 3 | 3rd name character | `nameChar` in constants.js |
| 4 | 4th name character | `nameChar` in constants.js |
| 5 | 1st item | `item` in constants.js |
| 6 | 2nd item | `item` in constants.js |
| 7 | 3rd item | `item` in constants.js |
| 8 | 4th item | `item` in constants.js |
| 9 | 5th item | `item` in constants.js |
| 10 | 6th item | `item` in constants.js |
| 11 | 7th item | `item` in constants.js |
| 12 | 8th item | `item` in constants.js |
| 13 | Gold ゴールド | Number (0-65535) |
| 14 | Experience けいけんち | Number (0-65535) |
| 15 | A number of key 所持しているかぎ | Number (0-6) |
| 16 | A number of herb 所持しているやくそう | Number (0-6) |
| 17 | Weapon ぶき | `weapon` in constants.js |
| 18 | Armor よろい | `armor` in constants.js |
| 19 | Shield たて | `shield` in constants.js |
| 20 | Equipped dragon scale | Boolean |
| 21 | Saved The Lady Lora | Boolean |
| 22 | Defeated The Gorem | Boolean |
| 23 | Equipped The Fighters ring | Boolean |
| 24 | Found out The cursed necklace | Boolean |
| 25 | Checksum | Number (0-7) |


`split` is a boolean value whether a password should be split into spaces for easy understanding.

If `split` is `true`, got `わわべろむ がぶまごぢぐざ でこぼゆり らむが`.  
If `split` is `false`, got `わわべろむがぶまごぢぐざでこぼゆりらむが`.


## Reference

### How to convert 8bit to 6bit
```
code[0-2] 8bit 11001100 11110000 01010101
↓
data[0-3] 6bit 110011 001111 000001 010101

code[0] 11001100 >> 2 & 0x3f(00111111) -> 00(110011) data[0]
code[0] 11001100 << 4 & 0x30(00110000) -> 11(00)0000 data[1]
code[1] 11110000 >> 4 & 0x0f(00001111) -> 0000(1111) data[1]
code[1] 11110000 << 2 & 0x3c(00111100) -> 11(0000)00 data[2]
code[2] 01010101 >> 6 & 0x03(00000011) -> 000000(01) data[2]
code[2] 01010101      & 0x3f(00111111) -> 01(010101) data[3]
```

### How to convert 6bit to 8bit
```
data[0-3] 6bit 110011 001111 000001 010101
↓
code[0-2] 8bit 11001100 11110000 01010101

data[0] 110011 << 2 & 0xfc(11111100) -> (110011)00 code[0]
data[1] 001111 >> 4 & 0x03(00000011) -> 0000(00)   code[0]
data[1] 001111 << 4 & 0xf0(11110000) -> (1111)0000 code[1]
data[2] 000001 >> 2 & 0x0f(00001111) -> 00(0000)   code[1]
data[2] 000001 << 6 & 0xc0(11000000) -> (01)000000 code[2]
data[3] 010101      & 0x3f(00111111) -> (010101)   code[2]
```