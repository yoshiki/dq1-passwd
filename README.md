# dq1-password

dq1-password allows you to encode/decode for dragon quest 1 password(ふっかつのじゅもん).

## Usage

### Encode(Status to password)
```
const dq1pw = require('dq1-password');

const pw = dq1pw.encodeStatus({
    name1: dq1pw.constants.nameChar.get("to"),
    name2: dq1pw.constants.nameChar.get("nn"),
    name3: dq1pw.constants.nameChar.get("nu"),
    name4: dq1pw.constants.nameChar.get("ra"),
    item1: dq1pw.constants.item.get("wings"),
    item2: dq1pw.constants.item.get("fairyWater"),
    item3: dq1pw.constants.item.get("fairyWater"),
    item4: dq1pw.constants.item.get("wings"),
    item5: dq1pw.constants.item.get("lotosToken"),
    item6: dq1pw.constants.item.get("lorasLove"),
    item7: dq1pw.constants.item.get("nallOfLight"),
    item8: dq1pw.constants.item.get("stonesOfSunlight"),
    gold: 1234,
    exp: 65535,
    key: 2,
    herb: 3,
    weapon: dq1pw.constants.weapon.get("lotoSword"),
    armor: dq1pw.constants.armor.get("lotoArmor"),
    shield: dq1pw.constants.shield.get("silverShield"),
    uroko: true,
    oujyo: true,
    gorem: true,
    ring: true,
    death: true,
    checksum: 1,
}, true);
console.log(pw); // わわべろむ がぶまごぢぐざ でこぼゆり らむが


```

### Decode(Password to Status)
```
const dq1pw = require('dq1-password');

const status = dq1pw.decodePassword('わわべろむ がぶまごぢぐざ でこぼゆり らむが');
console.log(status);
```

## APIs

### encodeStatus({ status }, split)
`encodeStatus` function converts from a player's status to password.
`status` is a player's status object(key/value pair).  
`status` object includes values as follow.

| Key | Value | Type |
|:---:|:---|:---|
| name1 | 1st name character | `nameChar` in `constants` |
| name2 | 2nd name character | `nameChar` in `constants` |
| name3 | 3rd name character | `nameChar` in `constants` |
| name4 | 4th name character | `nameChar` in `constants` |
| item1 | 1st item | `item` in `constants` |
| item2 | 2nd item | `item` in `constants` |
| item3 | 3rd item | `item` in `constants` |
| item4 | 4th item | `item` in `constants` |
| item5 | 5th item | `item` in `constants` |
| item6 | 6th item | `item` in `constants` |
| item7 | 7th item | `item` in `constants` |
| item8 | 8th item | `item` in `constants` |
| gold | Gold ゴールド | Number (0-65535) |
| exp | Experience けいけんち | Number (0-65535) |
| key | A number of key 所持しているかぎ | Number (0-6) |
| herb | A number of herb 所持しているやくそう | Number (0-6) |
| weapon | Weapon ぶき | `weapon` in `constants` |
| armor | Armor よろい | `armor` in `constants` |
| shield | Shield たて | `shield` in `constants` |
| uroko | Equipped dragon scale | Boolean |
| oujyo | Saved The Lady Lora | Boolean |
| gorem | Defeated The Gorem | Boolean |
| ring | Equipped The Fighters ring | Boolean |
| death | Found out The cursed necklace | Boolean |
| checksum | Checksum | Number (0-7) |


`split` is a boolean value whether a password should be split into spaces for easy understanding.

If `split` is `true`, got `わわべろむ がぶまごぢぐざ でこぼゆり らむが`.  
If `split` is `false`, got `わわべろむがぶまごぢぐざでこぼゆりらむが`.

### decodePassword(password)

`decode` function converts from a password to a player's status.  
This function returns a instance of player's status object.

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