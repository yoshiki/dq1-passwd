'use strict'

const consts = require('./constants.js');

class StatusValue {
    constructor(value, values) {
        this.value = value;
        this.values = values;
    }

    index() {
        return this.values.indexOf(this.value);
    }
}

class StatusBool extends StatusValue {
    constructor(value) {
        const values = [ true, false ];
        super(value, values);
    }
}

class Status {
    constructor(
        name1, name2, name3, name4,
        item1, item2, item3, item4, item5, item6, item7, item8,
        gold, exp, key, herb, weapon, armor, shield,
        uroko, oujyo, gorem, ring, death,
        checksum,
    ) {
        this.name1 = new StatusValue(name1, consts.nameCharValue);
        this.name2 = new StatusValue(name2, consts.nameCharValue);
        this.name3 = new StatusValue(name3, consts.nameCharValue);
        this.name4 = new StatusValue(name4, consts.nameCharValue);
        this.item1 = new StatusValue(item1, consts.itemValue);
        this.item2 = new StatusValue(item2, consts.itemValue);
        this.item3 = new StatusValue(item3, consts.itemValue);
        this.item4 = new StatusValue(item4, consts.itemValue);
        this.item5 = new StatusValue(item5, consts.itemValue);
        this.item6 = new StatusValue(item6, consts.itemValue);
        this.item7 = new StatusValue(item7, consts.itemValue);
        this.item8 = new StatusValue(item8, consts.itemValue);
        this.gold = gold;
        this.exp = exp;
        this.key = key;
        this.herb = herb;
        this.weapon = new StatusValue(weapon, consts.weaponValue);
        this.armor = new StatusValue(armor, consts.armorValue);
        this.shield = new StatusValue(shield, consts.shieldValue);
        this.uroko = new StatusBool(uroko);
        this.oujyo = new StatusBool(oujyo);
        this.gorem = new StatusBool(gorem);
        this.ring = new StatusBool(ring);
        this.death = new StatusBool(death);
        this.checksum = checksum;
    }
}

module.exports = Status;