const dq1Passwd = require('../lib/dq1-passwd.js');
const Status = require('../lib/status.js');
const consts = require('../lib/constants.js');

test('encode status to password', () => {
    const status = new Status(
        consts.nameChar.to,
        consts.nameChar.nn,
        consts.nameChar.nu,
        consts.nameChar.ra,
        consts.item.wings,
        consts.item.fairyWater,
        consts.item.fairyWater,
        consts.item.wings,
        consts.item.lotosToken,
        consts.item.lorasLove,
        consts.item.nallOfLight,
        consts.item.stonesOfSunlight,
        1234,  // 0-65535 ゴールド
        65535, // 0-65535 けいけんち
        2,     // 0-6 所持しているかぎの数
        3,     // 0-6 所持しているやくそうの数
        consts.weapon.lotoSword,
        consts.armor.lotoArmor,
        consts.shield.silverShield,
        true,  // りゅうのうろこを身に付けたことがある
        true,  // 王女を救出済
        true,  // ゴーレムを討伐済
        true,  // せんしのゆびわを装備してる
        true,  // しのくびかざりを発見済
        1,     // 0-7 checksum
    );
    expect(dq1Passwd.encode(status, true)).toBe('わわべろむ がぶまごぢぐざ でこぼゆり らむが');
});

test('decode password to status', () => {
    const passwd = 'しせむがも ぐぼむじでごず ばしいられ るもぐ';
    const status = dq1Passwd.decode(passwd);
    expect(status.name1.value).toBe(consts.nameChar.to);
    expect(status.name2.value).toBe(consts.nameChar.nn);
    expect(status.name3.value).toBe(consts.nameChar.nu);
    expect(status.name4.value).toBe(consts.nameChar.ra);
    expect(status.item1.value).toBe(consts.item.wings);
    expect(status.item2.value).toBe(consts.item.fairyWater);
    expect(status.item3.value).toBe(consts.item.fairyWater);
    expect(status.item4.value).toBe(consts.item.wings);
    expect(status.item5.value).toBe(consts.item.lotosToken);
    expect(status.item6.value).toBe(consts.item.lorasLove);
    expect(status.item7.value).toBe(consts.item.nallOfLight);
    expect(status.item8.value).toBe(consts.item.stonesOfSunlight);
    expect(status.gold).toBe(1234);
    expect(status.exp).toBe(65535);
    expect(status.key).toBe(2);
    expect(status.herb).toBe(3);
    expect(status.weapon.value).toBe(consts.weapon.lotoSword);
    expect(status.armor.value).toBe(consts.armor.lotoArmor);
    expect(status.shield.value).toBe(consts.shield.silverShield);
    expect(status.uroko.value).toBeTruthy();
    expect(status.oujyo.value).toBeTruthy();
    expect(status.gorem.value).toBeTruthy();
    expect(status.ring.value).toBeTruthy();
    expect(status.death.value).toBeTruthy();
    expect(status.checksum).toBe(0);
});

test('decode password to status', () => {
    const passwd = 'きこへるま ろしがべかびぼ くねせじぞ ぜぐど';
    const status = dq1Passwd.decode(passwd);
    expect(status.name1.value).toBe(consts.nameChar.to);
    expect(status.name2.value).toBe(consts.nameChar.nn);
    expect(status.name3.value).toBe(consts.nameChar.nu);
    expect(status.name4.value).toBe(consts.nameChar.ra);
    expect(status.item1.value).toBe(consts.item.wings);
    expect(status.item2.value).toBe(consts.item.fairyWater);
    expect(status.item3.value).toBe(consts.item.fairyWater);
    expect(status.item4.value).toBe(consts.item.wings);
    expect(status.item5.value).toBe(consts.item.lotosToken);
    expect(status.item6.value).toBe(consts.item.lorasLove);
    expect(status.item7.value).toBe(consts.item.nallOfLight);
    expect(status.item8.value).toBe(consts.item.stonesOfSunlight);
    expect(status.gold).toBe(1234);
    expect(status.exp).toBe(65535);
    expect(status.key).toBe(2);
    expect(status.herb).toBe(3);
    expect(status.weapon.value).toBe(consts.weapon.lotoSword);
    expect(status.armor.value).toBe(consts.armor.lotoArmor);
    expect(status.shield.value).toBe(consts.shield.silverShield);
    expect(status.uroko.value).toBeTruthy();
    expect(status.oujyo.value).toBeTruthy();
    expect(status.gorem.value).toBeTruthy();
    expect(status.ring.value).toBeTruthy();
    expect(status.death.value).toBeTruthy();
    expect(status.checksum).toBe(2);
});

test('decode password to status', () => {
    const passwd = 'ばべつせえ たむいとひつな へがもくさ こえた';
    const status = dq1Passwd.decode(passwd);
    expect(status.name1.value).toBe(consts.nameChar.to);
    expect(status.name2.value).toBe(consts.nameChar.nn);
    expect(status.name3.value).toBe(consts.nameChar.nu);
    expect(status.name4.value).toBe(consts.nameChar.ra);
    expect(status.item1.value).toBe(consts.item.wings);
    expect(status.item2.value).toBe(consts.item.fairyWater);
    expect(status.item3.value).toBe(consts.item.fairyWater);
    expect(status.item4.value).toBe(consts.item.wings);
    expect(status.item5.value).toBe(consts.item.lotosToken);
    expect(status.item6.value).toBe(consts.item.lorasLove);
    expect(status.item7.value).toBe(consts.item.nallOfLight);
    expect(status.item8.value).toBe(consts.item.stonesOfSunlight);
    expect(status.gold).toBe(1234);
    expect(status.exp).toBe(65535);
    expect(status.key).toBe(2);
    expect(status.herb).toBe(3);
    expect(status.weapon.value).toBe(consts.weapon.lotoSword);
    expect(status.armor.value).toBe(consts.armor.lotoArmor);
    expect(status.shield.value).toBe(consts.shield.silverShield);
    expect(status.uroko.value).toBeTruthy();
    expect(status.oujyo.value).toBeTruthy();
    expect(status.gorem.value).toBeTruthy();
    expect(status.ring.value).toBeTruthy();
    expect(status.death.value).toBeFalsy();
    expect(status.checksum).toBe(1);
});