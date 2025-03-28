function sign(params) {
    function middle(ls) {
        let resNum = [];

        function test(a, b, c) {
            let r25 = a >> 2;
            if (b !== undefined && c !== undefined) {
                let r26 = a & 3;
                let r26_2 = r26 << 4;
                let r26_3 = b >> 4;
                let r26_4 = r26_2 | r26_3;
                let r27 = b & 15;
                let r27_2 = r27 << 2;
                let r27_3 = r27_2 | (c >> 6);
                let r28 = c & 63;
                resNum.push(r25);
                resNum.push(r26_4);
                resNum.push(r27_3);
                resNum.push(r28);
            } else {
                let r10 = a >> 2;
                let r11 = a & 3;
                let r11_2 = r11 << 4;
                resNum.push(r10);
                resNum.push(r11_2);
            }
        }
        for (let i = 0; i < ls.length; i += 3) {
            if (ls[i] !== undefined && ls[i + 1] !== undefined && ls[i + 2] !== undefined) {
                test(ls[i], ls[i + 1], ls[i + 2])
            } else {
                test(ls[i], undefined, undefined)
            }
        }
        let res = [];
        resNum.forEach((item) => {
            let zd = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            res.push(zd[item])
        });
        res = res.join('');
        return res;
    }

    function head(md5Str) {
        let res = [];
        [21, 4, 9, 26, 16, 20, 27, 30].map(x => {
            res.push(md5Str[x]);
        });
        return res.join('');
    }

    function tail(md5Str) {
        let res = [];
        [18, 11, 3, 2, 1, 7, 6, 25].map(x => {
            res.push(md5Str[x]);
        });
        return res.join('');
    }

    function getLs(md5Str) {
        let zd = {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "A": 10,
            "B": 11,
            "C": 12,
            "D": 13,
            "E": 14,
            "F": 15
        };
        let ol = [212, 45, 80, 68, 195, 163, 163, 203, 157, 220, 254, 91, 204, 79, 104, 6];
        let res = [];
        let j = 0;
        for (let i = 0; i < md5Str.length; i += 2) {
            let one = zd[md5Str[i]];
            let two = zd[md5Str[i + 1]];
            let r = one * 16 ^ two;
            res.push(r ^ ol[j]);
            j += 1;
        }
        return res;
    }
    let md5Str = md5(params).toUpperCase();
    let h = head(md5Str);
    let e = tail(md5Str);
    let ls = getLs(md5Str);
    let m = middle(ls);
    let res = ('zzb' + h + m + e).toLowerCase();
    let r = RegExp(/[\\/+]/g);
    res = res.replace(r, '');
    return res;
};