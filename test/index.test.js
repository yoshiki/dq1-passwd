const dq1pw = require('../lib/dq1-password.js');
const consts = require('../lib/constants.js');

test('encode status to password', () => {
    const pw = dq1pw.encodeStatus({
        name1: consts.nameChar.get("to"),           // 1st name
        name2: consts.nameChar.get("nn"),           // 2nd name
        name3: consts.nameChar.get("nu"),           // 3rd name
        name4: consts.nameChar.get("ra"),           // 4th name
        item1: consts.item.get("wings"),            // 1st item
        item2: consts.item.get("fairyWater"),       // 2nd item
        item3: consts.item.get("fairyWater"),       // 3rd item
        item4: consts.item.get("wings"),            // 4th item
        item5: consts.item.get("lotosToken"),       // 5th item
        item6: consts.item.get("lorasLove"),        // 6th item
        item7: consts.item.get("nallOfLight"),      // 7th item
        item8: consts.item.get("stonesOfSunlight"), // 8th item
        gold: 1234,                                 // 0-65535 ゴールド
        exp: 65535,                                 // 0-65535 けいけんち
        key: 2,                                     // 0-6 所持しているかぎの数
        herb: 3,                                    // 0-6 所持しているやくそうの数
        weapon: consts.weapon.get("lotoSword"),     // ぶき
        armor: consts.armor.get("lotoArmor"),       // よろい
        shield: consts.shield.get("silverShield"),  // たて
        uroko: true,                                // りゅうのうろこを身に付けたことがある
        oujyo: true,                                // 王女を救出済
        gorem: true,                                // ゴーレムを討伐済
        ring: true,                                 // せんしのゆびわを装備してる
        death: true,                                // しのくびかざりを発見済
        checksum: 1,                                // 0-7 checksum
    });
    expect(pw).toBe('わわべろむがぶまごぢぐざでこぼゆりらむが');
});

test('encode status to password splitted', () => {
    const pw = dq1pw.encodeStatus({
        name1: consts.nameChar.get("to"),
        name2: consts.nameChar.get("nn"),
        name3: consts.nameChar.get("nu"),
        name4: consts.nameChar.get("ra"),
        item1: consts.item.get("wings"),
        item2: consts.item.get("fairyWater"),
        item3: consts.item.get("fairyWater"),
        item4: consts.item.get("wings"),
        item5: consts.item.get("lotosToken"),
        item6: consts.item.get("lorasLove"),
        item7: consts.item.get("nallOfLight"),
        item8: consts.item.get("stonesOfSunlight"),
        gold: 1234,
        exp: 65535,
        key: 2,
        herb: 3,
        weapon: consts.weapon.get("lotoSword"),
        armor: consts.armor.get("lotoArmor"),
        shield: consts.shield.get("silverShield"),
        uroko: true,
        oujyo: true,
        gorem: true,
        ring: true,
        death: true,
        checksum: 1,
    }, true); // split
    expect(pw).toBe('わわべろむ がぶまごぢぐざ でこぼゆり らむが');
});

test('decode password to status', () => {
    const pw = 'しせむがも ぐぼむじでごず ばしいられ るもぐ';
    const status = dq1pw.decodePassword(pw);
    expect(status["name1"]).toBe(consts.nameChar.get("to"));
    expect(status["name2"]).toBe(consts.nameChar.get("nn"));
    expect(status["name3"]).toBe(consts.nameChar.get("nu"));
    expect(status["name4"]).toBe(consts.nameChar.get("ra"));
    expect(status["item1"]).toBe(consts.item.get("wings"));
    expect(status["item2"]).toBe(consts.item.get("fairyWater"));
    expect(status["item3"]).toBe(consts.item.get("fairyWater"));
    expect(status["item4"]).toBe(consts.item.get("wings"));
    expect(status["item5"]).toBe(consts.item.get("lotosToken"));
    expect(status["item6"]).toBe(consts.item.get("lorasLove"));
    expect(status["item7"]).toBe(consts.item.get("nallOfLight"));
    expect(status["item8"]).toBe(consts.item.get("stonesOfSunlight"));
    expect(status["gold"]).toBe(1234);
    expect(status["exp"]).toBe(65535);
    expect(status["key"]).toBe(2);
    expect(status["herb"]).toBe(3);
    expect(status["weapon"]).toBe(consts.weapon.get("lotoSword"));
    expect(status["armor"]).toBe(consts.armor.get("lotoArmor"));
    expect(status["shield"]).toBe(consts.shield.get("silverShield"));
    expect(status["uroko"]).toBeTruthy();
    expect(status["oujyo"]).toBeTruthy();
    expect(status["gorem"]).toBeTruthy();
    expect(status["ring"]).toBeTruthy();
    expect(status["death"]).toBeTruthy();
    expect(status["checksum"]).toBe(0);
});

test('decode password to status', () => {
    const pw = 'きこへるま ろしがべかびぼ くねせじぞ ぜぐど';
    const status = dq1pw.decodePassword(pw);
    expect(status["name1"]).toBe(consts.nameChar.get("to"));
    expect(status["name2"]).toBe(consts.nameChar.get("nn"));
    expect(status["name3"]).toBe(consts.nameChar.get("nu"));
    expect(status["name4"]).toBe(consts.nameChar.get("ra"));
    expect(status["item1"]).toBe(consts.item.get("wings"));
    expect(status["item2"]).toBe(consts.item.get("fairyWater"));
    expect(status["item3"]).toBe(consts.item.get("fairyWater"));
    expect(status["item4"]).toBe(consts.item.get("wings"));
    expect(status["item5"]).toBe(consts.item.get("lotosToken"));
    expect(status["item6"]).toBe(consts.item.get("lorasLove"));
    expect(status["item7"]).toBe(consts.item.get("nallOfLight"));
    expect(status["item8"]).toBe(consts.item.get("stonesOfSunlight"));
    expect(status["gold"]).toBe(1234);
    expect(status["exp"]).toBe(65535);
    expect(status["key"]).toBe(2);
    expect(status["herb"]).toBe(3);
    expect(status["weapon"]).toBe(consts.weapon.get("lotoSword"));
    expect(status["armor"]).toBe(consts.armor.get("lotoArmor"));
    expect(status["shield"]).toBe(consts.shield.get("silverShield"));
    expect(status["uroko"]).toBeTruthy();
    expect(status["oujyo"]).toBeTruthy();
    expect(status["gorem"]).toBeTruthy();
    expect(status["ring"]).toBeTruthy();
    expect(status["death"]).toBeTruthy();
    expect(status["checksum"]).toBe(2);
});

test('decode password to status', () => {
    const pw = 'ばべつせえ たむいとひつな へがもくさ こえた';
    const status = dq1pw.decodePassword(pw);
    expect(status["name1"]).toBe(consts.nameChar.get("to"));
    expect(status["name2"]).toBe(consts.nameChar.get("nn"));
    expect(status["name3"]).toBe(consts.nameChar.get("nu"));
    expect(status["name4"]).toBe(consts.nameChar.get("ra"));
    expect(status["item1"]).toBe(consts.item.get("wings"));
    expect(status["item2"]).toBe(consts.item.get("fairyWater"));
    expect(status["item3"]).toBe(consts.item.get("fairyWater"));
    expect(status["item4"]).toBe(consts.item.get("wings"));
    expect(status["item5"]).toBe(consts.item.get("lotosToken"));
    expect(status["item6"]).toBe(consts.item.get("lorasLove"));
    expect(status["item7"]).toBe(consts.item.get("nallOfLight"));
    expect(status["item8"]).toBe(consts.item.get("stonesOfSunlight"));
    expect(status["gold"]).toBe(1234);
    expect(status["exp"]).toBe(65535);
    expect(status["key"]).toBe(2);
    expect(status["herb"]).toBe(3);
    expect(status["weapon"]).toBe(consts.weapon.get("lotoSword"));
    expect(status["armor"]).toBe(consts.armor.get("lotoArmor"));
    expect(status["shield"]).toBe(consts.shield.get("silverShield"));
    expect(status["uroko"]).toBeTruthy();
    expect(status["oujyo"]).toBeTruthy();
    expect(status["gorem"]).toBeTruthy();
    expect(status["ring"]).toBeTruthy();
    expect(status["death"]).toBeFalsy();
    expect(status["checksum"]).toBe(1);
});