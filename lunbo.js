function banner(d, blist, time, id) {
    if (MY_PAGE == 1) {
        blist = (blist || []).filter(function(it){ return it && it.img != null && String(it.img).trim() !== '' && String(it.img) !== 'null' && String(it.img) !== 'undefined'; });
        if (!blist.length) blist = [{img:'https://picsum.photos/400/200'}];
        if (id == undefined || typeof(id) != 'string') {
            id = MY_RULE.title + 'a';
        }else{
        var id = MY_RULE.title + id;
        }
        if (time == undefined || time < 100) {
            time = 3000
        }
        var  arrs  =   []
        for  (let  ii  in  blist)  {        
            arrs.push(blist[ii].img);   
        }
        function number(j, x) { if (x == null || x == undefined || x == '') { x = 0 }; x = x - 1; let sum = getVar('i', String(x + 1)); if (sum == null || sum == undefined || sum >= j) {sum = x}; sum++; putVar('i', sum); return sum; }
        let j = number(blist.length - 1)
        if(!(j>=0 && j<=blist.length-1))j=0;
        d.push({
            img: blist[j].img,
            desc: '0',
            url: $('#noLoading#').lazyRule((j, arrs) => {
                        var _a=(arrs||[]).slice(j,Number(j)+1).filter(function(u){return u!=null&&String(u).trim()!==''&&String(u)!=='null'&&String(u)!=='undefined';});if(!_a.length)_a=['https://picsum.photos/400/200']; return 'pics://' + _a.join('&&')
                    }, j, arrs),
            col_type: getItem(id + "col_type", "card_pic_1"),
            extra: {
                id: id,
                longClick: [{
                    title: getItem('停止', '')  == "0" ? "▶️打开轮播" : "⏸暂停轮播",
                    js: $.toString((id, time, blist, arrs) => {
                        if (getItem('停止') != 0) {
                            setItem('停止', '0')
                            unRegisterTask(id);
                            toast('轮播已停止')
                        } else
                        if (getItem('停止') == 0) {
                            clearItem('停止');
                            registerTask(id, time, $.toString((blist, id, arrs) => {
                                let k = parseInt(getMyVar(id + 'k', '0'))
                                clearMyVar(id + 'k')
                                if (isNaN(k) || k < 0 || k > blist.length - 1) {
                                    k = 0
                                }
                                try {
                                    updateItem(id, {
                                        img: blist[k].img,
                                        url: $('#noLoading#').lazyRule((k, arrs) => {
                                            var _a=(arrs||[]).slice(0).filter(function(u){return u!=null&&String(u).trim()!==''&&String(u)!=='null'&&String(u)!=='undefined';});if(!_a.length)_a=['https://picsum.photos/400/200']; return 'pics://' + _a.join('&&')
                                        }, k, arrs),
                                        desc: '0',
                                    })
                                } catch (e) {
                                    unRegisterTask('banner')
                                }
                                k++
                                putMyVar(id + 'k', k)
                            }, blist, id, arrs))
                            toast('轮播已打开');
                        }
                    }, id, time, blist, arrs)
                }, {
                    title: '🍁添网址',
                    js: $.toString(() => {
                        return $('https://picsum.photos/400/200', "请输入随机图片网址，API").input(() => {
                            if (input.startsWith("http") || input.startsWith("hiker") || input.startsWith("/storage") || input.startsWith("fiie")) { ;
                                setItem('img', input);
                                setItem('j', '网址');
                                refreshPage();
                                toast('图片已更换');
                            } else {
                                toast('不是正确网址')
                            }
                        });
                    })
                }, {
                    title: "🔥选网站",
                    js: $.toString(() => {
                        var list = [{
                            title: "本地图片",
                            icon: "https://hikerfans.com/tubiao/erdi/84.png",
                        }, {
                            title: "彼岸壁纸",
                            icon: "http://www.netbian.com/skin/logo.gif",
                        }, {
                            title: "3G壁纸",
                            icon: "https://m.3gbizhi.com/assets/mobile/images/favicon.ico",
                        }, {
                            title: "壁纸之家",
                            icon: "http://pic.pdowncc.com/upload/2021-8/2021818848518772.png",
                        }, {
                            title: "回车桌面",
                            icon: "https://ts3.cn.mm.bing.net/th?id=ODLS.11cddbb6-eef9-4e93-b662-ae55abea408d&w=32&h=32&qlt=97&pcl=fffffa&o=6&pid=1.2",
                        }, {
                            title: "壁纸360",
                            icon: "https://ts1.cn.mm.bing.net/th?id=ODLS.c461bd66-b2cc-4cb3-906a-f411b5a0841e&w=32&h=32&qlt=96&pcl=fffffa&o=6&pid=1.2",
                        }, {
                            title: "摄图网",
                            icon: "https://m.699pic.com/favicon.ico",
                        }, {
                            title: "高清壁纸",
                            icon: "https://vt.quark.cn/favicon.ico",
                        }, {
                            title: "千叶网",
                            icon: "http://qianye88.com/favicon.ico",
                        }, {
                            title: "典雅壁纸",
                            icon: "http://bj-feiyuantu.oss-cn-beijing.aliyuncs.com/web/searchByImagevcg_image_upload_d54e3600-c257-11ee-b01d-67661eb43361.jpeg",
                        }, {
                            title: "觅知网",
                            icon: "https://m.51miz.com/favicon.ico",
                        }, {
                            title: "亿图网",
                            icon: "https://www.yeitu.com/favicon.ico",
                        }, {
                            title: "壁纸社",
                            icon: "https://www.toopic.cn/favicon.ico",
                        }, {
                            title: "4K桌面",
                            icon: "https://ts3.cn.mm.bing.net/th?id=ODLS.16a9b345-9533-4380-9ffb-f9d3a3d210a1&w=32&h=32&o=6&pid=1.2",
                        }, {
                            title: "墨鱼部落",
                            icon: "https://www.moyublog.com/favicon.ico",
                        }, {
                            title: "元气桌面",
                            icon: "https://mbizhi.cheetahfun.com/favicon.ico",
                        }, {
                            title: "漫锋网.动",
                            icon: "https://zhutix.com/favicon.ico",
                        }, {
                            title: "视觉中国.动",
                            icon: "https://www.vcg.com/favicon.ico",
                        }, {
                            title: "Hippopx",
                            icon: "https://www.hippopx.com/public/css/favicon.ico",
                        }, {
                            title: "天堂图片",
                            icon: "https://m.ivsky.com/favicon.ico",
                    }];
                        let sel = getItem('j', '-1') == '网址' ? '-1' : getItem('j', '-1');
                        return $(list, 2, '切换网站', sel).select((list) => {
                            var j = list.findIndex(item => item.title === input) + '';
                            setItem('j', j);
                            clearItem('停止');
                            refreshPage();
                            return "toast://已切换" + input;
                        }, list);
                    })
                }, {
                    title: "🥑切换样式",
                    js: $.toString((id) => {
                        var list = ["card_pic_1", "card_pic_2", "card_pic_3", "movie_1", "movie_2", "movie_3", "pic_1", "pic_2", "pic_3", "pic_1_center", "pic_1_full", "pic_1_card", "pic_3_square", "card_pic_3_center", "card_pic_2_2", "card_pic_2_2_left"];
                        return $(list, 2, '🥑切换样式', getItem(id + 'i', '-1')).select((list, id) => {
                            let i = list.indexOf(input) + '';
                            setItem(id + "col_type", input);
                            setItem(id + 'i', i);
                            refreshPage();
                            return "toast://已切换" + input
                        }, list, id)
                    }, id)
                }]
            }
        })
        registerTask(id, time, $.toString((blist, id, arrs, number) => {
            let k = number(blist.length - 1)
            if(!(k>=0 && k<=blist.length-1))k=0;
            try {
                updateItem(id, {
                    img: blist[k].img,
                    url: $('#noLoading#').lazyRule((k, arrs) => {
                        var _a=(arrs||[]).slice(0).filter(function(u){return u!=null&&String(u).trim()!==''&&String(u)!=='null'&&String(u)!=='undefined';});if(!_a.length)_a=['https://picsum.photos/400/200']; return 'pics://' + _a.join('&&')
                    }, k, arrs),
                    desc: '0',
                })
            } catch (e) {
                unRegisterTask('banner')
            }           
        }, blist, id, arrs, number))
        if (getItem('停止') == 0) {
            unRegisterTask(id);
        }
        return d
    }
}
var arr = []
function x(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;        
    }
function cw() {
    var _valid = arr.filter(function(it){ return it && it.img != null && String(it.img).trim() !== '' && String(it.img) !== 'null' && String(it.img) !== 'undefined'; });
    if (_valid.length === 0) {
        toast('网站获取失败,切换到默认API');
        clearItem('j');       
    }
}
switch (getItem('j')) {
    case '网址':
        if (/\.(jpg|jpeg|png|gif|webp)/.test(getItem('img'))) {
        setItem('停止', '0')
            arr.push({
                img: getItem('img'),
            })
        } else {
        clearItem('停止');
        for (let i = 0; i < 10; i++) {
            arr.push({
                img: getItem('img') + '#' + Math.random(),
            })
        }
        }
        break
    case '0':
        try {
            var javaImport = new JavaImporter();
            javaImport.importPackage(
                Packages.com.example.hikerview.utils,
                Packages.java.io,
            );
            with(javaImport) {
                var file = new File('/storage/emulated/0/Pictures/');
                var fileList = file.listFiles().filter(h => h.isFile() && /\.(jpg|jpeg|png|gif|webp)/.test(h));
            }
            for (let i in fileList) {
                arr.push({
                    img: fileList[i],
                });
            }
        } catch (e) {}
        if (arr == '') {
            toast('目录不存在或空,或检查下海阔文件读取权限，切换到默认API');
            clearItem('j');
        }
        break
    case '1':       
        var html = request('http://www.netbian.com/index_' + x(2, 951) + '.htm', {})
        var list = pdfa(html, '.list&&img')
        for (let i = 0; i < list.length; i++) {
            arr.push({
                img: pdfh(list[i], 'img&&src').replace('small', '')
            })
        }
        cw()
        break
    case '2':
        var dd = []
        var html = request('https://m.desk.3gbizhi.com/index_' + x(1, 169) + '.html');
        var list = pdfa(html, '.contlistw&&li');
        list.forEach(data => {
            dd.push({
                url: pdfh(data, 'a&&href')
            })
        })
        var data = batchFetch(dd);
        data.forEach(item => {
            arr.push({
                img: pdfh(item, '#mobile_c_img&&img&&src')
            })
        })
        cw()
        break
    case '3':
        var html = request('https://www.bizhi3.com/diannaobizhi/list_' + x(1, 1242) + '.html');
        var list = pdfa(html, '.po_ul&&img');
        list.forEach(data => {
            arr.push({
                img: 'https:' + pdfh(data, 'img&&src')
            })
        })
        cw()
        break
    case '4':
        var html = request('https://m.enterdesk.com/zhuomianbizhi/' + x(1, 708) + '.html', {
            headers: {
                'X-requested-With': 'cn.nr19.mbrowser'
            }
        });
        var list = pdfa(html, '.mbig_pic_list&&img');
        for (let i = 0; i < list.length; i++) {
            arr.push({
                img: pdfh(list[i], 'img&&src') + "@Referer="
            })
        }
        cw()
        break
    case '5':
        var html = request('http://www.bizhi360.com/desk/list_' + x(2, 474) + '.html');
        var list = pdfa(html, '.pic-list&&li');
        list.forEach(data => {
            var id = pdfh(data, 'img&&src').match(/.*(\d{2})\./)[1];
            var img = pdfh(data, 'img&&src')
            arr.push({
                img: img
            })
        })
        cw()
        break
    case '6':
        var html = request('https://m.699pic.com/sousuo-diannaobizhi-0-complex-horizontal-0-all-all-' + x(0, 16) + '-0-0-0-0-0-0-all-all-739-0.html');
        var list = pdfa(html, '.res-list&&img');
        list.forEach(data => {
            arr.push({
                img: 'https:' + pdfh(data, 'img&&src')
            })
        })
        cw()
        break
    case '7':
        var x = Math.floor(Math.random() * 475) * 20
        try {
            var html = request('https://vt.sm.cn/api/pic/list?query=%E7%94%B5%E8%84%91%E5%A3%81%E7%BA%B8&tag=&limit=20&start=' + x, {});
            var list = JSON.parse(html).data.hit.imgInfo.item
            list.forEach(data => {
                arr.push({
                    img: data.bigPicUrl,
                })
            })
        } catch (e) {}
        cw()
        break
    case '8':
        var html = request('http://qianye88.com/3840x2160/' + x(1, 410) + '.html');
        var list = pdfa(html, '.flex-images&&img');
        list.forEach(data => {
            arr.push({
                img: pdfh(data, 'img&&data-original')
            })
        })
        cw()
        break
    case '9':
        var html = request('https://www.dianyabizhi.com/diannaobizhi/list_' + x(1, 440) + '.html');
        var list = pdfa(html, '.po_ul&&img');
        list.forEach(data => {
            arr.push({
                img: pdfh(data, 'img&&src').includes('http') ? pdfh(data, 'img&&src') : 'https://www.dianyabizhi.com' + pdfh(data, 'img&&src')
            })
        })
        cw()
        break
    case '10':
        try {
            var html = request('https://m.51miz.com/api/SearchList/?keyword=%E5%A3%81%E7%BA%B8&plate_path=sucai&orderby=&page=' + x(1, 50), {});
            var list = JSON.parse(html).data;
            list.forEach(data => {
                arr.push({
                    img: 'https:' + data.thumb_url + "@Referer=https://m.51miz.com"
                })
            })
        } catch (e) {}
        cw()
        break
    case '11':
     if (x(0, 1) == '0') {
        var html = request('https://m.yeitu.com/bizhi/mingxingbz/' + x(1, 15));
        } else {
        var html = request('https://m.yeitu.com/bizhi/meinvbz/' + x(1, 24) );
        }
        var list = pdfa(html, '.uk-gallery&&img');
        list.forEach(data => {
            arr.push({
                img: pdfh(data, 'img&&data-src')
            })
        })
        cw()
        break
    case '12':
        var host = 'https://www.toopic.cn'
        var html = request(host + '/dnbz/?page=' + x(1, 295));
        var list = pdfa(html, '.pic-list&&img');
        list.forEach(data => {
            arr.push({
                img: host + pdfh(data, 'img&&data-original')
            })
        })
        cw()
        break
    case '13':
        var html = request('https://www.4kdesk.com/pc/index_' + x(2, 1108) + '.html');
        var list = pdfa(html, '.pic-list&&img');
        list.forEach(data => {
            arr.push({
                img: pdfh(data, 'img&&data-original') + '@Referer=https://www.4kdesk.com/pc/'
            })
        })
        cw()
        break
    case '14':
        var html = request('https://www.moyublog.com/hdwallpapers/index_' + x(2, 3357) + '.html');
        var list = pdfa(html, '.slist&&img');
        list.forEach(data => {
            arr.push({
                img: pdfh(data, 'img&&data-original')
            })
        })
        cw()
        break
    case '15':
        var html = request('https://mbizhi.cheetahfun.com/dn/c3j/p' + x(1, 45));
        var list = pdfa(html, 'section&&li');
        list.forEach(data => {
            arr.push({
                img: pdfh(data, 'img&&src').replace(/(.*?)\?.*/, '$1')
            })
        })
        cw()
        break
    case '16':
        var html = request('https://zhutix.com/animated/page/' + x(1, 18) + '/');
        var list = pdfa(html, '.b2_gap&&img');
        list.forEach(data => {
            arr.push({
                img: pdfh(data, 'img&&src')
            })
        })
        cw()
        break
    case '17':
        var i = x(0, 6)
        var aaa = ["bizhi", "diannaobizhi", "bizhifengjing", "bizhidongman", "keai", "katong", "jianyue"]
        var url = 'https://www.vcg.com/creative-image/' + aaa[i] + '/?orientType%5B0%5D=1&assetFormat%5B0%5D=5&page=';
        var html = request(url)
        var ym = pdfh(html, '.paginationTotal&&Text').match(/\d+/)[0]
        var html = request(url + x(1, Number(ym)))
        var list = pdfa(html, '.gallery_inner&&img');
        var z = x(0, list.length - 1)          
                arr.push({
                    img: 'https:' + pdfh(list[z], 'img&&data-min')               
            })
            setItem('停止', '0')
        cw()
        break 
    case '18':
            var html = request('https://www.hippopx.com/zh/search?q=%E5%A3%81%E7%BA%B8&page=' + x(1, 47));
            var list = pdfa(html, '.main_list&&img');
            list.forEach(data => {
                arr.push({
                    img: pdfh(data, 'img&&src')
                })
            })
            cw()
            break 
    case '19':
           var html = request('https://m.ivsky.com/bizhi/mei_nv_t10/index_' + x(2, 300) + '.html',{headers: {
               'x-requested-with': 'com.uop.app'
            }});
           var list = pdfa(html, '.ul_third&&img');
           list.forEach(data => {
               arr.push({
                   img: ('https:'+pdfh(data, 'img&&src')).replace(/https:\/\/img\.ivsky\.com\/img\/bizhi\/t/ ,'https://img-pre.ivsky.com/img/bizhi/pre')
               })
           })
           cw()
           break    
   }
var _v = arr.filter(function(it){ return it && it.img != null && String(it.img).trim() !== '' && String(it.img) !== 'null' && String(it.img) !== 'undefined'; });
if (_v.length === 0) {
    var arr = [];
    for (let i = 0; i < 10; i++) {
        arr.push({
            img: 'https://picsum.photos/400/200' + '#' + Math.random()
        })
    }
}
var gengxin = '优化_by缘分/京梦(2026.11.26)'

$.exports.banner = banner;
$.exports.arr = arr;