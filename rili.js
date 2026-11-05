/**
 * rili.js — 公历/农历转换模块
 * 支持范围：1900-01-31 ~ 2100 年
 * 包含：农历、闰月、天干地支、生肖、二十四节气、公历/农历节日、星座、星期
 */

const C = {
    lunarInfo: [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
        0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
        0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
        0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
        0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
        0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
        0x0d520
    ],
    Gan: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    Zhi: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
    Animals: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
    solarTerm: ['小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'],
    sTermInfo: '9778397bd097c36b0b6fc9274c91aa97b6b97bd19801ec9210c965cc920e97bcf97c3598082c95f8c965cc920f97bd0b06bdb0722c965ce1cfcc920fb027097bd097c36b0b6fc9274c91aa97b6b97bd19801ec9210c965cc920e97bcf97c359801ec95f8c965cc920f97bd0b06bdb0722c965ce1cfcc920fb027097bd097c36b0b6fc9274c91aa97b6b97bd19801ec9210c965cc920e' +
        '97bcf97c359801ec95f8c965cc920f97bd0b06bdb0722c965ce1cfcc920fb027097bd097c36b0b6fc9274c91aa9778397bd19801ec9210c965cc920e97b6b97bd19801ec95f8c965cc920f97bd09801d98082c95f8e1cfcc920f97bd097bd097c36b0b6fc9210c8dc29778397bd197c36c9210c9274c91aa97b6b97bd19801ec95f8c965cc920e97bd09801d98082c95f8e1cfcc920f' +
        '97bd097bd097c36b0b6fc9210c8dc29778397bd097c36c9210c9274c91aa97b6b97bd19801ec95f8c965cc920e97bcf97c3598082c95f8e1cfcc920f97bd097bd097c36b0b6fc9210c8dc29778397bd097c36c9210c9274c91aa97b6b97bd19801ec9210c965cc920e97bcf97c3598082c95f8c965cc920f97bd097bd097c35b0b6fc920fb07229778397bd097c36b0b6fc9274c91aa' +
        '97b6b97bd19801ec9210c965cc920e97bcf97c3598082c95f8c965cc920f97bd097bd097c35b0b6fc920fb07229778397bd097c36b0b6fc9274c91aa97b6b97bd19801ec9210c965cc920e97bcf97c359801ec95f8c965cc920f97bd097bd097c35b0b6fc920fb07229778397bd097c36b0b6fc9274c91aa97b6b97bd19801ec9210c965cc920e97bcf97c359801ec95f8c965cc920f' +
        '97bd097bd097c35b0b6fc920fb07229778397bd097c36b0b6fc9274c91aa97b6b97bd19801ec9210c965cc920e97bcf97c359801ec95f8c965cc920f97bd097bd07f595b0b6fc920fb07229778397bd097c36b0b6fc9210c8dc29778397bd19801ec9210c9274c920e97b6b97bd19801ec95f8c965cc920f97bd07f5307f595b0b0bc920fb07227f0e397bd097c36b0b6fc9210c8dc2' +
        '9778397bd097c36c9210c9274c920e97b6b97bd19801ec95f8c965cc920f97bd07f5307f595b0b0bc920fb07227f0e397bd097c36b0b6fc9210c8dc29778397bd097c36c9210c9274c91aa97b6b97bd19801ec9210c965cc920e97bd07f1487f595b0b0bc920fb07227f0e397bd097c36b0b6fc9210c8dc29778397bd097c36b0b6fc9274c91aa97b6b97bd19801ec9210c965cc920e' +
        '97bcf7f1487f595b0b0bb0b6fb07227f0e397bd097c35b0b6fc920fb07229778397bd097c36b0b6fc9274c91aa97b6b97bd19801ec9210c965cc920e97bcf7f1487f595b0b0bb0b6fb07227f0e397bd097c35b0b6fc920fb07229778397bd097c36b0b6fc9274c91aa97b6b97bd19801ec9210c965cc920e97bcf7f1487f531b0b0bb0b6fb07227f0e397bd097c35b0b6fc920fb0722' +
        '9778397bd097c36b0b6fc9274c91aa97b6b97bd19801ec9210c965cc920e97bcf7f1487f531b0b0bb0b6fb07227f0e397bd07f595b0b6fc920fb07229778397bd097c36b0b6fc9274c91aa97b6b97bd19801ec9210c9274c920e97bcf7f0e47f531b0b0bb0b6fb07227f0e397bd07f595b0b0bc920fb07229778397bd097c36b0b6fc9210c91aa97b6b97bd197c36c9210c9274c920e' +
        '97bcf7f0e47f531b0b0bb0b6fb07227f0e397bd07f595b0b0bc920fb07229778397bd097c36b0b6fc9210c8dc29778397bd097c36c9210c9274c920e97b6b7f0e47f531b0723b0b6fb07227f0e37f5307f595b0b0bc920fb07227f0e397bd097c36b0b6fc9210c8dc29778397bd097c36b0b70c9274c91aa97b6b7f0e47f531b0723b0b6fb07217f0e37f1487f595b0b0bb0b6fb0722' +
        '7f0e397bd097c35b0b6fc9210c8dc29778397bd097c36b0b6fc9274c91aa97b6b7f0e47f531b0723b0b6fb07217f0e27f1487f595b0b0bb0b6fb07227f0e397bd097c35b0b6fc920fb07229778397bd097c36b0b6fc9274c91aa97b6b7f0e47f531b0723b0b6fb07217f0e27f1487f531b0b0bb0b6fb07227f0e397bd097c35b0b6fc920fb07229778397bd097c36b0b6fc9274c91aa' +
        '97b6b7f0e47f531b0723b0b6fb07217f0e27f1487f531b0b0bb0b6fb07227f0e397bd097c35b0b6fc920fb07229778397bd097c36b0b6fc9274c91aa97b6b7f0e47f531b0723b0b6fb07217f0e27f1487f531b0b0bb0b6fb07227f0e397bd07f595b0b0bc920fb07229778397bd097c36b0b6fc9274c91aa97b6b7f0e47f531b0723b0787b07217f0e27f0e47f531b0b0bb0b6fb0722' +
        '7f0e397bd07f595b0b0bc920fb07229778397bd097c36b0b6fc9210c91aa97b6b7f0e47f149b0723b0787b07217f0e27f0e47f531b0723b0b6fb07227f0e397bd07f595b0b0bc920fb07229778397bd097c36b0b6fc9210c8dc2977837f0e37f149b0723b0787b07217f07e7f0e47f531b0723b0b6fb07227f0e37f5307f595b0b0bc920fb07227f0e397bd097c35b0b6fc9210c8dc2' +
        '977837f0e37f14998082b0787b07217f07e7f0e47f531b0723b0b6fb07217f0e37f1487f595b0b0bb0b6fb07227f0e397bd097c35b0b6fc9210c8dc2977837f0e37f14998082b0787b06bd7f07e7f0e47f531b0723b0b6fb07217f0e27f1487f531b0b0bb0b6fb07227f0e397bd097c35b0b6fc920fb0722977837f0e37f14998082b0787b06bd7f07e7f0e47f531b0723b0b6fb0721' +
        '7f0e27f1487f531b0b0bb0b6fb07227f0e397bd097c35b0b6fc920fb0722977837f0e37f14998082b0787b06bd7f07e7f0e47f531b0723b0b6fb07217f0e27f1487f531b0b0bb0b6fb07227f0e397bd07f595b0b0bc920fb0722977837f0e37f14998082b0787b06bd7f07e7f0e47f531b0723b0b6fb07217f0e27f1487f531b0b0bb0b6fb07227f0e397bd07f595b0b0bc920fb0722' +
        '977837f0e37f14998082b0787b06bd7f07e7f0e47f149b0723b0787b07217f0e27f0e47f531b0b0bb0b6fb07227f0e397bd07f595b0b0bc920fb0722977837f0e37f14998082b0723b06bd7f07e7f0e37f149b0723b0787b07217f0e27f0e47f531b0723b0b6fb07227f0e397bd07f595b0b0bc920fb0722977837f0e37f14898082b0723b02d57ec967f0e37f14998082b0787b0721' +
        '7f07e7f0e47f531b0723b0b6fb07227f0e37f1487f595b0b0bb0b6fb07227f0e37f0e37f14898082b0723b02d57ec967f0e37f14998082b0787b07217f07e7f0e47f531b0723b0b6fb07227f0e37f1487f531b0b0bb0b6fb07227f0e37f0e37f14898082b0723b02d57ec967f0e37f14998082b0787b06bd7f07e7f0e47f531b0723b0b6fb07217f0e37f1487f531b0b0bb0b6fb0722' +
        '7f0e37f0e37f14898082b072297c357ec967f0e37f14998082b0787b06bd7f07e7f0e47f531b0723b0b6fb07217f0e27f1487f531b0b0bb0b6fb07227f0e37f0e37f14898082b072297c357ec967f0e37f14998082b0787b06bd7f07e7f0e47f531b0723b0b6fb07217f0e27f1487f531b0b0bb0b6fb07227f0e37f0e366aa89801eb072297c357ec967f0e37f14998082b0787b06bd' +
        '7f07e7f0e47f149b0723b0787b07217f0e27f1487f531b0b0bb0b6fb07227f0e37f0e366aa89801eb072297c357ec967f0e37f14998082b0723b06bd7f07e7f0e47f149b0723b0787b07217f0e27f0e47f531b0723b0b6fb07227f0e37f0e366aa89801eb072297c357ec967f0e37f14998082b0723b06bd7f07e7f0e37f14998083b0787b07217f0e27f0e47f531b0723b0b6fb0722' +
        '7f0e37f0e366aa89801eb072297c357ec967f0e37f14898082b0723b02d57f07e7f0e37f14998082b0787b07217f07e7f0e47f531b0723b0b6fb07227f0e36665b66aa89801e9808297c35665f67f0e37f14898082b0723b02d57ec967f0e37f14998082b0787b07217f07e7f0e47f531b0723b0b6fb07227f0e36665b66a449801e9808297c35665f67f0e37f14898082b0723b02d5' +
        '7ec967f0e37f14998082b0787b06bd7f07e7f0e47f531b0723b0b6fb07217f0e36665b66a449801e9808297c35665f67f0e37f14898082b072297c357ec967f0e37f14998082b0787b06bd7f07e7f0e47f531b0723b0b6fb07217f0e26665b66a449801e9808297c35665f67f0e37f1489801eb072297c357ec967f0e37f14998082b0787b06bd7f07e7f0e47f531b0723b0b6fb0721' +
        '7f0e27f1487f531b0b0bb0b6fb0722',
    nStr1: ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
    nStr2: ['初', '十', '廿', '卅'],
    nStr3: ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'],
    festival: {
        '1-1': '元旦节',
        '2-14': '情人节',
        '5-1': '劳动节',
        '5-4': '青年节',
        '6-1': '儿童节',
        '9-10': '教师节',
        '10-1': '国庆节',
        '12-25': '圣诞节',
        '3-8': '妇女节',
        '3-12': '植树节',
        '4-1': '愚人节',
        '5-12': '护士节',
        '7-1': '建党节',
        '8-1': '建军节',
        '12-24': '平安夜'
    },
    lFestival: {
        '12-30': '除夕',
        '1-1': '春节',
        '1-15': '元宵节',
        '2-2': '龙抬头',
        '5-5': '端午节',
        '7-7': '七夕节',
        '7-15': '中元节',
        '8-15': '中秋节',
        '9-9': '重阳节',
        '10-1': '寒衣节',
        '10-15': '下元节',
        '12-8': '腊八节',
        '12-23': '北方小年',
        '12-24': '南方小年'
    },
    lYearDays: function (y) {
        var sum = 348;
        for (var i = 0x8000; i > 0x8; i >>= 1) sum += (C.lunarInfo[y - 1900] & i) ? 1 : 0;
        return sum + C.leapDays(y);
    },
    leapMonth: function (y) { return C.lunarInfo[y - 1900] & 0xf; },
    leapDays: function (y) { return C.leapMonth(y) ? ((C.lunarInfo[y - 1900] & 0x10000) ? 30 : 29) : 0; },
    monthDays: function (y, m) {
        if (m > 12 || m < 1) return -1;
        return (C.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29;
    },
    toGanZhiYear: function (y) { return C.Gan[(y - 4) % 10] + C.Zhi[(y - 4) % 12]; },
    toGanZhi: function (o) { return C.Gan[o % 10] + C.Zhi[o % 12]; },
    toAstro: function (m, d) {
        var s = '摩羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手摩羯';
        var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
        return s.substr(m * 2 - (d < arr[m - 1] ? 2 : 0), 2) + '座';
    },
    getTerm: function (y, n) {
        if (y < 1900 || y > 2100 || n < 1 || n > 24) return -1;
        var t = C.sTermInfo.substr((y - 1900) * 30, 30), days = [];
        for (var i = 0; i < 30; i += 5) {
            var s = parseInt(t.substr(i, 5), 16).toString();
            days.push(s[0], s.substr(1, 2), s[3], s.substr(4, 2));
        }
        return parseInt(days[n - 1]);
    },
    toChinaMonth: function (m) { return m > 12 || m < 1 ? -1 : C.nStr3[m - 1] + '月'; },
    toChinaDay: function (d) {
        if (d === 10) return '初十';
        if (d === 20) return '二十';
        if (d === 30) return '三十';
        return C.nStr2[Math.floor(d / 10)] + C.nStr1[d % 10];
    },
    getAnimal: function (y) { return C.Animals[(y - 4) % 12]; },
    solar2lunar: function (y, m, d) {
        y = parseInt(y); m = parseInt(m); d = parseInt(d);
        if (y < 1900 || y > 2100 || (y === 1900 && m === 1 && d < 31)) return -1;
        var date = !y ? new Date() : new Date(y, m - 1, d);
        y = date.getFullYear(); m = date.getMonth() + 1; d = date.getDate();
        var offset = (Date.UTC(y, m - 1, d) - Date.UTC(1900, 0, 31)) / 86400000;
        var i, temp = 0;
        for (i = 1900; i < 2101 && offset > 0; i++) { temp = C.lYearDays(i); offset -= temp; }
        if (offset < 0) { offset += temp; i--; }
        var year = i, leap = C.leapMonth(i), isLeap = false;
        for (i = 1; i < 13 && offset > 0; i++) {
            if (leap > 0 && i === leap + 1 && !isLeap) { --i; isLeap = true; temp = C.leapDays(year); }
            else temp = C.monthDays(year, i);
            if (isLeap && i === leap + 1) isLeap = false;
            offset -= temp;
        }
        if (offset === 0 && leap > 0 && i === leap + 1) {
            if (isLeap) isLeap = false;
            else { isLeap = true; --i; }
        }
        if (offset < 0) { offset += temp; --i; }
        var month = i, day = offset + 1;
        var firstNode = C.getTerm(y, m * 2 - 1), secondNode = C.getTerm(y, m * 2);
        var gzM = C.toGanZhi((y - 1900) * 12 + m + 11);
        if (d >= firstNode) gzM = C.toGanZhi((y - 1900) * 12 + m + 12);
        var isTerm = false, Term = null;
        if (firstNode === d) { isTerm = true; Term = C.solarTerm[m * 2 - 2]; }
        if (secondNode === d) { isTerm = true; Term = C.solarTerm[m * 2 - 1]; }
        var gzD = C.toGanZhi(Date.UTC(y, m - 1, 1) / 86400000 + 25567 + 10 + d - 1);
        var now = new Date();
        var fd = month + '-' + day;
        if (month === 12 && day === 29 && C.monthDays(year, month) === 29) fd = '12-30';
        return {
            date: y + '-' + m + '-' + d,
            lunarDate: year + '-' + month + '-' + day,
            festival: C.festival[m + '-' + d] || null,
            lunarFestival: C.lFestival[fd] || null,
            lYear: year, lMonth: month, lDay: day,
            Animal: C.getAnimal(year),
            IMonthCn: (isLeap ? '闰' : '') + C.toChinaMonth(month),
            IDayCn: C.toChinaDay(day),
            cYear: y, cMonth: m, cDay: d,
            gzYear: C.toGanZhiYear(year), gzMonth: gzM, gzDay: gzD,
            isToday: now.getFullYear() === y && now.getMonth() + 1 === m && now.getDate() === d,
            isLeap: isLeap,
            nWeek: date.getDay() || 7,
            ncWeek: '星期' + C.nStr1[date.getDay()],
            isTerm: isTerm, Term: Term,
            astro: C.toAstro(m, d)
        };
    },
    lunar2solar: function (y, m, d, isLeapMonth) {
        y = parseInt(y); m = parseInt(m); d = parseInt(d);
        isLeapMonth = !!isLeapMonth;
        var leapMonth = C.leapMonth(y);
        if (isLeapMonth && leapMonth !== m) return -1;
        if (y === 2100 && m === 12 && d > 1 || y === 1900 && m === 1 && d < 31) return -1;
        var day = C.monthDays(y, m), max = isLeapMonth ? C.leapDays(y) : day;
        if (y < 1900 || y > 2100 || d > max) return -1;
        var offset = 0, i, isAdd = false;
        for (i = 1900; i < y; i++) offset += C.lYearDays(i);
        for (i = 1; i < m; i++) {
            if (!isAdd && leapMonth > 0 && leapMonth <= i) { offset += C.leapDays(y); isAdd = true; }
            offset += C.monthDays(y, i);
        }
        if (isLeapMonth) offset += day;
        var t = new Date((offset + d - 31) * 86400000 + Date.UTC(1900, 1, 30));
        return C.solar2lunar(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
    }
};

/**
 * 解析日期入参，支持：
 *  "2026-11-05" / "2026/11/05"
 *  [2026, 11, 5]
 *  { y: 2026, m: 11, d: 5 }
 * 不传或无法解析时使用 now
 */
export function parseDateParam(p, now = new Date()) {
    let y = now.getFullYear();
    let m = now.getMonth() + 1;
    let d = now.getDate();

    if (typeof p === 'string' && /^\d{4}[-/]\d{1,2}[-/]\d{1,2}$/.test(p)) {
        const a = p.split(/[-/]/);
        y = +a[0]; m = +a[1]; d = +a[2];
    } else if (p && p.length === 3 && typeof p[0] === 'number') {
        y = +p[0]; m = +p[1]; d = +p[2];
    } else if (p && typeof p === 'object' && p.y != null && p.m != null && p.d != null) {
        y = +p.y; m = +p.m; d = +p.d;
    }

    return { y, m, d };
}

/**
 * 一次拿到与原脚本 $.exports 等价的结果
 */
export function getCalendarInfo(p, now = new Date()) {
    const { y, m, d } = parseDateParam(p, now);
    const info = C.solar2lunar(y, m, d);
    return {
        date: info === -1 ? '' : info.Animal + '年 ' + info.IMonthCn + info.IDayCn,
        info: info === -1 ? null : info,
        calendar: C
    };
}

// 具名导出常用方法
export const calendar = C;
export const solar2lunar = C.solar2lunar;
export const lunar2solar = C.lunar2solar;
export const getTerm = C.getTerm;
export const getAnimal = C.getAnimal;
export const toGanZhiYear = C.toGanZhiYear;

export default C;